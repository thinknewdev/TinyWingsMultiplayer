ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.image',
	'game.gamescreen',
	'game.choosemap',
	'game.multiplayer',

	'game.entities.clickable',
	'game.levels.lvl1',
	'game.levels.intro',
	//'impact.debug.debug',
	
	'plugins.impactconnect',
	'plugins.impactEvents',
	'plugins.notification-manager',
	'plugins.facebook'
)
.defines(function(){

	
	

	
	IntroScreen = ig.Game.extend({

		mediadir : "media/",
		screenVars : {},
		img : null,
		buttons : new Array(),
		warning : false,
		mainBtn : null,

		// Load a font
		font: new ig.Font( 'media/04b03.font.png' ),
		//gravity: 200,
		
		note: new ig.NotificationManager(),
		
		init: function() {


			ig.input.bind( ig.KEY.MOUSE1, 'click' );
			this.screenVars = loadedVars;


			//define background
			
			//screenVars.pages[0].bg

			this.img = new ig.Image( this.mediadir + this.screenVars.pages[1].bg);
			this.img.draw(0,0);

			//this.mainBtn = ig.game.spawnEntity(Clickable, 0,0);


			
			

			for (var i = 0; i < this.screenVars.pages[1].buttons.length; i++)
			{
				//this.buttons[i] = new ig.Image( this.mediadir + this.screenVars.pages[1].buttons[i].img);
				var settings = {image: this.mediadir + this.screenVars.pages[1].buttons[i].img};
				ig.log(this.mediadir + this.screenVars.pages[1].buttons[i].img);
				ig.log(i);
				this.buttons[i] = ig.game.spawnEntity(EntityClickable, this.screenVars.pages[1].buttons[i].css.x,this.screenVars.pages[1].buttons[i].css.y,settings)
				ig.log(this.buttons[i]);

				ig.game.addListener(this.buttons[i] , "running", function()
				{
					
					ig.system.setGame(MultiPlayer)
				});
			}

			
			
			this.font.draw(this.mediadir + this.screenVars.pages[1].bg, 100, 100, ig.Font.ALIGN.CENTER);

			
		},
		
		update: function() {
			this.parent();
		
			///*
			///*
			//keep player centered'
			
			//*/
			
			this.note.update();
		},
		
		draw: function() {
			// Draw all entities and backgroundMaps
			this.parent();
			this.img.draw(0,0);

			for (var i = 0; i < this.screenVars.pages[1].buttons.length; i++)
			{
				//buttons[i].draw(240,160);
				//this.buttons[i].I_Btn.draw(this.screenVars.pages[1].buttons[i].css.x,this.screenVars.pages[1].buttons[i].css.y);
				this.buttons[i].draw();


			}

			///this.mainBtn.draw();
			/*

			if(warning == true)
			{
				this.font.draw("Click Worked", 100, 100, ig.Font.ALIGN.CENTER);

			}
			*/

			//this.font.draw(mediadir + screenVars.pages[1].buttons[i].img, 100, 120, ig.Font.ALIGN.CENTER);

			this.font.draw(this.mediadir + this.screenVars.pages[1].bg, 100, 100, ig.Font.ALIGN.CENTER);

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
	/*
	ig.Facebook.Init(
		    '138294852910700', // Your App ID
		    'http://localhost/Framework/TinyWings/trunk/',
		    'email,read_stream', // Permissions that your App requires
		    function(){
		    	ig.main( '#canvas',IntroScreen, 60, 480, 320, 1 );
		    }
		);
	//*/
	// Start the Game with 60fps, a resolution of 320x240, scaled
	// up by a factor of 2
	ig.main( '#canvas',MyGame, 60, 480, 320, 1 );
	//ig.main( '#canvas',IntroScreen, 60, 480, 320, 1 );

});
