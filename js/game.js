console.log("/ AAAAA! snakes: the game /");

var canvas;

var currentDifficulty = {timerInterval: 50, difficulty:1};
var difficultyStrings = ["Easy", "Medium", "Hard", "Insane"];

window.onload = function(){
	canvas = oCanvas.create({
		canvas: "canvas",
		background: "#222"
	});

	initMenu();

	initSnakeField();
	initGameboard();
	initResults();
	menu.load();

	window.addEventListener("keydown", function(e) {
    // space and arrow keys
    	if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
       		e.preventDefault();
    	}
	}, false);

	document.onkeydown = function(e){
		if (snakeActive){
			if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
       			e.preventDefault();
       			changeDirection(e.keyCode);
    		}
		}
	}	
}

function startGame(difficulty){
	var times = [70, 50, 30, 10];
	currentDifficulty.timerInterval = times[difficulty];
	currentDifficulty.difficulty = difficulty;
	menu.unload();
	gameboard.load();
	releaseSnake();
}

function showResults(){
	gameboard.unload();
	results.load();
	makeStat();
}

function restartGame(){
	results.unload();
	gameboard.load();
	releaseSnake();
}

function backToMainMenu(){
	results.unload();
	menu.load();
}