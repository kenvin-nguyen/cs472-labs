"use strict";
//window.onload = behaviors;

let myAscii = (function behaviors(){
	document.getElementById("mytextarea").value = ANIMATIONS[getAnimate()];
	document.getElementById("mytextarea").style.fontSize = getFontSize;
	let interval = null;
	let currentFrame = -1;
	let isStarted = false;

	function showFrames(){
		let speed = getSpeed();
		let animation = getAnimate();
		
		if(interval !== null){
			clearInterval(interval);
		}
		if(isStarted){
			if(ANIMATIONS[animation] !== ""){
				let frames = ANIMATIONS[animation].split("=====\n");
				
				if(currentFrame == -1){
					currentFrame = 0;
				}
				
				interval = setInterval(function(){
					
					if(currentFrame === frames.length){
						currentFrame = 0;
					}
					document.getElementById("mytextarea").value = frames[currentFrame++];
					
				}, speed);
			}
			else{
				document.getElementById("mytextarea").value ="";
			}
		}
		else{
			document.getElementById("mytextarea").value = ANIMATIONS[getAnimate()];
		}
		
	}

	function getFontSize(){
		return document.getElementById("fontSelect").value;
	}

	function getAnimate(){
		return document.getElementById("animation").value;
	}

	function getSpeed(){
		if(document.getElementById("speedcbx").checked){
			return 50;
		}
		else{
			return 250;
		}		 
	}
	
	return {
		start:function(){
			isStarted = true;
			document.getElementById("startbtn").disabled = true;
			document.getElementById("stopbtn").disabled = false;
			document.getElementById("animation").disabled = true;
			showFrames();
		},
		stop: function(){
			isStarted = false;
			currentFrame = -1;

			if(interval !== null){
				clearInterval(interval);
				interval = null;
				document.getElementById("mytextarea").value = ANIMATIONS[getAnimate()];
			}
			document.getElementById('startbtn').disabled = false;
			document.getElementById('stopbtn').disabled = true;
			document.getElementById("animation").disabled = false;
		},
		speedOnChange:function(){
	
			showFrames();
		},
		changeFont: function(){
			document.getElementById("mytextarea").style.fontSize = getFontSize();
		},
		changeAnimate: function(){
			currentFrame = -1;
			showFrames()
		}
	}
})();

document.getElementById("fontSelect").onchange = myAscii.changeFont;
document.getElementById("startbtn").onclick = myAscii.start;
document.getElementById("stopbtn").onclick = myAscii.stop;
document.getElementById("animation").onchange = myAscii.changeAnimate;
document.getElementById("speedcbx").onchange = myAscii.speedOnChange;