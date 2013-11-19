ig.module(
	'game.entities.clickable'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityClickable = ig.Entity.extend({

    
    I_Btn : null,
    image : null,

    size: {x: 130, y:50},
    pos: {x: 0, y:0},

    state: 'idle',
    
    _oldPressed: false,
    _startedIn: false,
   
    
	init: function( x, y, settings ) {
	    
	    this.parent( x, y, settings );
	    ig.merge(this, settings);

	    this.I_Btn = new ig.Image( this.image);

	},
    
   update: function() {
   		/*
	    if (ig.input.state('click') && this.inFocus()) {
	        ig.log('clicked');
	        ig.game.fire(this, "running"); 

	    }
	    */

	    if ( this.state !== 'hidden' ) {
        var _clicked = ig.input.state( 'click' );
        
        if ( !this._oldPressed && _clicked && this._inButton() ) {
          this._startedIn = true;
          ig.game.fire(this, "running"); 
        }
        
        if ( this._startedIn && this.state !== 'deactive' && this._inButton() ) {
          if ( _clicked && !this._oldPressed ) { // down
            this.setState( 'active' );
            this.pressedDown();
          }
          else if ( _clicked ) { // pressed
            this.setState( 'active' );
            this.pressed();
          }
          else if ( this._oldPressed ) { // up
            this.setState( 'idle' );
            this.pressedUp();
          }
        }
        else if ( this.state === 'active' ) {
          this.setState( 'idle' );
        }

        if ( this._oldPressed && !_clicked ) {
          this._startedIn = false;
        }

        this._oldPressed = _clicked;
      }

		//I_Btn = new ig.Image( "media/B_Multiplayer.png");
		
		//this.size = {x: this.I_Btn.width, y:this.I_Btn.height}
		//I_Btn.draw(this.pos.x,this.pos.y)

	},
	 
	inFocus: function() {
	    return (
	       (this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
	       ((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
	       (this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
	       ((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y)
	    );
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

    draw: function(){
		
    	this.I_Btn.draw(this.pos.x,this.pos.y)
    	//ig.log(this.pos.x +" "+ this.pos.y);
    },

    setState: function( s ) {
      this.state = s;
      
      if ( this.state !== 'hidden' ) {
        //this.currentAnim = this.anims[ this.state ];
      }
    },
    
    pressedDown: function() {},
    pressed: function() {},
    pressedUp: function() {},
    
    _inButton: function() {
      return ig.input.mouse.x + ig.game.screen.x > this.pos.x && 
             ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x &&
             ig.input.mouse.y + ig.game.screen.y > this.pos.y && 
             ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
    }



});


});   
