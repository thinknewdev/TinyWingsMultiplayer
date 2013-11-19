ig.module(
	'game.entities.terrain'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityTerrain = ig.Entity.extend({

    
    

    size: {x: 130, y:50},
    nodes: null,
    lastX:null,
    drawFarBack:null,
    startMoving:false,
    
	init: function( x, y, settings ) {
	    
	    this.parent( x, y, settings );
	    ig.merge(this, settings);
	    this.nodes = [ {"x":-200,"y":-100}, {"x":0,"y":-200}, {"x":400,"y":300}, {"x":700,"y":100} ];
		this.lastX = 2;
		this.drawFarBack = 600;
		var i;
		for(i=0;i<17;i++){
			this.newNode();
		}
	    

	},
	newNode : function()
	{
		if(this.nodes.length<=20){
			this.nodes.push( {} );
		}else{
			this.nodes.push( this.nodes[this.lastX-2] );
			this.nodes[this.lastX-2] = null;
		}
		this.nodes[this.nodes.length-1].x = this.nodes[this.nodes.length-2].x + Math.random()*150+250;
		if(this.nodes[this.nodes.length-2].y<130){
			this.nodes[this.nodes.length-1].y = 200+Math.random()*70;
		}else{
			this.nodes[this.nodes.length-1].y = 130-Math.random()*70;
		}
	},

	updateX : function(xx)
	{
		while( xx > this.nodes[this.lastX].x ){
			this.newNode();
			this.lastX++;
		}
	},

	funct : function(xx)
	{
		var i=this.lastX-1;
		while(this.nodes[i].x<xx){
			i++;
		}
		var ANode = this.nodes[i-1];
		var BNode = this.nodes[i];
		return ANode.y
				- (BNode.y-ANode.y)*0.5
				* ( Math.cos( Math.PI*( xx-ANode.x )/( BNode.x-ANode.x ) ) - 1 );
	},

	functDiff : function(xx)
	{
		var i=this.lastX-1;
		while(this.nodes[i].x<xx){
			i++;
		}
		var ANode = this.nodes[i-1];
		var BNode = this.nodes[i];
		return (BNode.y-ANode.y)*0.5
				* Math.PI/( BNode.x-ANode.x )
				* ( Math.sin( Math.PI*( xx-ANode.x )/( BNode.x-ANode.x ) ) );
	},
    
    update: function() {
	    

	},
	 
	inFocus: function() {
	    

	},
    broadcastPosition: function(){
    	
    },
    
    initKeys: function(){

    },
    
    kill: function(){
    
    	//this.parent();
    },
    
    handleMovementTrace: function( res ) {
        this.parent(res); 
    },

    draw: function(starttt){
    	// Later, ALL HEX?
		ig.system.context.lineWidth = 50;
		if(gameIsMobile){
			ig.system.context.strokeStyle = "rgb(170,200,47)"; // Top
			ig.system.context.fillStyle = "rgb(152,179,43)"; // Middle
			this.drawFrom(starttt,25);
		}else{
			ig.system.context.strokeStyle = "rgb(170,200,47)"; // Top
			this.drawFrom(starttt,25);
			ig.system.context.strokeStyle = "rgb(152,179,43)"; // Middle
			ig.system.context.fillStyle = "#8FA927"; // Bottom 
			this.drawFrom(starttt,70);
		}
    },
    drawFrom : function( starttt, yOff )
	{
		ig.system.context.beginPath();
		var tmpTerrYDraw = this.funct(starttt-this.drawFarBack);
		ig.system.context.moveTo( 0-this.drawFarBack, tmpTerrYDraw+yOff );
		var i;
		if(this.startMoving){
			if(gameIsMobile){
				if(gScale<0.35){
					for( i=30-this.drawFarBack; i<=1440; i+=75 ){
						tmpTerrYDraw = this.funct(starttt+i);
						ig.system.context.lineTo( i, tmpTerrYDraw+yOff );
					}
				}else{
					for( i=30-this.drawFarBack; i<=1200; i+=50 ){
						tmpTerrYDraw = this.funct(starttt+i);
						ig.system.context.lineTo( i, tmpTerrYDraw+yOff );
					}
				}
			}else{
				if(gScale<0.35){
					for( i=30-this.drawFarBack; i<=1440; i+=30 ){
						tmpTerrYDraw = this.funct(starttt+i);
						ig.system.context.lineTo( i, tmpTerrYDraw+yOff );
					}
				}else{
					for( i=30-this.drawFarBack; i<=1200; i+=20 ){
						tmpTerrYDraw = this.funct(starttt+i);
						ig.system.context.lineTo( i, tmpTerrYDraw+yOff );
					}
				}
			}
		}else{
			if(gameIsMobile){
				for( i=30-this.drawFarBack; i<=500; i+=30 ){
					tmpTerrYDraw = this.funct(starttt+i);
					ig.system.context.lineTo( i, tmpTerrYDraw+yOff );
				}
			}else{
				for( i=30-this.drawFarBack; i<=500; i+=10 ){
					tmpTerrYDraw = this.funct(starttt+i);
					ig.system.context.lineTo( i, tmpTerrYDraw+yOff );
				}
			}
		}
		ig.system.context.lineTo(1425,1000);
		ig.system.context.lineTo(0-this.drawFarBack,1000);
		ig.system.context.fill();
		ig.system.context.stroke();
	}



});


});   
