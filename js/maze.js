$(document).ready(function(){
	let isWin = true;
	$("#maze .boundary").hover(
		function(){
			$(this).addClass("youlose");
		},
		function(){
			$(this).removeClass("youlose");
		}
	);
	
	$("#start").click(function(){
		//alert("Start");
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
		//alert("End");
		if(isWin){
			$("#status").text('You win!');
		}
		else{
			$("#status").text("You lose!");
		}
	});
});