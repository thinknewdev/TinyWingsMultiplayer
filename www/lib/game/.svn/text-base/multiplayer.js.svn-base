ig.module( 
	'game.multiplayer' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.image',
	'game.gamescreen',

	'game.entities.clickable',
	'game.levels.lvl1',
	'game.levels.intro',
	'impact.debug.debug',
	
	'plugins.impactconnect',
	'plugins.impactEvents',
	'plugins.notification-manager',
	'plugins.facebook'
)
.defines(function(){

	mediadir = "media/";
	mapholder = new Array();
	currMap = 0;
	img = null;
	
	
	MultiPlayer = ig.Game.extend({

		mediadir : "media/",
		screenVars : {},
		img : null,
		buttons : new Array(),
		warning : false,
		mainBtn : null,
		goBtn : null,
		leftBtn : null,
		rightBtn : null,
		bg: null,
		


		
		// Load a font
		font: new ig.Font( 'media/04b03.font.png' ),
		//gravity: 200,
		
		note: new ig.NotificationManager(),
		
		init: function() {

			this.screenVars = loadedVars;
			this.bg = new ig.Image( this.mediadir + this.screenVars.pages[1].bg);
			this.bg.draw(0,0);

			
			


			var lsettings = {image: mediadir + "B_Forward.png"};
			var thisx = ((ig.system.width/2)-80);
			var thisy = ((ig.system.height/2)+80)
			this.leftBtn = ig.game.spawnEntity(EntityClickable,thisx,thisy,lsettings)
			//this.leftBtn = ig.game.spawnEntity(Clickable,0,0,lsettings)

			var rsettings = {image: mediadir + "B_Back.png"};
			var thisx = ((ig.system.width/2));
			var thisy = ((ig.system.height/2)+80)
			this.rightBtn = ig.game.spawnEntity(EntityClickable,thisx,thisy,rsettings)
			//this.rightBtn = ig.game.spawnEntity(Clickable,0,0,rsettings)
			//this.rightBtn.x = (ig.system.width/2)-80 + this.rightBtn.width;
			//this.rightBtn.y = (ig.system.height/2)-80 + this.rightBtn.height;

			//this.leftBtn.x = (ig.system.width/2)-80 - this.leftBtn.width;
			//this.leftBtn.y = (ig.system.height/2)-80 + this.leftBtn.height;
			//*
			///*
			
			//*/
			
			/*

			ig.game.addListener(img , "running", function()
			{
				ig.system.setGame(MyGame)
			});
*/
			//*/

			///*


			//d*/
			
		},
		
		update: function() {
			this.parent();
			//this.rightBtn.pos.x = 200;
			//this.rightBtn.pos.y = (ig.system.height/2)-(this.rightBtn.height/2)+ this.rightBtn.height;
			/*
			this.rightBtn.pos.x = (ig.system.width/2)-80 + this.rightBtn.width;
			this.rightBtn.pos.y = (ig.system.height/2)-80 + this.rightBtn.height;

			this.leftBtn.pos.x = (ig.system.width/2)-80 - this.leftBtn.width;
			this.leftBtn.pos.y = (ig.system.height/2)-80 + this.leftBtn.height;
			*/
			///*
			///*
			//keep player centered'
			
			//*/
			
			this.note.update();
		},
		
		draw: function() {
			// Draw all entities and backgroundMaps
			this.parent();
			//this.bg.draw(0,0);
			this.leftBtn.draw()
			this.rightBtn.draw()

			//this.font.draw(mediadir + screenVars.pages[1].buttons[i].img, 100, 120, ig.Font.ALIGN.CENTER);

			this.font.draw("Start A MultiPlayer Game", ig.system.width/2, 100, ig.Font.ALIGN.CENTER);



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


	// Start the Game with 60fps, a resolution of 320x240, scaled
	// up by a factor of 2
	//ig.main( '#canvas',IntroScreen, 60, 480, 320, 1 );

});
