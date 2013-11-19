ig.module( 
	'game.guestwait' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.image',

	'game.entities.clickable',
	'game.levels.lvl1',
	'game.levels.intro',
	'game.mgamescreen',
	
	'plugins.impactEvents',
	'plugins.notification-manager'
)
.defines(function(){
	mediadir = "media/";
	mapholder = new Array();
	currMap = 0;
	img = null;
	
	
	FullsizeBackdrop = ig.Image.extend({
		resize: function(){ /* Do Nothing */ }, 
		draw: function() {
			if( !this.loaded ) { return; }
			ig.system.context.drawImage( this.data, 0, 0 );
		}
	});
	
	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}
	
	
	GuestRoom = ig.Game.extend({

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
		//backdrop: new FullsizeBackdrop( 'media/backdrop.png' ),
		note: new ig.NotificationManager(),
		
		init: function() {
			ig.input.bind( ig.KEY.MOUSE1, 'click' );
			this.screenVars = loadedVars;
			this.bg = new ig.Image( this.mediadir + "waiting.png");
			this.bg.draw(0,0);
			
			
			now.friendJoined = function()
			{
				//alert("room created")
				ig.system.setGame(MultiGame);
			}
			 var url='http://208.89.208.52/GetToken/6ad4368d368b43c6bb2368bd7666365b/fd790411d17d417eacf302cc12de357a'; //localhost error, only works on live server
			 $.getJSON(url, function(data){
				 var roomid = getUrlVars()["roomid"];
				 //alert(roomid);
				 var url='http://208.89.208.52/LoginGuest/6ad4368d368b43c6bb2368bd7666365b/fd790411d17d417eacf302cc12de357a/'+data.token+'/'+roomid; //localhost error, only works on live server
				  ig.log(url);
				   $.getJSON(url, function(data){
					  // alert(data.secret);
					   now.name = "Friend";	
					   now.JoinRoom('6ad4368d368b43c6bb2368bd7666365b','fd790411d17d417eacf302cc12de357a',data.secret,data.roomId);
				   });
				/*
				try {
        			mydb.transaction(

            			function(transaction) {
               				transaction.executeSql('SELECT * FROM user ORDER BY name',[], function(transaction, results) {
							  // Handle the results 
							  if(results.rows.length > 0)
							  {
							  	  alert("found you")
								  for (var i=0; i<results.rows.length; i++) { 
									var row = results.rows.item(i); 
									//row['roomid']
								  } 
							  } else {
								  var url='http://208.89.208.52/Register/6ad4368d368b43c6bb2368bd7666365b/fd790411d17d417eacf302cc12de357a/'+data.token+'/-1'; //localhost error, only works on live server
							  	  ig.log(url);
							  	   $.getJSON(url, function(data){
							  	   	   alert(data.token);	
									   now.createRoom('6ad4368d368b43c6bb2368bd7666365b',data.token,data.roomid);
								   });
							  }
						
							}, errorHandler);
            			});
      			} catch(e) {
        			alert(e.message);
      			}
				*/
			 });
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
	ig.main( '#canvas',GuestRoom, 60, 480, 320, 1 );

});
