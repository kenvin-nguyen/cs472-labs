"use strict";
window.onload = behaviors;

function behaviors(){
	document.getElementById("mytextarea").value = ANIMATIONS[getAnimate()];
	document.getElementById("mytextarea").style.fontSize = getFontSize;
	
	document.getElementById("fontSelect").onchange = changeFont;
	
	document.getElementById("startbtn").onclick = start;
	document.getElementById("stopbtn").onclick = stop;
	document.getElementById("animation").onchange = changeAnimate;
	document.getElementById("speedcbx").onchange = speedOnChange;
}


let interval = null;
let currentFrame = -1;
let isStarted = false;

function start(){
	isStarted = true;
	document.getElementById("startbtn").disabled = true;
	document.getElementById("stopbtn").disabled = false;
	document.getElementById("animation").disabled = true;
	showFrames();
}
function stop(){
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
}
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

function changeFont(){
	document.getElementById("mytextarea").style.fontSize = getFontSize();
}

function getFontSize(){
	return document.getElementById("fontSelect").value;
}

function changeAnimate(){
	currentFrame = -1;
	showFrames()
}

function getAnimate(){
	return document.getElementById("animation").value;
}

function speedOnChange(){
	
	showFrames();
}

function getSpeed(){
	if(document.getElementById("speedcbx").checked){
		return 50;
	}
	else{
		return 250;
	}		 
}
