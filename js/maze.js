$(document).ready(function(){
	let isWin = true;
	let isStart = false;
	
	$("#start").click(function(){
		//isWin = true;
		if(!isStart){
			isStart = true;
			$('#maze > div.boundary').removeClass('youlose');
			$("#status").text('Started');
		}
	});
	
	$("#end").mouseover(function(){
		if(isStart){
			if(isWin){
				$("#status").text('You win!');
				
			}
			else{
				$("#status").text("You lost. :[");
			}
		}
		isStart = false;
	});
	
	$('#maze > div.boundary').mouseover(function(){
		if(isStart){
			$('#maze > div.boundary').addClass('youlose');
			isWin = false;
		}
	});
	
	$("body, div#maze, div#maze div").mouseover(function(e){
        if (isStart) {
            if (this.className != "boundary" && this.id != "maze" && this.nodeName != "DIV") {
                //disable cheating
                $("#status").text("You lost. :[");
                $("#maze > div.boundary").addClass("youlose");
				isStart = false;
            }
        }
        e.stopPropagation();
    })
});