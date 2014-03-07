var gameboard, scoreValue, highScoreValue, snakeField, displayedScore = 0, dctimer, border, displayedHighScore;
function initGameboard(){
	displayedScore = 0;
	border = canvas.display.rectangle({
		x: 20,
		y: 20,
		height: 560,
		width: 600,
		stroke: "1px rgb(13, 199, 13)",
		fill: "#1c1c1c"
	})

	var scoreText = canvas.display.text({
		x: 710,
		y: 30,
		origin: {x:"center", y:"top"}, 
		text: "Score:",
		font: "15px sans-serif",
		fill: "rgb(14,161,14)"
	})

	scoreValue = canvas.display.text({
		x: 710,
		y: 50,
		origin: {x:"center", y:"top"}, 
		text: "00000",
		font: "30px Audiowide",
		fill: "rgb(14,161,14)"
	})

	var highScoreText = canvas.display.text({
		x: 710,
		y: 90,
		origin: {x:"center", y:"top"}, 
		text: "High score:",
		font: "15px sans-serif",
		fill: "rgb(14,161,14)"
	})

	displayedHighScore = getHighScore(currentDifficulty.difficulty);
	var highscore = displayedHighScore.toString();	
	while (highscore.length != 5) highscore = "0"+highscore;

	highScoreValue = canvas.display.text({
		x: 710,
		y: 110,
		origin: {x:"center", y:"top"}, 
		text: highscore,
		font: "30px Audiowide",
		fill: "rgb(14,161,14)"
	})

	snakeField = canvas.display.snakefield({
		x: 23,
		y: 23,
		height: 554,
		width: 604
	})

	var dctimer = setInterval(function(){
		var sscore
		if (displayedScore < score){
			displayedScore += 1;
			sscore = displayedScore.toString();
			while (sscore.length != 5) sscore = "0"+sscore;
			scoreValue.text = sscore;
		}
		if (displayedHighScore < score){
			highScoreValue.text = scoreValue.text;
		}
	}, 30)

	gameboard = canvas.scenes.create("gameboard", function(){
		this.add(border);
		this.add(scoreText);
		this.add(scoreValue);
		this.add(snakeField);
		this.add(highScoreText);
		this.add(highScoreValue);
	})
}

function makeUIForNewGame(){
	scoreValue.text = "00000";
	displayedScore = 0;

	displayedHighScore = getHighScore(currentDifficulty.difficulty);
	var highscore = displayedHighScore.toString();	
	while (highscore.length != 5) highscore = "0"+highscore;
	highScoreValue.text = highscore;
}

function UIShowResults(x, y){
	console.log(x, y);
	var arc = canvas.display.arc({
		x: Math.round(x), y: Math.round(y),
		radius: 800,
		strokeColor: "#222",
		strokeWidth: 1,
		start: 0,
		end: 360
	}).add();

	arc.animate({
		strokeWidth: 1600
	}, {
		duration: 700,
		easing: "ease-in-cubic",
		callback: function(){
			showResults();
		}
	})
}