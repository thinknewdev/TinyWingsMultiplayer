ig.module(
	'game.entities.background'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBackground = ig.Entity.extend({

    
    image : null,

    cloud : null,

    size: {x: 130, y:50},
    clouds :null,
   
    
	init: function( x, y, settings ) {
	    
	    this.parent( x, y, settings );
	    ig.merge(this, settings);

	    this.cloud = new ig.Image( this.image);
	    //*
	    if(!gameIsMobile){
			this.clouds = [{"x":675,"y":-250,"velX":1},
						 {"x":0,"y":-500,"velX":2},
						 {"x":1000,"y":-750,"velX":3}];
		}
	    
	    //*/

	},
    
   update: function() {
		///*
		if(!gameIsMobile){
			var i;
			for(i=0;i<this.clouds.length;i++){
				this.clouds[i].x -= this.clouds[i].velX;
				if(this.clouds[i].x<-1000){
					this.clouds[i].x = 1425;
				}
				//ig.log(this.clouds[i].x + " :: "+this.clouds[i].velX)
			}
		}
		//*/
	},
    
    
    kill: function(){
    
    	//this.parent();
    },
    

    draw: function(){
    	/*
    	// Background Sun
		ig.system.context.save();
		ig.system.context.translate(800,600);
		ig.system.context.fillStyle = "#FFD";
		ig.system.context.beginPath();
		ig.system.context.arc(0,0,330,0,Math.PI*2,false);
	  	ig.system.context.fill();
	    ig.system.context.lineWidth = 10;
	    ig.system.context.strokeStyle = "#FFA";
	    ig.system.context.stroke();
		ig.system.context.restore();
		*/
		//*
		// Background Clouds
		if(!gameIsMobile){
			//ig.log("DRAWING CLOUDS HERE")
			ig.system.context.save();
			ig.system.context.globalAlpha = 0.8;
			var i;
			for(i=0;i<this.clouds.length;i++){
				this.cloud.draw(this.clouds[i].x, this.clouds[i].y);
				//ig.log(this.clouds[i].x + " -- "+this.clouds[i].velX)
			}
			ig.system.context.restore();
		}
		//*/

    }



});


});   
