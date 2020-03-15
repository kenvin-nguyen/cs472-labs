"use strict";
$(document).ready(function(){
	init();
    $("#shufflebutton").bind('click', function () {
        shufflingTile();
    });
});

let emptyBlock = {};
let tileRow = 3;
let tileCol = 3;
const noOfRows_Cols = 4;
const tileSides = 100;
function init(){
	$('#puzzlearea > div').each(function(idx, e){
		let x = ((idx % noOfRows_Cols) * tileSides) ;
		let y = (Math.floor(idx / noOfRows_Cols) * tileSides) ;
		let tile = $(this);

		// set basic style and background
		tile.addClass("puzzlepiece");
		tile.css({
			'left': x + 'px',
			'top': y + 'px',
			'background-image': 'url("images/background-puzzle.jpg")',
			'background-position-x': -x + 'px',
			'background-position-y': (-y) + 'px',
		});
	
        tile.innerHTML = x + "/" + y;
		
		// store x and y for later 
		tile.data('x', x);
		tile.data('y', y);
		
		setTileId(tile, x, y);
		
		tile.bind('click', function(){
			shiftTile(tile);
		});
		
		// tile 15th is blank at initial
		if (idx === 14) {
			emptyBlock = {x: x + tileSides, y: y};
			setBlockCanMove();
		}
	
	});
}

function isSameRowAndCol(tile) {
	return tile.data('x') === emptyBlock.x || tile.data('y') === emptyBlock.y;
}

function setTileId(tile, x, y) {
	tileRow = (x / tileSides) + 1;
	tileCol = (y / tileSides) + 1;
	tile.data('id', 'square_' + tileRow + "_" + tileCol);
}

function shiftTile(tile){
	//alert('shift');
	let currentX = tile.data('x');
	let currentY = tile.data('y');
	if (checkBlockCanMove(tile)) {
		tile.animate({left: emptyBlock.x + 'px', top: emptyBlock.y + 'px'});
		tile.data('x', emptyBlock.x);
		tile.data('y', emptyBlock.y);
		emptyBlock.x = currentX;
		emptyBlock.y = currentY;
		setBlockCanMove();
	}
}

function checkBlockCanMove(tile) {
	//console.log("checkBlockCanMove tile:" + tile.data('x') + "/" + tile.data('y') + "-" + emptyBlock.x + "/" + emptyBlock.y);
	let blockWidth = 100;
	if (!isSameRowAndCol(tile)) {
		console.log("No no no" + tile.data('id'));
		return false;
	}
	
	if (tile.data('x') + blockWidth === emptyBlock.x 
		|| tile.data('x') - blockWidth === emptyBlock.x 
		|| tile.data('y') + blockWidth === emptyBlock.y 
		|| tile.data('y') - blockWidth === emptyBlock.y){
		//console.log("moveable tile: " + tile.data('id'));
		return true;
	} else {
		console.log("no no no" + tile.data('id'));
		return false;
	}	
}

function setBlockCanMove() {
	let tiles = $("#puzzlearea > div");
	tiles.each(function (i) {
		let tile = $(this);
		if (checkBlockCanMove(tile)) {
			console.log("true " + tile.data('id'));
				tile.addClass("movablepiece");
				tile.data('moveable',true);
		} else {
			tile.removeClass("movablepiece");
			tile.data('moveable',false);
		}
	});
}

function moveTile(div) {
    let currentX = div.data('x');
    let currentY = div.data('y');
    if (checkBlockCanMove(div)) {
        div.animate({left: emptyBlock.x + 'px', top: emptyBlock.y + 'px'});
        div.data('x', emptyBlock.x);
        div.data('y', emptyBlock.y);
        emptyBlock.x = currentX;
        emptyBlock.y = currentY;
        setBlockCanMove();
    }
}

function shufflingTile() {
    var lastMove;
    function moveRandom() {
		let listTile = [];
        $("#puzzlearea > .movablepiece").each(function (index) {
            if ($(this).data('moveable')) {
                listTile.push($(this));
            }
        });
        var randompick = $(listTile[Math.floor(Math.random() * listTile.length)]);
        if (randompick === lastMove) {
            return moveRandom();
        }
        lastMove = randompick;
        moveTile(randompick);
    }
    moveRandom();
}

