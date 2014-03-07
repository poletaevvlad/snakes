function saveHighScore(score, dif){
	console.log("saved" + score)
	localStorage['snake.highScore.difficulty_'+dif] = score;
}

function getHighScore(dif){
	var a = localStorage['snake.highScore.difficulty_'+dif];
	if (!a) a=0;
	return a;
} 