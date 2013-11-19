ig.module( 
	'game.waitingroom' 
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
	
	now.friendJoined = function()
	{
		alert("room created")
		ig.system.setGame(MultiGame);
	}
	
	FullsizeBackdrop = ig.Image.extend({
		resize: function(){ /* Do Nothing */ }, 
		draw: function() {
			if( !this.loaded ) { return; }
			ig.system.context.drawImage( this.data, 0, 0 );
		}
	});
	
	
	WaitingRoom = ig.Game.extend({

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
			
			//ig.system.resize($(window).width(), $(window).height());
			
			this.screenVars = loadedVars;
			this.bg = new ig.Image( this.mediadir + "waiting.png");
			this.bg.draw(0,0);
		
			 var url='http://208.89.208.52/GetToken/6ad4368d368b43c6bb2368bd7666365b/fd790411d17d417eacf302cc12de357a'; //localhost error, only works on live server
			 $.getJSON(url, function(data){
				alert(JSON.stringify(data, replacer));
				//*
				try {
        			mydb.transaction(

            			function(transaction) {
               				transaction.executeSql('SELECT * FROM user ORDER BY name',[], function(transaction, results) {
							  // Handle the results
							 // alert( results.rows.length);
							  if(results.rows.length > 0)
							  {	
							  	for (var i=0; i<results.rows.length; i++) { 
									  var row = results.rows.item(i);
									  //alert(i);
									  var url='http://208.89.208.52/Register/6ad4368d368b43c6bb2368bd7666365b/fd790411d17d417eacf302cc12de357a/'+data.token+'/'+row.email+'/-1'; //localhost error, only works on live server
									   $.getJSON(url, function(rdata){
										  // alert(rdata.roomId);
										  //alert(JSON.stringify(rdata, replacer));
										   mytoken = rdata.secret;
										   myroomid = rdata.roomId;
										   now.name = "Adam";
										   roomcreated = true;
										   if(nowstarted == true)
										   {
											   createRoom();
										   }
										   		
										   //alert("http://www.thinknewgames.com/thinknew/html5/TinyWings/guest.html?roomid="+rdata.roomId)	
										   //now.CreateRoom('6ad4368d368b43c6bb2368bd7666365b','fd790411d17d417eacf302cc12de357a',rdata.secret,rdata.roomId);
									   });
								  } 
							  } else {
								  alert("DID NOT FIND YOU");
							  }
						
							}, errorHandler);
            			});
      			} catch(e) {
					alert("WTF EMAILS!");
        			alert(e.message);
      			}
				//*/
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
	ig.main( '#canvas',WaitingRoom, 60, 480, 320, 1 );
	//ig.system.resize($(window).width(),$(window).height());

});
