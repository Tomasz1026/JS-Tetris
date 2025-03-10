const http = require('http');
const express = require('express');
const app = express();
const path = require('path');

const socketIO = require('socket.io');
const server = http.Server(app);
const io = socketIO(server);

const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tetris'
});

db.connect((err) => {
  if(err) throw(err);
    
  console.log('Database connected!!!');
});

const portNumber = 8080;
const projectPath = 'T:/Documents/Projekty/tetris';


app.enable('trust proxy') 

app.get('/', (req, res) => {
    
    app.use(express.static(projectPath));
    
    try {
      res.sendFile(projectPath+'/index.html');
      //console.log(req.ip);
    }

    catch(err) {
      console.log("ERROR");
    }
});

//const multi_matches_list = 'SELECT * FROM multi_matches';


io.on('connection', (socket) => {

  let multiRows;
  let User = {
    Id: null,
    Nick: "Player",
    IP: socket.handshake.address
  };
  
  socket.on('userLogin', (userData) => {
    if(userData.Id === null)
    {
      db.query("INSERT INTO users VALUES (null, '','"+User.IP+"', null)", (err, result) => {
        if(err) throw err;
  
        User.Id = result.insertId;
        User.Nick += result.insertId;
        db.query("UPDATE users SET nick = '"+User.Nick+"' WHERE id = "+User.Id+"", (err, result) => {
          if(err) throw err;
  
          socket.emit('userData', User);
          console.log("New user ID:"+User.Id+" Name:"+User.Nick+" added.");
        });
      });
    } else {
      User.Id = userData.Id;
      User.Nick = userData.Nick;
      console.log("User ID:"+User.Id+" Name:"+User.Nick+" connected.");
    }
  });

  db.query('SELECT * FROM multi_matches', (err, result) => {
    if(err) throw err;

    multiRows = result;
    socket.emit('newMultiDataBase', result);
  });

  socket.on('refreshMultiDataBase', () => {

    console.log("User ID:"+User.Id+" Name:"+User.Nick+" want to refresh his multidatabase.");
    
      db.query('SELECT * FROM multi_matches', (err, result) => {
        if(err) throw err;

        if (!arrayCheck(result, multiRows)) {
          socket.emit('newMultiDataBase', result);
          multiRows = result;
        }
      });
      
      console.log("User ID:"+User.Id+" Name:"+User.Nick+" got new refreshed multidatabase.");

  });

  socket.on('newMatch', (mD) =>{
    db.query("INSERT INTO multi_matches VALUES ("+mD+")", (err, result) => {
      if(err) throw err;
      
      console.log("User ID:"+User.Id+" Name:"+User.Nick+" created new game.");
      
    });
    
  });

  socket.on('disconnect', () => {
    console.log("User ID:"+User.Id+" Name:"+User.Nick+" disconnected.");
  });

});
 

server.listen(portNumber, () => {
	console.log('Starting server on port:',portNumber);
});



function arrayCheck(arrayA, arrayB) {
	
	if(arrayA.length == arrayB.length)
	{	
		return true;
	}
	
	return false;
}