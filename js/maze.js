$(document).ready(function(){
	let isWin = true;
	let isStart = false;
	
	$("#start").click(function(){
		isWin = true;
		isStart = true;
		$("#status").text('Click the "S" to begin.');
		$(".boundary").each(function(){
			$(this).removeClass("youlose");
		});
		
		$(".boundary").mouseover(function(){
				$("#maze .boundary").each(function(){
					$(this).addClass("youlose");
					isWin = false;
				});
			}
		);
	});
	
	$("#end").mouseover(function(){
		if(isStart){
			if(isWin){
				$("#status").text('You win!');
				$("#maze .boundary").each(function(){
					$(this).unbind('mouseover');
				});
			}
			else{
				$("#status").text("You lost. :[");
			}
		}
		isStart = false;
	});
	
	$("body, div#maze, div#maze div").mouseover(function(e){
        if (isStart) {
            if (this.className != "boundary" && this.id != "maze" && this.nodeName != "DIV") {
                //avoid cheating
                isStart = false;
                $("#status").text("You lost. :[");
                $(".boundary").addClass("youlose");
            }
        }
        e.stopPropagation();
    })
});