ig.module( 
	'game.choosemap' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.image',

	'game.entities.clickable',
	'game.entities.globe',
	'game.levels.lvl1',
	'game.levels.intro',
	'game.gamescreen',
	'plugins.impactEvents',
	'plugins.notification-manager'
)
.defines(function(){
	mediadir = "media/";
	mapholder = new Array();
	currMap = 0;
	img = null;
	
	
	ChooseMap = ig.Game.extend({

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
		    
			ig.input.bind( ig.KEY.MOUSE1, 'click' );
			
			ig.system.resize($(window).width(), $(window).height());
            
			
			this.screenVars = loadedVars;
			this.bg = new ig.Image( this.mediadir + this.screenVars.pages[3].bg);
			this.bg.draw(0,0);

			
			//img = new ig.Image( mediadir + mapholder[currMap]);
			var lsettings = {image: this.mediadir + "globeselect.png"};
			var thisx = (ig.system.width/2) - (295);
			var thisy = (ig.system.height/2)
			img = ig.game.spawnEntity(EntityGlobe,thisx,thisy,lsettings)
			
			ig.log("IMG "+loadedVars.pages[3].maps[currMap].img);

			var lsettings = {image: mediadir + "B_Forward.png"};
			var thisx = ((ig.system.width/2)-80);
			var thisy = ((ig.system.height/2)+80)
			//this.leftBtn = ig.game.spawnEntity(EntityClickable,thisx,thisy,lsettings)
			//this.leftBtn = ig.game.spawnEntity(Clickable,0,0,lsettings)

			var rsettings = {image: mediadir + "B_Back.png"};
			var thisx = ((ig.system.width/2));
			var thisy = ((ig.system.height/2)+80)
			//this.rightBtn = ig.game.spawnEntity(EntityClickable,thisx,thisy,rsettings)
			//this.rightBtn = ig.game.spawnEntity(Clickable,0,0,rsettings)
			//this.rightBtn.x = (ig.system.width/2)-80 + this.rightBtn.width;
			//this.rightBtn.y = (ig.system.height/2)-80 + this.rightBtn.height;

			//this.leftBtn.x = (ig.system.width/2)-80 - this.leftBtn.width;
			//this.leftBtn.y = (ig.system.height/2)-80 + this.leftBtn.height;
			//*
			///*
			/*
			ig.game.addListener(this.leftBtn , "running", function()
			{
				ig.log('fires left');
				currMap -= 1;
				if(currMap < 0)
				{
					currMap = loadedVars.pages[3].maps.length - 1;
				}
				img.rotation -= 5;
			});
			
			ig.game.addListener(this.rightBtn , "running", function()
			{
				ig.log('fires right');
				ig.log(mediadir);
				currMap += 1;
				///*
				if(currMap > (loadedVars.pages[3].maps.length - 1))
				{
					currMap = 0;
				}
				
				img.rotation += 5;
				//img.I_Btn  = new ig.Image( mediadir + loadedVars.pages[3].maps[currMap].img);
			});
            */
			ig.game.addListener(img , "running", function()
			{
			   // alert("blah")
				//globalData = loadedVars.pages[3].maps[currMap];
				ig.system.setGame(MyGame)
			});
			//*/
			
			// disable fullscreen mode by default
			ig.global.fullscreen = false;

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
			this.bg.draw(0,0);
			img.draw()
			//this.leftBtn.draw()
			//this.rightBtn.draw()

			//this.font.draw(mediadir + screenVars.pages[1].buttons[i].img, 100, 120, ig.Font.ALIGN.CENTER);

			this.font.draw("CHOOSE MAP", ig.system.width/2, 100, ig.Font.ALIGN.CENTER);



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
	ig.main( '#canvas',ChooseMap, 60, 480, 320, 1 );
	

});
