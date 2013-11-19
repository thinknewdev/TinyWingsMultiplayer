ig.module(
	'game.entities.hud'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityHUD = ig.Entity.extend({
	
		init: function(x, y, settings) {
			this.awesome = 0;
			this.timer = 1;
			this.points = 0;
			this.parasprites = 0;
			this.groundvel = 0;
			this.maxalt = 0;
			this.endTimer = 0;
		},
		
		update: function() {
			this.parent();
			var Player = ig.game.getEntitiesByType(EntityPlayer)[0];
		
			if(Player.startMoving){
				this.awesome *= 3;
				this.awesome += 0.02*(-0.04*Player.coord.y+Player.velocity.x*1.2); // Originally 0.04 not 0.02. Halved for better judge of awesome.
				this.awesome *= 0.25;
				this.timer-=(1/(60*30)-Player.velocity.x*(1/(60*30))*(1/20));
				
				if(this.groundvel<Player.velocity.x){
					this.groundvel = Player.velocity.x;
				}
				if(this.maxalt < -Player.coord.y){
					this.maxalt = -Player.coord.y;
				} 
			
				if(this.timer<0){
					this.timer = 0;
					alert("YOU LOSE");
					if(this.endTimer==0){
						if(Player.velocity.x<2 && Player.touchGround2){
							this.endTimer=60;
						}
					}else{
						this.endTimer--;
						if(this.endTimer==1){
							//menu.gameover();
							alert("GAME OVER");
						}
					}
				}else if(this.timer>1){
					this.timer = 1;
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
			/*
			document.getElementById('points').innerHTML = this.points+"m";
			this.points = Math.floor(Player.coord.x/100);
			if(this.points<0){
				this.points=0;
			}
			*/
		}
	
	})
});