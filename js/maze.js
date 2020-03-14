$(document).ready(function(){
	let isWin = true;
	let isStart = false;
	
	$("#start").click(function(){
		//isWin = true;
		if(!isStart){
			isStart = true;
			$('.boundary').removeClass('youlose');
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
	
	$('.boundary').mouseover(function(){
		if(isStart){
			$('.boundary').addClass('youlose');
			isWin = false;
		}
	});
	
	$("body, div#maze, div#maze div").mouseover(function(e){
        if (isStart) {
            if (this.className != "boundary" && this.id != "maze" && this.nodeName != "DIV") {
                //if cheating
                $("#status").text("You lost. :[");
                $(".boundary").addClass("youlose");
				isStart = false;
            }
        }
        e.stopPropagation();
    })
});