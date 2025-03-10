function joinMatchBox(){
	if($("#join_match").css('display')=='none') {
		$("#join_match").fadeIn(200);
		$(".overlay").fadeTo(200, 0.5);
	} else {
		$(".overlay").fadeTo(200, 0, ()=>{
			$(".overlay").hide();
		});
		$("#join_match").fadeOut(250);
	}
}

$(".overlay").on('click', ()=>{
	$(".overlay").fadeTo(200, 0, ()=>{
		$(".overlay").hide();
	});
	$("#join_match").fadeOut(250);

})

$("#ham_menu").on('click', () => {
	$("#side_nav").css("width", "200px");
});

$("#win").on('click', () => {
	if($("#side_nav").width() > 0)
	{
		$("#side_nav").css("width", "0");
	}
});

$("#side_nav_cross").on('click', () => {
	$("#side_nav").css("width", "0");
});

$(".nav_multi_opt").on('click', () => {
	if($(".nav_multi_opt").html() === "Multiplayer") {
		$(".nav_multi_opt").html("Singleplayer");
		$("#game_win").css({"left":"-2000px", "opacity":"0", "transition":"all 1s ease-out"});
		$("#multi_main_win").css({"left":"0", "opacity":"1", "transition":"all 1s ease-out"});
		$("#side_nav").css("width", "0");
	} else {
		$(".nav_multi_opt").html("Multiplayer");
		$("#game_win").css({"left":"0", "opacity":"1", "transition":"all 1s ease-out"});
		$("#multi_main_win").css({"left":"2000px", "opacity":"0", "transition":"all 1s ease-out"});
		$("#side_nav").css("width", "0");
	}
});

	$('#restart').on('click', () =>{

		matrix = [];

		for (let x=0; x<10; x++)
		{
			matrix[x] = [];
		
			for (let y=0;y<20;y++)
			{	
				matrix[x][y] = 0;
			}
			matrix[x][20] = 9;
		}
		
		startGame()
	});

	$(".eye_svg").on('click', () => {
		if ($(".pswd").attr("type") == "password") {
			$(".eye_svg").css({"background":"url(../img/crossed_out_eye.svg)"})
			$(".pswd").attr("type", "text");
		  } else {
			$(".eye_svg").css({"background":"url(../img/eye.svg)"})
			$(".pswd").attr("type", "password");
		  }
	})

	function gameMenu() {
		if($("#multi_nav_bar div:first").html() === "Dołącz") {
			$("#create_game").hide();
			$("#rooms_list").show();
			$("#refresh_btn").show();
			$("#multi_nav_bar div:first").html("Utwórz");
		} else {
		
			$("#create_game").show();
			$("#rooms_list").hide();
			$("#refresh_btn").hide();
			$("#multi_nav_bar div:first").html("Dołącz");
		}
		$(".eye_svg").css({"background":"url(../img/eye.svg)"})
		$(".pswd").attr("type", "password");
	}

	

	

	