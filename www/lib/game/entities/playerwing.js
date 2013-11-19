ig.module(
'game.entities.playerwing'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityPlayerwing = ig.Entity.extend({

	    collides: ig.Entity.COLLIDES.PASSIVE,
	    type: ig.Entity.TYPE.A,
	    //checkAgainst: ig.Entity.TYPE.B,

		maxVel: {x: 100, y: 200},
		friction: {x: 600, y: 0},
		
	    size: {x: 8, y:14},
		offset: {x: 4, y: 2},
		
	    health: 20,
	    
	    animSheet: new ig.AnimationSheet( 'media/scootoloo.png', 16,16 ),
	    
	    handlesInput: true,
	    
	    flipped: false,
	    
	    init: function( x, y, settings ) {
	        
	        this.parent( x, y, settings );
	        ig.merge(this, settings);
	        
	        this.addAnim( 'idle', 1, [0,1,0] );
			this.addAnim( 'run', 1, [0,1,0] );
			this.addAnim( 'jump', 1, [0,1,0] );
			this.addAnim( 'fall', 1, [0,1,0] );
			
			this.remoteAnim = "idle";
			ig.log(this.anims.idle);
			
	    },
	    
	    update: function() {

	        this.parent(); 
	        if(this.handlesInput){
	        	this.initKeys();
	        }
	        
	    },
	    
	    broadcastPosition: function(){
	    	/*
	    	ig.game.gamesocket.send('move', {
	    		pos: this.pos,
	    		remoteAnim: this.remoteAnim,
	    		remoteId: this.remoteId,
	    		flipped: this.flipped
	    	});
			*/
	    },
	    
	    initKeys: function(){
	    	ig.log("WORKING INIT KEYS");
	    	
	    	if( ig.input.pressed('jump') ) {
				this.vel.y = -100;
			}

	        
	        var accel = 100;
	        if(ig.input.state('left') ){
	        	this.accel.x = -accel;
	        	this.flipped = true;
	        }else if(ig.input.state('right') ){
	        	this.accel.x = accel;
	        	this.flipped = false;
	        }else{
	        	this.accel.x = 0;
	        }
	        
	        // animations
	        if( this.vel.y < 0 ) {
				this.currentAnim = this.anims.jump;
				this.broadcastPosition();
				this.remoteAnim = "jump";
			}else if( this.vel.y > 0 ) {
				this.currentAnim = this.anims.fall;
				this.broadcastPosition();
				this.remoteAnim = "fall";
			}else if( this.vel.x != 0 ) {
				this.currentAnim = this.anims.run;
				this.broadcastPosition();
				this.remoteAnim = "run";
			}else {
				this.currentAnim = this.anims.idle;
				if(this.remoteAnim != "idle"){
					this.remoteAnim = "idle";
					this.broadcastPosition();
				}
			}
			
			this.currentAnim.flip.x = this.flipped;
	    },
	    
	    kill: function(){
	    	this.pos.x = 40;
	    	this.pos.y = 64;
	    	//ig.game.gamesocket.announce({text: this.remoteId+" got killed!"});
	    	this.health = 20;
	    	//this.parent();
	    },
	    
	    handleMovementTrace: function( res ) {
	        this.parent(res); 
	    }

	});

});

   
