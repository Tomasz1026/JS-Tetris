var tetrimino = {};

var bricks = ['I','T','O','L','J','S','Z'];

var matrix = [];

tetrimino["I"] = {
	id: 1,
	color: "red",
	shape: [
			[1,2,1,2,1,2,1],
			[1,1,1,1],
			[1,2,1,2,1,2,1],
			[1,1,1,1]
			],
}

tetrimino["T"] = {
	id: 2,
	color: "gray",
	shape: [
			[1,1,1,2,0,1,0],
			[0,1,2,1,1,2,0,1],
			[0,1,0,2,1,1,1],
			[1,2,1,1,2,1]
			],
}

tetrimino["O"] = {
	id: 3,
	color: "cyan",
	shape: [
			[1,1,2,1,1],
			[1,1,2,1,1],
			[1,1,2,1,1],
			[1,1,2,1,1]
			],
}

tetrimino["L"] = {
	id: 4,
	color: "yellow",
	shape: [
			[1,2,1,2,1,1],
			[0,0,0,2,1,1,1,2,1,0,0],
			[1,1,2,0,1,2,0,1],
			[0,0,1,2,1,1,1,2]
			],
}

tetrimino["J"] = {
	id: 5,
	color: "fuchsia",
	shape: [
			[0,1,2,0,1,2,1,1],
			[0,0,0,2,1,0,0,2,1,1,1,2],
			[1,1,2,1,0,2,1,0],
			[0,0,0,2,1,1,1,2,0,0,1],
			],
}

tetrimino["S"] = {
	id: 6,
	color: "blue",
	shape: [
			[0,1,1,2,1,1,0],
			[1,2,1,1,2,0,1],
			[0,1,1,2,1,1,0],
			[1,2,1,1,2,0,1]
			],
}

tetrimino["Z"] = {
	id: 7,
	color: "lime",
	shape: [
			[1,1,0,2,0,1,1],
			[0,1,2,1,1,2,1],
			[1,1,0,2,0,1,1],
			[0,1,2,1,1,2,1]
			],
}

for (let x=0; x<10; x++)
{
	matrix[x] = [];
		
	for (let y=0;y<20;y++)
	{	
		matrix[x][y] = 0;
	}
	matrix[x][20] = 9;
}

var time = 0;

function startGame() {
	
	Player.create();

	document.getElementById("mini_game_menu").style.display = "none";
	document.getElementById("start").style.display = "none";
	document.getElementById("restart").style.display = "block";
	$("#mini_game_menu p").show();
	document.getElementById("exit").style.display = "block";
	
	time = setInterval(() => {
		Player.y+=1;
		
	}, 1000);
	myGameArea.drawScore(Player.score, Player.lines);
	window.setInterval(updateGameArea, 10);
}


var Player = {
	create: function() {
		this.score = 0;
		this.combo = 0;
		this.x = 4;
		this.y = 0;
		this.rotation = 0;
		this.lastPlayerX = 4;
		this.lastPlayerY = 0;
		this.lastPlayerR = 0;
		this.lines = 0;
		
		this.brickId = Math.floor(Math.random() * bricks.length);
		this.randomBrick = bricks[this.brickId];
		
		do{
			this.nextBrickId = Math.floor(Math.random() * bricks.length);
			this.nextBrick = bricks[this.nextBrickId];
		}while(this.randomBrick === this.nextBrick);
		
		//console.log("Aktualny klocek to id: " + this.brickId + " Nastepny klocek to id: " + this.nextBrickId);
		
	},
	reset: function() {
		this.combo = 0;
		this.x = 4;
		this.y = 0;
		this.rotation = 0;
		this.lastPlayerX = 4;
		this.lastPlayerY = 0;
		this.lastPlayerR = 0;
		
		this.brickId = this.nextBrickId;
		this.randomBrick = this.nextBrick;
		
		do{
			this.nextBrickId = Math.floor(Math.random() * bricks.length);
			this.nextBrick = bricks[this.nextBrickId];
		}while(this.randomBrick === this.nextBrick);

		//console.log("Aktualny klocek to  " + this.randomBrick + " O id: " + this.brickId + " Nastepny klocek to " + this.nextBrick + " O id: " + this.nextBrickId);
	},
	
	updateCoords: function() {
		this.lastPlayerX = this.x;
		this.lastPlayerY = this.y;
		this.lastPlayerR = this.rotation;
	},
	
	updateScore: function() {
		this.score += 100*(this.combo)**2
	}
	
}
//Player.create();
var myGameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 600;
		this.canvas.height = 600;
		this.canvas.id = "mainGame";
		this.context = this.canvas.getContext("2d");
		document.getElementById("game_win").appendChild(this.canvas);
		this.ctx = myGameArea.context;
		
		
		this.ctx.fillStyle = "black";
		this.ctx.font = "20px Arial";
		this.ctx.fillText("Score: ", 0, 20);
		this.ctx.fillText("Lines: ", 0, 85);
		this.ctx.fillText("Next block: ", 460, 20);
		this.ctx.stroke();
		
		for (let x=0; x<3; x++) {
			
			this.ctx.fillRect(30*x, 30, 30, 30);
			this.ctx.fillRect(30*x, 90, 30, 30);
			
		}
		
		for (let x=1; x<5; x++) {
			for (let y=0; y<4; y++) {
				this.ctx.fillRect(460+30*y, 30*x, 30, 30);
				this.ctx.beginPath();
				this.ctx.strokeStyle = "white";
				this.ctx.rect(460+30*y+0.5, 30*x+0.5, 30, 30);
				this.ctx.stroke();
			}
		}
		
		this.ctx.beginPath();
		this.ctx.strokeStyle = "white";
		this.ctx.rect(0.5, 30.5, 90, 30);
		this.ctx.rect(0.5, 90.5, 90, 30);
		this.ctx.stroke();
		
		this.ctx.fillStyle = "white";
		this.ctx.font = "20px Arial";
		this.ctx.fillText("0 ", 3, 54);
		this.ctx.fillText("0 ", 3, 115);
		
		
		
		
	},
	clear : function(x, y, name, rotation) {
		
		let shp = tetrimino[name].shape[rotation];
		let lgth = shp.length;
		
		let addx=0;
		let addy=0;
		
		for (let i=0; i<lgth; i++) {
			let shapeId = shp[i];
			
			switch (shapeId) {
				case 0:
					addx += 1;
					break;
				
				case 1:
					matrix[x+addx][y+addy] = 0;
					addx += 1;
					break;
				
				case 2:
					addx = 0;
					addy += 1;
					break;
				
				default:
					console.log("ERROR! Shapes id doesn't exists!");
					break;
			}
		}
	},

	
	drawBlock: function(boardX, boardY, color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(boardX, boardY, 30, 30);
		this.ctx.beginPath();
		this.ctx.rect(0.5+boardX, 0.5+boardY, 29, 29);
		this.ctx.stroke();
	},
	
	draw: function() {
		let boardX = 150;
		let boardY = 0;
		
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = "white";
		this.ctx.beginPath();
		
		this.ctx.stroke();
		
		for (let y=0;y<20;y++){
			for (let x=0;x<10;x++) {
				switch (matrix[x][y]) {
					case 0:
						this.drawBlock(boardX, boardY, "black");
						boardX+=30;
						break;
							
					case 1:
						this.drawBlock(boardX, boardY, "red");
						boardX+=30;
						break;
						
					case 2:
						this.drawBlock(boardX, boardY, "gray");
						boardX+=30;
						break;
						
					case 3:
						this.drawBlock(boardX, boardY, "cyan");
						boardX+=30;
						break;
						
						
					case 4:
						this.drawBlock(boardX, boardY, "yellow");
						boardX+=30;
						break;
						
					case 5:
						this.drawBlock(boardX, boardY, "fuchsia");
						boardX+=30;
						break;
						
					case 6:
						this.drawBlock(boardX, boardY, "blue");
						boardX+=30;
						break;
						
					case 7:
						this.drawBlock(boardX, boardY, "lime");
						boardX+=30;
						break;
						
					default:
						console.log("ERROR! Shapes id doesn't exists!");
						break;
					}
				}
				boardX = 150;
				boardY += 30;
		}
	},
	
	drawScore: function(score, lines) {
		
		this.ctx.clearRect(0, 30, 91, 31);
		
		for (let x=0; x<3; x++) {
			this.ctx.fillStyle = "black";
			this.ctx.fillRect(30*x, 30, 30, 30);
			this.ctx.fillRect(30*x, 90, 30, 30);
		}
		
		this.ctx.beginPath();
		this.ctx.strokeStyle = "white";
		this.ctx.rect(0.5, 30.5, 90, 30);
		this.ctx.rect(0.5, 90.5, 90, 30);
		this.ctx.stroke();
		
		this.ctx.fillStyle = "white";
		this.ctx.font = "20px Arial";
		this.ctx.fillText(score, 3, 54);
		this.ctx.fillText(lines, 3, 115);
		
		
	}
}


function checkCollision(x, y, name, rotation) {
	
	let shp = tetrimino[name].shape[rotation];
	let lgth = shp.length;
	
	let addx=0;
	let addy=0;
	
	for (let i=0; i<lgth; i++) {
		let shapeId = shp[i];
		
		switch (shapeId) {
			case 0:
				addx += 1;
				break;
			
			case 1:
				if(x+addx>9 || x+addx<0) {
					do{
						x-=1;
						Player.x-=1;
					}while(x+addx>9)	
				}
				
				if(matrix[(x+addx)][y+addy] !== 0) {
					return 9;
				}
				addx += 1;
				break;
			
			case 2:
				addx = 0;
				addy += 1;
				break;
			
			default:
				console.log("ERROR! Shapes id doesn't exists!");
				break;
		}
	}
	return 0;
}

var czas = 1000;

function checkLine(y, lines, combo) {


	for (let g=0;g<10;g++) {
		if(matrix[g][0]!==0) {
			document.getElementById('mini_game_menu').style.display = 'block';
			clearInterval(time);
			time = 0;
			return false;
		}
	}
	
	for (let y=19;y>0;y--) {
		
		let line = [];
		
		for (let x=0; x<10; x++) {
			if(matrix[x][y]!==0){
				line.push(1);
			}
			
			if(line.length === 10)
			{	
				
				
				line = [];
				for(c=0;c<10;c++) {
					matrix[c][y] = 0;
				}
				
				for(p=0; p<y ;p++) {
					for(t=0; t<10; t++) {
						matrix[t][y-p] = 0;
						matrix[t][y-p] = matrix[t][y-p-1];
						matrix[t][y-p-1] = 0;
					}
				}
				
				if(Player.lines%10===0 && Player.lines!==0) {
					czas = czas/2;
				}
				
				clearInterval(time);
				time = setInterval(() => {
					Player.y+=1;
				}, czas);
				Player.lines += 1;
				
				Player.combo += 1;
				return true;
			}
		}
	}
	
	return false;
	
}



function updateGameArea() {
	
	if(time === 1)
	{
			time = setInterval(() => {
				Player.y+=1;
			}, czas);
		
	}
	
	if (Player.x <= 0) {
		Player.x = 0;
	}
	
	if (Player.x >= 9) {
		Player.x = 9;
	}

	myGameArea.clear(Player.lastPlayerX,Player.lastPlayerY,Player.randomBrick,Player.lastPlayerR);
	
	if(checkCollision(Player.x, Player.y, Player.randomBrick, Player.rotation) === 9) {
		
		printTetrimino(Player.randomBrick, Player.lastPlayerX, Player.lastPlayerY, Player.lastPlayerR);
		do{
			checkLine();
		
		}while(checkLine());
		
		Player.updateScore();
		myGameArea.drawScore(Player.score, Player.lines);
		
		Player.reset();		
	}
	
	else {	
		Player.updateCoords()
	
		printTetrimino(Player.randomBrick, Player.x, Player.y, Player.rotation);
		
		myGameArea.draw();
	}
}





function printTetrimino(name, x, y, rotation) {
	let shp = tetrimino[name].shape[rotation];
	let lgth = shp.length;
	
	let addx=0;
	let addy=0;
	
	for (let i=0; i<lgth; i++)
	{
		let shapeId = shp[i];
		
		switch (shapeId) {
			case 0:
				addx += 1;
				break;
			
			case 1:
				matrix[(x+addx)][y+addy] = tetrimino[name].id;
				addx += 1;
				break;
			
			case 2:
				addx = 0;
				addy += 1;
				break;
			
			default:
				console.log("ERROR! Shapes id doesn't exists!");
				break;
		}
	}
}

window.addEventListener("keydown", function(event) {
	
	if(event.key === 'ArrowLeft' && time !=0) {
		if(Player.lastPlayerX>0)
		{
			myGameArea.clear(Player.lastPlayerX,Player.lastPlayerY,Player.randomBrick,Player.lastPlayerR);
			let b = checkCollision (Player.x-1, Player.y, Player.randomBrick, Player.rotation);
			
				if(b!==9) {
					Player.x-=1;
				}
		}
	}
	
	if(event.key === 'ArrowRight' && time !=0) {
		myGameArea.clear(Player.lastPlayerX,Player.lastPlayerY,Player.randomBrick,Player.lastPlayerR);
		
			if(checkCollision (Player.x+1, Player.y, Player.randomBrick, Player.rotation) !==9) {
				Player.x+=1;
			}
	}
	
	if(event.key === 'ArrowDown' && time !=0) {
		clearInterval(time);
		time = 1;
		event.preventDefault();
		Player.y+=1;
	}

	
	
	if(event.key === 'ArrowUp' && time !=0) {		
		Player.rotation += 1;

		if(Player.rotation>=4) {
			Player.rotation = 0;
		}
		
	}
})

