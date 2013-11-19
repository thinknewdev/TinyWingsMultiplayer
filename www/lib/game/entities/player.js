ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityPlayer = ig.Entity.extend({
	
		size: {x:75, y:75},
		collides: ig.Entity.COLLIDES.FIXED,
		
		animSheet: new ig.AnimationSheet( 'art/scootoloo.png', 75, 75),
	    
	    init: function( x, y, settings ) {
			this.parent(x, y, settings);
			this.addAnim('idle', 0.2, [0,1,2]);
			
			this.coord = new Object();
			this.velocity = new Object();
			this.coord.x = -10;
			this.coord.y = -201;
			this.velocity.x = 1.9;
			this.velocity.y = -0.9;
			this.rotation = 0;
			this.width = this.height = 200;
			this.frame = 0;
			
			this.touchGround = true;
			this.touchGround2 = true;
			this.touchGround3 = false;
			this.keyDown = false;
			this.startMoving = true;
	    },
		
		draw: function() {
			this.pos.y = this.coord.y;
			this.parent();
		},
		
		update: function() {
			this.parent();
			var HUD = ig.game.getEntitiesByType(EntityHUD)[0];
			var Terrain = ig.game.getEntitiesByType(EntityTerrain)[0];
			
			// KEY
			/*
			this.keyDown = kCont.down;
			if(!this.startMoving){
				this.startMoving = this.keyDown;
				// Play music if not mobile and upon starting game
				if(this.keyDown){
					if( !gameIsMobile && music.paused ){
						//music.currentTime = 0;
						menu.toggleAudio();
					}
				}
			}
			*/
			
			// FRAME
			this.frame += (2+this.velocity.x)/60;
			if(this.keyDown){
				this.frame += 0.2;
			}
			this.frame %= 3;
			
			if(this.startMoving){
				
				// Velocity Addition
				if(HUD.timer<=0){
					this.velocity.x*=0.98;
				}
				if(HUD.timer>0 && this.keyDown){
					if(this.touchGround2){
						if(this.velocity.y>0){
							this.velocity.y += 0.3; 
							//this.velocity.x += 0.05; 
						}else{
							//this.velocity.y -= 0.05; 
							this.velocity.x += 0.2; 
							//this.velocity.x += 0.1; //Should just be pushing fwd
						}
					}else{
						this.velocity.y += 0.25;
					}
				}else{
					if(HUD.timer>0 && this.touchGround2){
						if(this.velocity.y<0 && this.velocity.x<3){
							this.velocity.x += 0.05;
						}
					}
					if(HUD.timer<=0 && !this.touchGround2){
						this.velocity.y+=0.2;
					}
					this.velocity.y += 0.08;
				}
				
				// Move coords
				this.coord.x += this.velocity.x;
				var terrY = Terrain.funct(this.coord.x);
				if(this.touchGround3){
					this.coord.y += terrY;
				}else{
					this.coord.y += this.velocity.y;
				}	
				// Terrain Update
				
				Terrain.updateX(this.coord.x);
				
				// Correct coords
				/*this.touchGround = (   ( this.velocity.y>0 && this.coord.y>terrY-2 )
								   || ( this.velocity.y<0 && this.coord.y>terrY-0.5 )
								   );*/
				//this.touchGround3 = this.coord.y>terrY-100;
				this.touchGround2 = this.coord.y>terrY-5;
				this.touchGround = this.coord.y>terrY;
				if(this.touchGround)
				{
					this.coord.y = terrY;
					// Slope & Projection
					var terrSlope = Terrain.functDiff(this.coord.x);
					var terrLength = Math.sqrt(1*1+terrSlope*terrSlope);
					var dotProduct = this.velocity.x*1 + this.velocity.y*terrSlope;
					dotProduct = dotProduct/terrLength;
					this.velocity.x = dotProduct/Math.sqrt(1+terrSlope*terrSlope);
					if(this.velocity.x<0.1){
						this.velocity.x=0.1;
					}
					this.velocity.y = this.velocity.x*terrSlope;
					this.velocity.x*=0.995;
					this.velocity.y*=0.995;
				}else{
					//this.coord.y += this.velocity.y;
				}
				
				this.rotation = Math.atan2(this.velocity.y,this.velocity.x);
				if(this.rotation>Math.PI*0.3){
					this.rotation*=3;
					this.rotation+=Math.PI*0.3;
					this.rotation*=0.25;
				}
			}
		}

	});

});