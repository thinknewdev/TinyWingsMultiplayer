ig.module(
	'plugins.impactconnect'
)
.requires(
	'impact.impact'
).defines(function() {

	ig.ImpactConnect = ig.Class.extend({
		
		init : function(player, port) {
			this.remoteId;
			//reconnecting wont work for now
			this.socket = io.connect('http://50.28.53.83:8080', {
					'reconnect' : true,
					'reconnection delay' : 500,
					'max reconnection attempts' : 10
				});


			/**
			 * starts communication with server
			 */
			this.socket.emit('start');
			
			
			/**
			 * joining game
			 */
			this.socket.on('setRemoteId', function(rId){
				player.remoteId = rId;
				this.remoteId = rId;
			});
			
			this.socket.on('join', function(data){
				if(data.remoteId != this.remoteId){
					player.init();
					/*
					ig.game.spawnEntity(EntityEnemy, 0, 0,{
						handlesInput: false,
						gravityFactor: 0,
						remoteId: data.remoteId
					});
					*/
				}
			});
			
			
			/**
			 * spawns simple entity you cant control
			 * info: class comes as string and needs the eval, because socket.io (?) strips all prototypes
			 */
			this.socket.on('spawnSimpleEntity', function(data){
				//ig.game.spawnEntity(EntityEnemy, data.x, data.y, data.settings);
			});
			
			
			
			/**
			 * moving and animations
			 */
			this.socket.on('move', function(data){
				try{
					//var ent = ig.game.getEntitiesByType(EntityEnemy)[0];
					//ent.pos.x = data.pos.x;
					//ent.pos.y = data.pos.y;
					console.log(data.pos.x + " " +data.pos.y);
					player.coord.y = data.pos.y;
					player.coord.x = data.pos.x;
					//player.draw();
					/*
					if(ent.remoteAnim != data.remoteAnim){
						
						var newAnim = "ent.anims."+data.remoteAnim;
						ent.currentAnim = eval(newAnim);
						
						ent.currentAnim.flip.x = data.flipped;
						ent.remoteAnim = data.remoteAnim;
					}
					*/
				}catch(e){
					//entity null
					console.log("catched: "+e);
				}
			});


			/**
			 * announcing some text to everyone
			 */
			this.socket.on('announced', function(data) {
				ig.game.write(data.text,{
					x: ig.system.width/4,
					y: ig.system.height/4
				});
			});
			
			/**
			 * disconnecting and removing
			 */
			this.socket.on('disconnect', function() {
				//reconnecting if not wanted to disconnect?
			});
			
			this.socket.on('removed', function(data) {
				try{
					//var ent = ig.game.getEntitiesByType(EntityEnemy)[0];
					//ig.game.removeEntity( ent );
				}catch(e){
					//entity null
					console.log("catched: "+e);
				}
			});
			
		},
		
		
		/**
		 * universal broadcasting method
		 */
		send: function(name, data){
			this.socket.emit("impactconnectbroadcasting", {
					name: name,
					data: data
				});
		},
		
		/**
		 * writes text on every screen
		 * font is your ig.game.font
		 */
		announce: function(data){
			this.socket.emit("announce", data);
		}
		
		
		
	});
});

