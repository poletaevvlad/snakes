var results, statProps;
function initResults(){
	var title = canvas.display.text({
		origin: {x : "center", y : "top"},
		x: 400,
		y: 100,
		font: "50px Audiowide",
		text: "Game over",
		fill: "rgb(14,161,14)"
	});

	var ssc = score.toString();
	while (ssc.length < 5) ssc = "0"+ssc;

	var objs = [], i;
	
	var stat = [
		["Time", "0d 0h 0m 0s"],
		["Score", ssc],
		["Food", foodTaken],
		["Length", snake.length],
		["Difficulty", "Medium"]
	];

	statProps = [];

	for (i=0; i<stat.length; i++){
		var propertyName = canvas.display.text({
			origin: {x: "right", y : "top"},
			x: 180+180,
			y: 220 + i * 35,
			font: "20px Audiowide",
			text: stat[i][0],
			fill: "rgb(14,161,14)"
		});
		objs.push(propertyName);
		var propertyValue = canvas.display.text({
			origin: {x: "left", y : "top"},
			x: 180+220,
			y: 220 + i * 35,
			font: "20px Audiowide",
			text: stat[i][1],
			fill: "rgb(14,161,14)"
		});
		statProps.push(propertyValue);
		objs.push(propertyValue);
	}

	function displayButton(canvas, properties, text, textProperties, callback){
		properties.fill = "rgb(40,49,40)";
		properties.stroke = "1px rgb(14,161,14)";
		var shareBtn = canvas.display.rectangle(properties).bind("mouseenter", function(){
			canvas.mouse.cursor("pointer");
			this.fill = "rgb(47, 69, 48)";
			this.stroke = "1px rgb(13, 199, 13)";
			this.redraw();
		}).bind("mouseleave", function(){
			canvas.mouse.cursor("default");
			this.fill = "rgb(40,49,40)";
			this.stroke = "1px rgb(14,161,14)";
			this.redraw();
		}).bind("click tap", callback);
		
		textProperties.x = properties.width / 2;
		textProperties.y = properties.height / 2;
		textProperties.origin = {x: "center", y: "center"};
		textProperties.text = text;
		textProperties.width = properties.width;
		if (!textProperties.font) textProperties.font = "15px Audiowide";
		textProperties.fill = "rgb(13, 199, 13)";
		var shareText = canvas.display.text(textProperties);

		shareBtn.addChild(shareText);
		return shareBtn;
	}

	/*for (i = 0; i<2; i++){
		var texts = ["Share on Twitter", "Share on Facebook"];
		objs.push(displayButton(canvas, {
			width: 200,
			height: 40,
			x: 470,
			y: 250 + 60*i,
			social: i
		}, texts[i], function(){
			switch (this.social){
				case 0: 
					alert("Tweet");
					break;
				case 1:
					alert("Facebook");
					break;
			}
		}));
	}*/

	var retryBtn = displayButton(canvas, {
		x: 150,
		y: 450,
		height: 70,
		width: 200
	}, "Retry", {
		font: "25px Audiowide"
	}, restartGame);

	var menuBtn = displayButton(canvas, {
		x: 450,
		y: 450,
		origin: {x: "left", y: "top"},
		height: 70,
		width: 200
	}, "Main menu", {
		font: "25px Audiowide"
	}, function(){
		backToMainMenu();
	});
	
	results = canvas.scenes.create("results", function(){
		this.add(title);
		for (i=0; i<objs.length; i++){
			this.add(objs[i]);
		}
		this.add(retryBtn);
		this.add(menuBtn);
	})
}

function makeStat(){
	var _time = Math.round((Date.now() - startTime)/1000)
	var s = _time % 60,
		m = Math.floor(_time / 60 % 60),
		h = Math.floor(_time / 3600 % 60),
		d = Math.floor(_time / 5184000); 
	statProps[0].text = d + "d " + h + "h " + m + "m " + s + "s";
	statProps[1].text = score;
	statProps[2].text = foodTaken;
	statProps[3].text = snake.length;
	statProps[4].text = difficultyStrings[currentDifficulty.difficulty];
}