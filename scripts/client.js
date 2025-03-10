const socket = io();

$(document).ready( () => {
    socket.emit('userLogin', {'Id':localStorage.getItem('id'), 'Nick':localStorage.getItem('nick')});
});

socket.on('userData', (userData) => {
    localStorage.setItem('id', userData.Id);
    localStorage.setItem('nick', userData.Nick);

});

function refreshBtn() {
		
    console.log();

    $("#refresh_txt").css({"opacity": "0", "transition":"opacity 0.2s"});
    $("#refresh_img").css({"opacity": "1", "transition":"opacity 1s"});
    $("#refresh_btn").css({"transition":"width 0.5s linear", "width":"30px"});
    
    socket.emit('refreshMultiDataBase');

    setTimeout( () => {
        $("#refresh_img").css({"transition":"opacity 0.2s", "opacity":"0"});
        $("#refresh_txt").css({"transition":"opacity 1.25s", "opacity":"1"});
        $("#refresh_btn").css({"transition":"width 0.5s linear", "width":"150px"});
    }, 3000);
}

$("#match_form_btn").on('click', () => { 

    socket.emit('newMatch', "null,'"+$("#match_name").val()+"','"+$("#match_pswd").val()+"',"+$("#match_players").val()+",1,'"+$("#match_game_mode").val()+"','"+$("#match_desc").val()+"', '"+new Date().toJSON().slice(0, 19).replace('T', ' ')+"', null");
    
});

socket.on('newMultiDataBase', (data) => {
    for (let i = 0; i<data.length; i++)
    {

        $("#table_titles").after("<tr class='database_row' id='"+data[i].id+"' onclick='joinMatchBox()'><td id='table_name'>"+data[i].name+"</td><td id='table_pass'>"+data[i].pswd+"</td><td id='table_players'>"+data[i].number_of_players+"/"+data[i].max_players+"</td><td id='table_mode'>"+data[i].mode+"</td><td id='table_desc'>"+data[i].description+"</td></tr>");
        //console.log(data[i]);
    }

});