ig.module(
	'game.entities.enemy'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityEnemy = ig.Entity.extend({
	
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
			this.pos.y = this.coord.y;
			this.pos.x = this.coord.x;
			this.parent();
		}
		

	});

});