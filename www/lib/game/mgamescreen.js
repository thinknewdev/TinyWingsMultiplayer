ig.module( 
	'game.mgamescreen' 
)
.requires(
	'impact.game',
	'impact.font',


	'game.levels.lvl1',
	'game.levels.intro',
	//'impact.debug.debug',
	
	'plugins.notification-manager'
)
.defines(function(){


	var background = {};
	background.cloud = new Image(300,150);

	var stageholder = {};
	stageholder.canvas = new Image(480,320);

	background.init = function(){
		if(!gameIsMobile){
			background.clouds = [{"x":675,"y":-250,"velX":1},
						 {"x":0,"y":-500,"velX":2},
						 {"x":1000,"y":-750,"velX":3}];
		}
	}

	background.enterFrame = function()
	{
		if(!gameIsMobile){
			var i;
			for(i=0;i<background.clouds.length;i++){
				background.clouds[i].x -= background.clouds[i].velX;
				if(background.clouds[i].x<-1000){
					background.clouds[i].x = 1425;
				}
			}
		}
	}

	background.draw = function()
	{
		// Background Sun
		ctx.save();
		ctx.translate(800,600-HUD.timer*1000);
		ctx.fillStyle = "#FFD";
		ctx.beginPath();
		ctx.arc(0,0,330,0,Math.PI*2,false);
	  	ctx.fill();
	    ctx.lineWidth = 10;
	    ctx.strokeStyle = "#FFA";
	    ctx.stroke();
		ctx.restore();
		
		// Background Clouds
		if(!gameIsMobile){
			ctx.save();
			ctx.globalAlpha = 0.8;
			var i;
			for(i=0;i<background.clouds.length;i++){
				ctx.drawImage( background.cloud, background.clouds[i].x, background.clouds[i].y, background.cloud.width*2, background.cloud.height*2);
			}
			ctx.restore();
		}
	}

	var HUD = {};
	HUD.timerImage = new Image(100,100);

	HUD.init = function(){
		HUD.awesome = 0;
		HUD.timer = 1;
		HUD.points = 0;
		HUD.parasprites = 0;
		HUD.groundvel = 0;
		HUD.maxalt = 0;
		HUD.endTimer = 0;
	}


	HUD.draw = function(){
		/*
		ctx.clearRect(0, 0, 960, 640); // Clear the canvas

		// Draw Night
		if(HUD.timer<0.2){

			

			ctx.save();
			ctx.fillStyle = "#003";
			if(HUD.timer>0){
				ctx.globalAlpha = 0.8*(0.2-HUD.timer)/0.2;
			}else{
				ctx.globalAlpha = 0.8;
			}
			ctx.fillRect(0,0,480,300);
			ctx.restore();
			
		}
		
				
		// Draw Outer Circle
		ctx.fillStyle = "#333";
		ctx.beginPath();
		ctx.arc(0,300,60,0,Math.PI*2,false);
		ctx.fill();
			
		// Draw Sun & Moon
		ctx.save();
		ctx.translate(0,300);
		ctx.rotate((1-HUD.timer)*0.5*Math.PI);
		ctx.drawImage( HUD.timerImage, -50, -50, 100, 100 );
		ctx.restore();
			
		// Draw Arc
		if(HUD.awesome>=0){
			ctx.beginPath();
			ctx.arc(0,300,55,0,-HUD.awesome*0.5*Math.PI,true);
		    ctx.lineWidth = 10;
		    ctx.strokeStyle = "#FFF";
		    ctx.stroke();
	    }
	    //*/
	    /*
		hudCTX.clearRect(0, 0, 960, 640); // Clear the canvas
		if(HUD.timer<0.2){
			/*
			hudCTX.save();
			hudCTX.fillStyle = "#003";
			if(HUD.timer>0){
				hudCTX.globalAlpha = 0.8*(0.2-HUD.timer)/0.2;
			}else{
				hudCTX.globalAlpha = 0.8;
			}
			//hudCTX.fillRect(0,0,480,300);
			hudCTX.restore();
			
		}
		
				
		// Draw Outer Circle
		hudCTX.fillStyle = "#333";
		hudCTX.beginPath();
		hudCTX.arc(0,300,60,0,Math.PI*2,false);
		hudCTX.fill();
			
		// Draw Sun & Moon
		hudCTX.save();
		hudCTX.translate(0,300);
		hudCTX.rotate((1-HUD.timer)*0.5*Math.PI);
		hudCTX.drawImage( HUD.timerImage, -50, -50, 100, 100 );
		hudCTX.restore();
			
		// Draw Arc
		if(HUD.awesome>=0){
			hudCTX.beginPath();
			hudCTX.arc(0,300,55,0,-HUD.awesome*0.5*Math.PI,true);
		    hudCTX.lineWidth = 10;
		    hudCTX.strokeStyle = "#FFF";
		    hudCTX.stroke();
	    }
	   // */
		
	}

	HUD.enterFrame = function(){
		if(player.startMoving){
			
			HUD.awesome *= 3;
			HUD.awesome += 0.02*(-0.04*player.coord.y+player.vel.x*1.2); // Originally 0.04 not 0.02. Halved for better judge of awesome.
			HUD.awesome *= 0.25;
			HUD.timer-=(1/(60*30)-player.vel.x*(1/(60*30))*(1/20));
			
			if(HUD.groundvel<player.vel.x){
				HUD.groundvel = player.vel.x;
			}
			if(HUD.maxalt < -player.coord.y){
				HUD.maxalt = -player.coord.y;
			} 
		
			if(HUD.timer<0){
				HUD.timer = 0;
				//alert("YOU LOSE");
				if(HUD.endTimer==0){
					if(player.vel.x<2 && player.touchGround2){
						HUD.endTimer=60;
					}
				}else{
					HUD.endTimer--;
					if(HUD.endTimer==1){
						menu.gameover();
					}
				}
			}else if(HUD.timer>1){
				HUD.timer = 1;
			}
			
			/*
			if(document.getElementById('instructions').style.display!='none'){
				document.getElementById('instructions').style.opacity -= 0.06;
				if(document.getElementById('instructions').style.opacity<=0.061){
					document.getElementById('instructions').style.display='none';
				}
			}
			*/
		}
		
		// POINTS
		//document.getElementById('points').innerHTML = HUD.points+"m";
		HUD.points = Math.floor(player.coord.x/100);
		if(HUD.points<0){
			HUD.points=0;
		}
	}

	HUD.printStats = function(){
		//document.getElementById('stats_points').innerHTML = document.getElementById('points').innerHTML;
		//document.getElementById('stats_altitude').innerHTML = Math.ceil(HUD.maxalt*0.01);
		//document.getElementById('stats_velocity').innerHTML = Math.ceil(3.6*60*HUD.groundvel*0.01);
		//document.getElementById('stats_parasprites').innerHTML = HUD.parasprites;
	}
	var kCont = {};
	kCont.down = false;
	kCont.S_FUNCTION = function(){
		if(!kCont.down && menu.isGameOver){ PWG.init(); PWG.startTheGame(); }
		kCont.down = true;
		if(menu.isPaused){
			menu.play();
		}
	}
	kCont.keyDownHandler = function(event){
		if(event.keyCode==83){ //}|| event.keyCode==32){
			kCont.S_FUNCTION();
		}
		// Pause
		if(event.keyCode==80 || event.keyCode==27){
			menu.togglePause();
		}
		// Music
		if(event.keyCode==77){
			menu.toggleAudio();
		}
		// Reset
		if(event.keyCode==82){
			if(!kCont.down && player.startMoving){
				PWG.pauseGame();
				PWG.init();
				PWG.startTheGame();
			}
			kCont.down = true;
		}
	}
	kCont.keyUpHandler = function(event){
		kCont.down = false;
		//alert("Key Up"); 
	}
	var menu = {};

	menu.init = function(){
		menu.isPaused = false;
		menu.isGameOver = false;
		//document.getElementById("screen").style.display = "none";
		//document.getElementById("pause").style.display = "block";
		//document.getElementById("gameover").style.display = "none";
	}

	menu.play = function(){
		if(!menu.isGameOver){
			if(menu.isPaused){
				//document.getElementById("screen").style.display = "none";
				//document.getElementById('instructions').style.display='block';
				PWG.playGame();
			}
			menu.isPaused = false;
		}
		//document.getElementById("bpause").className = "hud_button";
	}
	menu.pause = function(){
		if(!menu.isGameOver){
			if(!menu.isPaused){
				//document.getElementById("screen").style.display = "block";
				//document.getElementById('instructions').style.display='none';
				PWG.pauseGame();
			}
			menu.isPaused = true;
		}
		//document.getElementById("bpause").className = "hud_button toggle";
	}
	menu.togglePause = function(){
		if(menu.isGameOver){
			PWG.pauseGame();PWG.init();PWG.startTheGame();
		}else{
			if(menu.isPaused){
				menu.play();
			}else{
				menu.pause();
			}
		}
	}
	menu.toggleAudio = function(){
		if(PWG.musicLoaded){
			if(music.paused){
				music.play();
				//document.getElementById("bmusic").className = "hud_button";
			}else{
				music.pause();
				//document.getElementById("bmusic").className = "hud_button toggle";
			}
		}else if(gameIsMobile){
			music.src = music_source;
			music.addEventListener('canplaythrough', function(){
				PWG.musicLoaded = true;
			}, false);
			music.load();
			music.play();
			musicLoopInit();
			//document.getElementById("bmusic").className = "hud_button";
		}
	}
	menu.gameover = function(){
		menu.isGameOver = true;
		//document.getElementById("screen").style.display = "block";
		//document.getElementById("gameover").style.display = "block";
		//document.getElementById("pause").style.display = "none";
		PWG.pauseGame();
		HUD.printStats();
	}
	var music = new Audio();
	function musicLoopInit(){
		music.addEventListener('ended', function() {
		    music.currentTime = 0;
		    music.play();

		}, false);
	}


	var music = new Audio();
	function musicLoopInit(){
		setInterval( function(){ 
			if(music.currentTime>57){
				music.currentTime = 0; 
				music.play();
			} 
		},200);
		//music.currentTime = 40;
	}
	var music_source;
	if (music.canPlayType('audio/mpeg;')) {
	    music.type= 'audio/mpeg';
	    music_source = 'music/summerwind.mp3';
	} else {
	    music.type= 'audio/ogg';
	   	music_source = 'music/WinterLoop.ogg';
	   // music.type= 'audio/mpeg';
	    //music_source = 'music/summerwind.mp3';
	}
	var player = {};
	player.image = new Image(800,600);

	player.init = function(){
		player.coord = new Object();
		player.vel = new Object();
		player.coord.x = -10;
		player.coord.y = -201;
		player.vel.x = 1.9;
		player.vel.y = -0.9;
		player.rotation = 0;
		player.width = player.height = 200;
		player.frame = 0;
		
		player.touchGround = true;
		player.touchGround2 = true;
		player.touchGround3 = false;
		player.keyDown = false;
		
		
		now.name = "adam"
		//now.createRoom("com.thinknew.tinywings");
	}
	player.startMoving = false;

	player.draw = function()
	{
		// TRANSFORM
		ctx.save();
		ctx.translate(0,player.coord.y);
		ctx.rotate(player.rotation);
		if(HUD.timer>0){
			if(player.touchGround2){
				if(player.keyDown){
					ctx.drawImage( player.image, 202, Math.floor(player.frame)*200+2,196,196, 
									-200/2, -200+20, 200, 200);
				}else{
					ctx.drawImage( player.image, 2, Math.floor(player.frame)*200+2,196,196,
									 -200/2, -200+20, 200, 200);
				}
			}else{
				if(HUD.timer>0 && player.keyDown){
					ctx.drawImage( player.image, 602, Math.floor(player.frame)*200+2,196,196,
									 -200/2, -200+20, 200, 200);
				}else{
					ctx.drawImage( player.image, 402, Math.floor(player.frame)*200+2,196,196,
									-200/2, -200+20, 200, 200);
				}
			}
		}else{
			if(!player.touchGround3){
				if(player.touchGround2){
					player.touchGround3 = true;
					PWG.shake = 100;
				}
			}
			if(player.touchGround3){
				ctx.drawImage( player.image, 800, Math.floor(player.frame)*200,200,200, 
								-200/2, -200+20, 200, 200);
			}else{
				ctx.drawImage( player.image, 400, Math.floor(player.frame)*200,200,200,
									-200/2, -200+20, 200, 200);
			}
		}
		// RESTORE
		
		ctx.restore();
		
	}

	player.broadcastPosition = function(){
			var myJSONObject = {"type": "move", "x": player.coord.x, "y": player.coord.y};
			var myJSONText = JSON.stringify(myJSONObject, replacer);
			//alert(myJSONText);
	    	 now.distributeMessage(myJSONText);
			/*
	    	ig.game.gamesocket.send('move', {
	    		pos: player.coord,
	    		remoteAnim: player.remoteAnim,
	    		remoteId: player.remoteId,
	    		flipped: player.flipped
	    	});
			*/
		}

	player.enterFrame = function()
	{
		// KEY
		player.keyDown = kCont.down;
		if(!player.startMoving){
			player.startMoving = player.keyDown;
			
			// Play music if not mobile and upon starting game
			if(player.keyDown){
				if( !gameIsMobile && music.paused ){
					//music.currentTime = 0;
					menu.toggleAudio();
				}
			}
		}
		
		// FRAME
		player.frame += (2+player.vel.x)/60;
		if(player.keyDown){
			player.frame += 0.2;
			
		}
		player.frame %= 3;
		
		if(player.startMoving){
			//ig.log("KEY DOWN " + player.keyDown);
			
			// Velocity Addition
			if(HUD.timer<=0){
				player.vel.x*=0.98;
			}
			if(HUD.timer>0 && player.keyDown){
				//ig.log("MOUSE IS DOWN");
				player.broadcastPosition();
				if(player.touchGround2){
					if(player.vel.y>0){
						player.vel.y += 0.3; 
						//player.vel.x += 0.05; 
					}else{
						//player.vel.y -= 0.05; 
						player.vel.x += 0.2; 
						//player.vel.x += 0.1; //Should just be pushing fwd
					}
				}else{
					player.vel.y += 0.25;
				}
			}else{
				if(HUD.timer>0 && player.touchGround2){
					if(player.vel.y<0 && player.vel.x<3){
						player.vel.x += 0.05;
					}
				}
				if(HUD.timer<=0 && !player.touchGround2){
					player.vel.y+=0.2;
				}
				player.vel.y += 0.08;
			}
			
			// Move coords
			player.coord.x += player.vel.x;
			var terrY = terrain.funct(player.coord.x);
			if(player.touchGround3){
				player.coord.y += terrY;
			}else{
				player.coord.y += player.vel.y;
			}	
			// Terrain Update
			
			terrain.updateX(player.coord.x);
			
			// Correct coords
			/*player.touchGround = (   ( player.vel.y>0 && player.coord.y>terrY-2 )
		                       || ( player.vel.y<0 && player.coord.y>terrY-0.5 )
		                       );*/
		 	//player.touchGround3 = player.coord.y>terrY-100;
		 	player.touchGround2 = player.coord.y>terrY-5;
		 	player.touchGround = player.coord.y>terrY;
			if(player.touchGround)
			{
				player.coord.y = terrY;
				// Slope & Projection
				var terrSlope = terrain.functDiff(player.coord.x);
				var terrLength = Math.sqrt(1*1+terrSlope*terrSlope);
				var dotProduct = player.vel.x*1 + player.vel.y*terrSlope;
				dotProduct = dotProduct/terrLength;
				player.vel.x = dotProduct/Math.sqrt(1+terrSlope*terrSlope);
				if(player.vel.x<0.1){
					player.vel.x=0.1;
				}
				player.vel.y = player.vel.x*terrSlope;
				player.vel.x*=0.995;
				player.vel.y*=0.995;
			}else{
				//player.coord.y += player.vel.y;
			}
			
			player.rotation = Math.atan2(player.vel.y,player.vel.x);
			if(player.rotation>Math.PI*0.3){
				player.rotation*=3;
				player.rotation+=Math.PI*0.3;
				player.rotation*=0.25;
			}

			
			player.broadcastPosition();
		
		}
	}
	
	
	enemy.image = new Image(800,600);

	enemy.init = function(){
		enemy.coord = new Object();
		enemy.vel = new Object();
		enemy.coord.x = -10;
		enemy.coord.y = -201;
		enemy.vel.x = 1.9;
		enemy.vel.y = -0.9;
		enemy.rotation = 0;
		enemy.width = enemy.height = 200;
		enemy.frame = 0;
		enemy.active = true;
		
		enemy.touchGround = true;
		enemy.touchGround2 = true;
		enemy.touchGround3 = false;
		enemy.keyDown = false;
	}
	enemy.startMoving = false;

	enemy.draw = function()
	{
		// TRANSFORM
		ctx.save();
		ctx.translate(enemy.coord.x,enemy.coord.y);
        ctx.drawImage( enemy.image, 202, Math.floor(enemy.frame)*200+2,196,196, 
                                    -200/2, -200+20, 200, 200);
        ctx.restore();					

	}

	

	enemy.enterFrame = function()
	{
		
	}
	
	
	var imageObj = new Image();
	var imageObj2 = new Image();

	var PWG = {};
	PWG.timer_enterFrame = null;
	PWG.timer_draw = null;
	PWG.playGame = function(){
		//PWG.timer_enterFrame = setInterval(PWG.enterFrame,enterFrameRate);
		//PWG.timer_draw = setInterval(PWG.draw,drawFrameRate);
	}
	PWG.pauseGame = function(){
		//clearInterval(PWG.timer_enterFrame);
		//clearInterval(PWG.timer_draw);
	}
	PWG.enterFrame = function(){
		prop.enterFrame();
		player.enterFrame();
		background.enterFrame();
		HUD.enterFrame();
		
		// SCALE / TRANSLATE DEPENDING ON player
		if(player.startMoving){
			//ig.log("player moving");
			PWG.gScale*=9;
			PWG.yDisp*=9;
			if(player.coord.y<-100){
				PWG.yDisp += (player.coord.y+100)*0.5;
			}else{
				PWG.yDisp += 0;
			}
			if(player.touchGround3){
				PWG.gScale += 0.7;
				PWG.yDisp += 100;
			}else{
				if(player.coord.y<-100){
					PWG.gScale += 0.30;
				}else{
					PWG.gScale += 0.40;
				}
			}
			PWG.gScale*=0.1;
			PWG.yDisp*=0.1;
			if(PWG.yDisp<-300){
				PWG.yDisp*=3;
				PWG.yDisp += -300;
				PWG.yDisp*=0.25;
			}
			// SPLAT
			PWG.yDisp += PWG.shake;
			PWG.shake *= -0.5;
		}
	}
	PWG.draw = function(){
		ctx.clearRect(0, 0, 960, 640); // Clear the canvas
		
		// SCALE PROPER
		ctx.save();
		ctx.translate(100,150-PWG.yDisp*PWG.gScale);
		ctx.scale(PWG.gScale,PWG.gScale);
		background.draw(); // Background
		prop.draw(); // Props like Trees
		terrain.draw(player.coord.x); // Terrain
		/*
		
		*/
		player.draw(); // player Player
		if(enemy.active)
		{
			enemy.draw();
		}
		prop.drawParasprites(); // Parasprites
		HUD.draw(); // HUD
		
		// RESTORE
		ctx.restore();
		
	}

	PWG.init = function(){
		PWG.gScale = .5;
		PWG.yDisp = -310;
		PWG.shake = 0;
		menu.init();
		HUD.init();
		background.init();
		terrain.init();
		player.init();
		enemy.init();
		prop.init();
	}

	PWG.artAssets = 7;
	PWG.loadArtAssets = function(){
		
		if(gameIsMobile){
			PWG.artAssets -= 4;
		}
		//imageObj.onLoad =
		//imageObj2.onLoad =
		player.image.onload =
		enemy.image.onload =
		background.cloud.onload = 
		prop.image.tree.onload = 
		prop.image.parasprite.onload = 
		prop.image.burst.onload = 
		HUD.timerImage.onload = 
			PWG.onAssetLoad;
		
		//imageObj.src = "art/"+globalData.bg;
		//imageObj2.src = "art/"+globalData.bg;
		player.image.src = "art/Scootaloo.png";
		enemy.image.src = "art/Scootaloo.png";
		prop.image.parasprite.src = "media/props.png";
		HUD.timerImage.src = "art/Timer.png";
		
		if(!gameIsMobile){
			background.cloud.src = "art/Cloud.png";
			prop.image.tree.src = "art/Tree.png";
			prop.image.burst.src = "art/Burst.png";
			// Music
			music.src = music_source;
			music.addEventListener('canplaythrough', function(){
				//musicLoopInit();
				PWG.musicLoaded = true;
				PWG.onAssetLoad();
			}, false);
			music.load();
		}
		
	}

	PWG.onAssetLoad = function(){
		PWG.artAssets--;
		//alert(PWG.artAssets);
		if(PWG.artAssets==0){
			
			// Music
			//music.play();
			//menu.toggleAudio();
			//document.getElementById("bmusic").className = "hud_button toggle";
			
			// Remove Loading Screen
			//document.getElementById("loading").style.display = "none";
			//document.getElementById("game_container").style.display = "block";
			gameIsLoaded = true;
			
			PWG.startTheGame();
		}
	}
	PWG.startTheGame = function(){
		PWG.enterFrame(); PWG.draw(); PWG.playGame();
		//document.getElementById("screen").style.display = "none";
		
		// If Not Home Screen Web App
		if(notHomeScreened && !PWG.alreadyNotified){
			//menu.pause();
			PWG.playGame();
			//document.getElementById("homeScreen").style.display = "block";
			PWG.alreadyNotified = true;
		}
	}
	PWG.alreadyNotified = false;
	PWG.musicLoaded = false;

	var canvas;
	var ctx;
	var hudCanvas;
	var hudCTX;
	var terrain = {};
	

	terrain.init = function()
	{
		//ig.log("T LENGTH ")
		/*
		terrain.nodes = [ {"x":-200,"y":-100}, {"x":0,"y":-200}, {"x":400,"y":300}, {"x":700,"y":100} ];
		terrain.lastX = 2;

		terrain.drawFarBack = 600;
		var i;
		for(i=0;i<17;i++){
			terrain.newNode();
		}
		ig.log("T LENGTH " + terrain.nodes.length)
		*/
		///*
		//terrain.nodes = [];
		terrain.nodes = [ {"x":-200,"y":-100}, {"x":0,"y":-200}, {"x":400,"y":300}, {"x":700,"y":100} ];

		/*
		var i;

		for(i=0;i<4;i++)
		{
			terrain.nodes.push(globalData.terrain[i]);
		}
		*/
		terrain.lastX = 2;
		terrain.drawFarBack = 600;

		var y;
		for(y=4;y<globalData.terrain.length;y++)
		{
			if(y<18)
			{
				terrain.newNode(globalData.terrain[y]);
				//terrain.nodes.push(globalData.terrain[y]);
			} else {
				terrain.newNode();
			}
		}

		//ig.log("T LENGTH " + terrain.nodes.length)
		//ig.log(terrain.nodes)
		//*/
			
	}

	terrain.newNode = function( data )
	{
		if(terrain.nodes.length<=20){
			terrain.nodes.push( {} );
		}else{
			terrain.nodes.push( terrain.nodes[terrain.lastX-2] );
			terrain.nodes[terrain.lastX-2] = null;
		}
		terrain.nodes[terrain.nodes.length-1].x = terrain.nodes[terrain.nodes.length-2].x + Math.random()*150+250;
		
		if(data)
		{
			//ig.log("FEEDING ")
			terrain.nodes[terrain.nodes.length-1].y = data.y;
		} else {
			//ig.log("MAKING IT ")
			if(terrain.nodes[terrain.nodes.length-2].y<130){
				terrain.nodes[terrain.nodes.length-1].y = 230+Math.random()*70;
			}else{
				terrain.nodes[terrain.nodes.length-1].y = 130-Math.random()*70;
			}
		}


	}

	terrain.updateX = function(xx)
	{
		while( xx > terrain.nodes[terrain.lastX].x ){
			terrain.newNode();
			terrain.lastX++;
		}

		//ig.log(terrain.nodes);
	}

	terrain.funct = function(xx)
	{
		var i=terrain.lastX-1;
		while(terrain.nodes[i].x<xx){
			i++;
		}
		var ANode = terrain.nodes[i-1];
		var BNode = terrain.nodes[i];
		return ANode.y
				- (BNode.y-ANode.y)*0.5
				* ( Math.cos( Math.PI*( xx-ANode.x )/( BNode.x-ANode.x ) ) - 1 );
	}

	terrain.functDiff = function(xx)
	{
		var i=terrain.lastX-1;
		while(terrain.nodes[i].x<xx){
			i++;
		}
		var ANode = terrain.nodes[i-1];
		var BNode = terrain.nodes[i];
		return (BNode.y-ANode.y)*0.5
				* Math.PI/( BNode.x-ANode.x )
				* ( Math.sin( Math.PI*( xx-ANode.x )/( BNode.x-ANode.x ) ) );
	}

	terrain.draw = function( starttt )
	{
		// Later, ALL HEX?
		ctx.lineWidth = 50;
	

		if(gameIsMobile){
			ctx.strokeStyle = "rgb(170,200,47)"; // Top
			//var pattern = ctx.createPattern(imageObj,"repeat");
			//ctx.fillStyle = pattern;
			ctx.fillStyle = "rgb(152,179,43)"; // Middle
			terrain.drawFrom(starttt,25);
		}else{
			ctx.strokeStyle = "rgb(170,200,47)"; // Top
			terrain.drawFrom(starttt,25);


			ctx.strokeStyle = "rgb(152,179,43)"; // Middle
			//var pattern2 = ctx.createPattern(imageObj2, "repeat");
			//ctx.fillStyle = pattern2; // Bottom 
			ctx.fillStyle = "#8FA927"; // Bottom 
			terrain.drawFrom(starttt,70);
		}
	}

	terrain.drawFrom = function( starttt, yOff )
	{
		ctx.beginPath();
		var tmpTerrYDraw = terrain.funct(starttt-terrain.drawFarBack);
		ctx.moveTo( 0-terrain.drawFarBack, tmpTerrYDraw+yOff );
		var i;
		if(player.startMoving){
			if(gameIsMobile){
				if(PWG.gScale<0.35){
					for( i=30-terrain.drawFarBack; i<=1440; i+=75 ){
						tmpTerrYDraw = terrain.funct(starttt+i);
						ctx.lineTo( i, tmpTerrYDraw+yOff );
					}
				}else{
					for( i=30-terrain.drawFarBack; i<=1200; i+=50 ){
						tmpTerrYDraw = terrain.funct(starttt+i);
						ctx.lineTo( i, tmpTerrYDraw+yOff );
					}
				}
			}else{
				if(PWG.gScale<0.35){
					for( i=30-terrain.drawFarBack; i<=1440; i+=30 ){
						tmpTerrYDraw = terrain.funct(starttt+i);
						ctx.lineTo( i, tmpTerrYDraw+yOff );
					}
				}else{
					for( i=30-terrain.drawFarBack; i<=1200; i+=20 ){
						tmpTerrYDraw = terrain.funct(starttt+i);
						ctx.lineTo( i, tmpTerrYDraw+yOff );
					}
				}
			}
		}else{
			if(gameIsMobile){
				for( i=30-terrain.drawFarBack; i<=500; i+=30 ){
					tmpTerrYDraw = terrain.funct(starttt+i);
					ctx.lineTo( i, tmpTerrYDraw+yOff );
				}
			}else{
				for( i=30-terrain.drawFarBack; i<=500; i+=10 ){
					tmpTerrYDraw = terrain.funct(starttt+i);
					ctx.lineTo( i, tmpTerrYDraw+yOff );
				}
			}
		}
		ctx.lineTo(1425,1000);
		ctx.lineTo(0-terrain.drawFarBack,1000);
		ctx.fill();
		
		ctx.stroke();
	}
	var prop = {};
	prop.image = {};
	prop.image.tree = new Image(600,170);
	prop.image.parasprite = new Image(400,200);
	prop.image.burst = new Image(750,150);

	prop.init = function(){
		
		// TREES
		/*
		if(gameIsMobile){
			prop.trees = [];
		}else{
			prop.trees = [{},{},{},{},{},{},{}];
			prop.treeLength = 3;
			prop.treePast = 1000;
			player.coord.x -= 800;
			prop.addTrees();
			player.coord.x += 800;
		}
		*/
		
		// PARASPRITES
		prop.parasprites = [{},{},{},{}];
		prop.addParasprites();
	}

	/*
	prop.addTrees = function(){
		if(gameIsMobile){
			prop.treeLength = 0;
		}else{
			var i;
			var xxx = 1500;
			prop.treeLength = Math.ceil(3+Math.random()*4);
			prop.treePast = 1000+Math.ceil(Math.random()*2000);
			for(i=0;i<prop.treeLength;i++){
				prop.trees[i].x = xxx+player.coord.x;
				prop.trees[i].y = terrain.funct(prop.trees[i].x);
				prop.trees[i].rotation = Math.atan( terrain.functDiff(prop.trees[i].x) );
				prop.trees[i].type = Math.floor(Math.random()*3);
				xxx += Math.ceil(Math.random()*400+200);
			}
		}
	}
	*/

	// PARASPRITES
	prop.addParasprites = function(){
		var i;
		for(i=0;i<prop.parasprites.length;i++){
			prop.parasprites[i].loop = 3000+Math.floor( Math.random()*3000 );
			prop.parasprites[i].flap = 0;
			prop.resetParasprite(i);
		}
	}
	prop.resetParasprite = function(i){
		var thisx = prop.parasprites[i].loop+player.coord.x;
		prop.parasprites[i].x = thisx
		prop.parasprites[i].y = terrain.funct(thisx)-15;
		var thispick = Math.floor( Math.random()*20 );
		if(thispick > 4)
		{
			prop.parasprites[i].color = 0;
		} else {
			prop.parasprites[i].color = thispick;
		}
		prop.parasprites[i].velX = 3+Math.random()*5;
		prop.parasprites[i].life = 0;
	}

	// Draw
	prop.draw = function(){
		var i;
		/*
		for(i=0;i<prop.treeLength;i++){
			ctx.save();
			ctx.translate( prop.trees[i].x-player.coord.x, prop.trees[i].y );
			ctx.rotate(prop.trees[i].rotation);
			ctx.drawImage( prop.image.tree, prop.trees[i].type*200,0,200,170, -200, -280, 400,340);
			ctx.restore();
		}
		*/
	}

	prop.drawParasprites = function(){
		var i;
		for(i=0;i<prop.parasprites.length;i++){
			ctx.save();
			ctx.translate(prop.parasprites[i].x-player.coord.x,prop.parasprites[i].y);
			if(prop.parasprites[i].life==0){
				ctx.drawImage( prop.image.parasprite, prop.parasprites[i].color*39, Math.floor(prop.parasprites[i].flap)*39,39,39,
								-19.5, -19.5, 50,50);
			}else if(!gameIsMobile){
				ctx.drawImage( prop.image.burst, Math.floor((20-prop.parasprites[i].life)/4)*150,0,150,150,
								-100, -100, 200,200);
			}
			prop.parasprites[i].flap = (prop.parasprites[i].flap+0.1*prop.parasprites[i].velX)%2;
			ctx.restore();
		}
	}

	// EnterFrame
	prop.enterFrame = function(){
		if(!gameIsMobile){
			/*
			if(prop.trees[prop.treeLength-1].x-player.coord.x<-prop.treePast){
				prop.addTrees();
			}
			*/
		}
		var i;
		var xxx;
		var yyy;
		for(i=0;i<prop.parasprites.length;i++){
			if(prop.parasprites[i].life==0){
				//prop.parasprites[i].x += prop.parasprites[i].velX;
				xxx = prop.parasprites[i].x-player.coord.x;
				yyy = prop.parasprites[i].y-player.coord.y;
				if( xxx>prop.parasprites[i].loop || xxx<-500){
					prop.resetParasprite(i);
				}
				if( xxx>-player.width*0.5 && xxx<player.width*0.5 && yyy>-player.height && yyy<0 ){
					prop.parasprites[i].life = 20;
					//alert("CAUGHT");
					if(prop.parasprites[i].color == 0)
					{
						
					} else {
						player.vel.x*=1;
						player.vel.y*=1;
					}
						HUD.parasprites++;
				}
			}else{
				prop.parasprites[i].life--;
				if(prop.parasprites[i].life==1){
					prop.resetParasprite(i);
				}
			}
		}
	}
	
	enterFrameRate = null;
	drawFrameRate = null;

	MultiGame = ig.Game.extend({
		
		

		// Load a font
		font: new ig.Font( 'media/04b03.font.png' ),
		gravity: 200,
		
		note: new ig.NotificationManager(),
		
		init: function() {
			// Initialize your game here; bind keys etc.
			
			
			ig.input.bind( ig.KEY.SPACE, 'keydown' );
			ig.input.bind( ig.KEY.MOUSE1, 'mousedown' );
			ig.input.bind( ig.KEY.X, 'jump' );
			ig.input.bind( ig.KEY.C, 'shoot' );

			//this.loadArtAssets();

			
	   		if(gameIsMobile){
	   			drawFrameRate = 1000/40;
	   			enterFrameRate = 1000/40;
	   		}else{
				drawFrameRate = 1000/60;
				enterFrameRate = 1000/60;
			}

			canvas = ig.system.canvas;
			ctx = ig.system.context;
			//hudCanvas = document.getElementById('hud');
			///hudCTX = hudCanvas.getContext('2d');
		
			//function alert(){} // Mutes alerts.
		
			PWG.loadArtAssets();
			PWG.init();


			//background = ig.game.spawnEntity(Background, 0,0);
			//player = ig.game.spawnEntity(Player, 0,0);
			//terrain = ig.game.spawnEntity(Terrain, 0,0);
			
			
			
			
			
			 //this.gamesocket = new ig.ImpactConnect(enemy, 1337);
			
			 //ig.system.resize($(window).width(),$(window).height());


			//$(window).resize(this.resize.bind());
		},
		
		update: function() {
			this.parent();
			
			this.write("Please Turn Your Browser in Landscape",{x : 100, z:100});
			if(window.orientation == "portrait")
			{
				this.write("Please Turn Your Browser in Landscape",{x : 100, z:100});
			}

			if( ig.input.pressed('keydown') ) {
			    if(gameIsLoaded){ kCont.keyDownHandler(event); }
			}

			if( ig.input.pressed('keyup') ) {
			    if(gameIsLoaded){ kCont.keyUpHandler(event); }
			}

			if( ig.input.state('mousedown') ) {
			    if(gameIsLoaded){ 
			    	
			     	kCont.down = true; 
			 	} 
			}

			if( ig.input.released('mousedown') ) {
			    if(gameIsLoaded){ 
			     kCont.down = false; 
			 	} 
			}
			
			PWG.enterFrame();
			this.note.update();
		},
		
		draw: function() {
			// Draw all entities and backgroundMaps
			this.parent();
			PWG.draw();
			this.note.draw();
		},
		
		
		/**
		 * Helpers
		 */
		getEntityById: function(id){
			for(var i in this.entities){
				if(this.entities[i].id === id){
					return this.entities[i];
				}
			}
			return null;
		},
		getEntityByRemoteId: function(id){
			var tEntities = this.getEntitiesByType(EntityPlayer);
			for(var i in tEntities){
				if(tEntities[i].remoteId === id){
					return tEntities[i];
				}
			}
			return null;
		},
		write: function(text, pos){
			this.note.spawnNote(this.font, text, pos.x, pos.y, 
					{vel: { x: 0, y: 0 },  alpha: 0.5, lifetime: 2.2, fadetime: 0.3 });
		}
		
		
	});
	//ig.main( '#canvas',MultiGame, 60, 480, 320, 1 );

});
