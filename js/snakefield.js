var DIRECTION_RIGHT = 39,
	DIRECTION_LEFT = 37,
	DIRECTION_DOWN = 40,
	DIRECTION_UP = 38;

var cellSize = 5;
var height = 92, width = 99;

var snakeActive = false;

var snake = [];
var snakeHead = {x:0, y:0};
var direction = [0,0];
var food = [];
var lengthInc = 0;
var score = 0;
var time = 0;
var timer = null;

var startTime = Date.now();
var foodTaken = 0;

function initSnakeField(){
	canvas.display.register("snakefield", {
		shapeType: "rectangular"
	}, function(canvas){
		var i;
		for (i=0; i<snake.length; i++){
			var cell = snake[i];
			canvas.fillStyle = "white";
			canvas.fillRect(cell.x*(cellSize+1), cell.y*(cellSize+1), cellSize, cellSize);
		}
		for (i=0; i<food.length; i++){
			var cell = food[i];
			canvas.fillStyle = "red";
			canvas.beginPath();
			canvas.arc(cell.x*(cellSize+1) + cellSize/2, cell.y*(cellSize+1) + cellSize/2, cellSize/2, 0, 2*Math.PI, true);
			canvas.fill();
		}
	})
}

function incScore(value){
	score += value;
}

function indexOfCell(array, cell){
	var i=0;
	while (i<array.length){
		if (array[i].x == cell.x && array[i].y == cell.y) break;
		i++;
	}
	if (i == array.length){
		return -1;
	}
	return i;
}

function addAFood(){
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	do{
		f = {x: getRandomInt(0, width-1), y: getRandomInt(0, height-1)};
	}while (indexOfCell(snake, f) != -1 || indexOfCell(food, f) != -1);
	food.push(f);
}

function moveSnake(){
	var newx = snakeHead.x + direction[0],
		newy = snakeHead.y + direction[1];
	
	if (newx == -1) newx = width-1;
	if (newx == width) newx = 0;
	if (newy == -1) newy = height-1;
	if (newy == height) newy = 0;

	var nc = {x: newx, y: newy};
	if (indexOfCell(snake, nc) != -1){
		stopGame();
	}
	
	var foodPos = indexOfCell(food, nc); 
	if (foodPos != -1){
		lengthInc+=5;
		food.splice(foodPos,1);
		addAFood();
		incScore(10);
		foodTaken++;
	}
	snakeHead = nc;   
	snake.push(nc);
	lengthInc--;
	if (lengthInc == -1){
		snake.shift();
		lengthInc = 0;
	}
	thdirection = direction;
}

function changeDirection(dir){
	function sameDirection(a,b){
		return a[0]==b[0] && a[1]==b[1];
	}
	switch (dir){
		case DIRECTION_RIGHT: 
			if (! sameDirection(thdirection, [-1, 0])) direction = [1, 0];
			break;
		case DIRECTION_UP:
			if (! sameDirection(thdirection, [0, 1])) direction = [0, -1];
			break;
		case DIRECTION_LEFT:
			if (! sameDirection(thdirection, [1, 0])) direction = [-1, 0];
			break;
		case DIRECTION_DOWN:
			if (! sameDirection(thdirection, [0, -1])) direction = [0, 1];
			break;
	}
}

function releaseSnake(){
	snake = [{x:0, y:0}, {x:1, y:0}, {x:2, y:0}];
	snakeHead = {x:2, y:0};
	direction = [1,0];
	food = [{x:10, y:10}];
	lengthInc = 0;
	score = 0;
	foodTaken = 0;
	startTime = Date.now();
	makeUIForNewGame();

	timer = setInterval(function(){
		moveSnake();
		canvas.redraw();
	}, currentDifficulty.timerInterval);
	
	snakeActive = true;
}

function stopGame(){
	snakeActive = false;
	clearInterval(timer);
	if (score > getHighScore(currentDifficulty.difficulty)){
		saveHighScore(score, currentDifficulty.difficulty);
	}
	//setTimeout(function(){
	UIShowResults(snakeHead.x * (cellSize+1) + cellSize/2, snakeHead.y*(cellSize+1) + cellSize/2);
	
}