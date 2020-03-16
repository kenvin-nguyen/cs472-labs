"use strict";
$(document).ready(function(){
	module.init();
    $("#shufflebutton").bind('click', function () {
        module.shufflingTile();
    });
});

let module = (function(){
	let emptyBlock = {};
	let tileRow = 3;
	let tileCol = 3;
	const noOfRows_Cols = 4;
	const tileSides = 100;
	function init(){
		$('#puzzlearea > div').each(function(idx){
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
				if (checkBlockCanMove(tile)) {
                    shiftTile(tile);
                }
				
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
		let tileWidth = 100;
		if (!isSameRowAndCol(tile)) {
			return false;
		}
		
		if (tile.data('x') + tileWidth === emptyBlock.x 
			|| tile.data('x') - tileWidth === emptyBlock.x 
			|| tile.data('y') + tileWidth === emptyBlock.y 
			|| tile.data('y') - tileWidth === emptyBlock.y){
			
			return true;
		} else {
			return false;
		}	
	}

	function setBlockCanMove() {
		let tiles = $("#puzzlearea > div");
		tiles.each(function (i) {
			let tile = $(this);
			if (checkBlockCanMove(tile)) {
					tile.addClass("movablepiece");
					tile.data('moveable',true);
			} else {
				tile.removeClass("movablepiece");
				tile.data('moveable',false);
			}
		});
	}

	function moveTile(tile, callback) {
		let currentX = tile.data('x');
		let currentY = tile.data('y');
		let id = tile.data("id");
		tile.animate({left: emptyBlock.x + "px", top: emptyBlock.y + "px"}, {
            duration: 10,
            complete: function () {
                tile.data("x", emptyBlock.x);
                tile.data("y", emptyBlock.y);
                tile.data("id", id);
                emptyBlock.x = currentX;
                emptyBlock.y = currentY;
                emptyBlock.id = id;
                setBlockCanMove();
                if (callback) {
                    callback();
                }
            }
        });
	}

	let i = 0;
	let lastMove;
	function shufflingTile() {
		function moveRandom() {
            i += 1;
            let divs = $("#puzzlearea > .movablepiece");
            let randompick = $(divs[Math.floor(Math.random() * divs.length)]);
            if (randompick === lastMove) {
                return moveRandom();
            }
            lastMove = randompick;
            if (i < 40) {
                moveTile(randompick, shufflingTile);
            } else {
                i = 0;
            }
        }
        moveRandom();
	}
	return{init, shufflingTile};
})();