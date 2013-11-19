ig.module( 
	'game.tinywings' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.background',
	'game.entities.hud',
	'game.entities.terrain',
	'game.entities.player',
	'game.levels.level',
	'game.levels.intro',
	'impact.debug.debug',
	
	'plugins.impactconnect',
	'plugins.notification-manager'
)
.defines(function(){


	var gScale = .5;
	var yDisp = -310;
	var shake = 0;

	var assetHolder = {};
	assetHolder.cloud = new Image(300,150);

	var terrain =  null;

	var player = null;

	enterFrameRate = null;
	drawFrameRate = null;
	var startMoving = false;

	TinyWings = ig.Game.extend({
		
		
		
		// Load a font
		font: new ig.Font( 'media/04b03.font.png' ),
		gravity: 200,
		background: null,

		note: new ig.NotificationManager(),
		
		init: function() {
			// Initialize your game here; bind keys etc.
			ig.log("INITIALIZING GAME SCENE")
			ig.input.bind( ig.KEY.SPACE, 'keydown' );
			ig.input.bind( ig.KEY.MOUSE1, 'mousedown' );
			ig.input.bind( ig.KEY.X, 'jump' );
			ig.input.bind( ig.KEY.C, 'shoot' );

			this.loadLevel( LevelLevel );


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
			
			background = ig.game.spawnEntity(EntityBackground, 0,0, {image : "art/Cloud.png"});
			terrain = ig.game.spawnEntity(EntityTerrain, 0,0);


			gScale = .5;
			yDisp = -310;
			shake = 0;
			
			
			//terrain.init();
			//player.init();
			//prop.init();



			//
			player = this.getEntitiesByType(EntityPlayer)[0];
			//this.gamesocket = new ig.ImpactConnect(player, 1337);
			//terrain = ig.game.spawnEntity(Terrain, 0,0);
			
			
			
			
			
			//this.gamesocket = new ig.ImpactConnect(player, 1337);
		},

		loadArtAssets : function(){
			ig.log("LOADING ASSETS")
			if(gameIsMobile){
				PWG.artAssets -= 4;
			}
			//imageObj.onLoad =
			//imageObj2.onLoad =
			//player.image.onload =
			//assetHolder.cloud.onload = 
			//prop.image.tree.onload = 
			//prop.image.parasprite.onload = 
			//prop.image.burst.onload = 
			//HUD.timerImage.onload = 
				//this.onAssetLoad;
				//this.onAssetLoad;
			//imageObj.src = "art/"+globalData.bg;
			//imageObj2.src = "art/"+globalData.bg;
			//player.image.src = "art/Scootaloo.png";
			//prop.image.parasprite.src = "art/Parasprite.png";
			//HUD.timerImage.src = "art/Timer.png";
			///*
			if(!gameIsMobile){
				//assetHolder.cloud.src = "art/Cloud.png";
				//prop.image.tree.src = "art/Tree.png";
				//prop.image.burst.src = "art/Burst.png";
				// Music
				//music.src = music_source;
				//music.addEventListener('canplaythrough', function(){
					//musicLoopInit();
					//this.musicLoaded = true;
					//this.onAssetLoad();
				//}, false);
				//music.load();
			}
			//*/
			
		},

		onAssetLoad : function(){
			ig.log("ASSETS LOADED")
			this.artAssets--;
			//alert(PWG.artAssets);
			//if(this.artAssets==0){
				
				// Music
				//music.play();
				//menu.toggleAudio();
				//document.getElementById("bmusic").className = "hud_button toggle";
				
				// Remove Loading Screen
				//document.getElementById("loading").style.display = "none";
				//document.getElementById("game_container").style.display = "block";
				gameIsLoaded = true;
				
				//this.startTheGame();
			//}
		},

		startTheGame : function(){
			//document.getElementById("screen").style.display = "none";
			
			// If Not Home Screen Web App
			if(notHomeScreened && !PWG.alreadyNotified){
				//menu.pause();
				//document.getElementById("homeScreen").style.display = "block";
				this.alreadyNotified = true;
			}
		},
		
		update: function() {
			this.parent();

			//keep player centered
			//player = this.getEntitiesByType( EntityPlayer )[0];
			player.pos.x = 100;
			player.pos.y = 100;
			if( player ) {
				this.screen.x = player.pos.x - ig.system.width/2;
				this.screen.y = player.pos.y - ig.system.height/2;
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
			//prop.enterFrame();
			//player.enterFrame();
			//background.update();
			//HUD.enterFrame();
			
			// SCALE / TRANSLATE DEPENDING ON player
			/*
			if(player.startMoving){
				ig.log("player moving");
				gScale*=9;
				yDisp*=9;
				if(player.coord.y<-100){
					yDisp += (player.coord.y+100)*0.5;
				}else{
					yDisp += 0;
				}
				if(player.touchGround3){
					gScale += 0.7;
					yDisp += 100;
				}else{
					if(player.coord.y<-100){
						gScale += 0.30;
					}else{
						gScale += 0.40;
					}
				}
				gScale*=0.1;
				yDisp*=0.1;
				if(yDisp<-300){
					yDisp*=3;
					yDisp += -300;
					yDisp*=0.25;
				}
				// SPLAT
				yDisp += shake;
				shake *= -0.5;
			}
				*/
			this.note.update();
		},
		
		draw: function() {
			// Draw all entities and backgroundMaps
			this.parent();
			//ctx.clearRect(0, 0, 960, 640); // Clear the canvas
		
			// SCALE PROPER
			//ctx.save();
			//ctx.translate(100,150-yDisp*gScale);
			//ctx.scale(gScale,gScale);
			ig.system.canvas.scale = gScale;
			background.draw(); // Background
			//prop.draw(); // Props like Trees
			terrain.draw(200); // Terrain
			//player = this.getEntitiesByType( EntityPlayer )[0];

			//player.draw(200,200); // player Player
			//prop.drawParasprites(); // Parasprites
			//HUD.draw(); // HUD
			
			// RESTORE
			//ctx.restore();
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

	ig.main( '#canvas',TinyWings, 60, 480, 320, 1 );

});
