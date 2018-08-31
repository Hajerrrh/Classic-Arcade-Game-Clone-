//  invoke strict mode for the entire script
'use strict';
//Set the initial game's level to 1
let level = 1;

// Set the initial player's score to 0.
let score = 0;
let gameScore = document.getElementById('playerScore').innerHTML;
gameScore = score;

// Enemies our player must avoid
let Enemy = function( x , y , speed ) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;

    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {

        this.x += (this.speed * dt);
    }
    else {this.x = -90;}

	// If the enemy and the player collide
  if( player.x >= this.x -40 && player.x <=this.x + 40 ){
          if( player.y >= this.y -40 && player.y <=  this.y+40 ) {
		//score = 0;
		gameScore = score;
		player.reset();
  }}

    // increment levels when the player reaches certain score
    if(  score >= 3){
         level = 2;
     }
     if( score >= 6){
          level = 3;
      }
     document.getElementById("level").innerHTML= level;

     // change number of Enemies+speed when player reaches a higher level
     if( level === 1){
       for(let i=0; i<allEnemies.length; i++){
           allEnemies[i].speed=150;
       }
   }
     if (level === 2){

                allEnemies[4]= e5;
                allEnemies[5]= e6;
                for(let i=0; i<allEnemies.length; i++){
                    allEnemies[i].speed=200;
                }
            }
      if (level === 3){

                allEnemies[0]= e1;
                allEnemies[1]= e2;
                for(let i=0; i<allEnemies.length; i++){
                    allEnemies[i].speed=250;
                }
            }
};
// called when the enemy is reset to the starting point
Enemy.prototype.reset = function(){
    this.x = this.x; // verify
    this.y = this.y;
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {

    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 320;
};

//  called when the player is reset to the starting point
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 320;
};
// called when the player's position is changed
Player.prototype.update = function(){
  // If the player moves beyond the canvas
    if (this.y > 606) {
        this.y = 606;
    }

    if (this.x > 505) {
        this.x = 505;
    }

    if (this.x < 0) {
        this.x = 0;
    }

  // If the player reaches the water : Success!
  // increment the Score
  // reset the player's position to start over
  if (this.y < 0) {
    score++;
	document.getElementById('playerScore').innerHTML = score;
    this.reset();
    }

};

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Let the player use the arrow keys to move
Player.prototype.handleInput = function(arrow){
    if( arrow === 'left' && this.x > 0 ){
        this.x = this.x - 20;
      }
    else if( arrow === 'right' && this.x < 400){
        this.x = this.x + 20;
      }
    else if( arrow === 'up' && this.y > -50){
        this.y = this.y - 20;
        }
    else if( arrow === 'down' && this.y < 400){
        this.y = this.y + 20;
        }
};

// Now instantiate your objects.
// Enemis + starting positions
let e1 = new Enemy(-90, 60);
let e2 = new Enemy(-190, 140);
let e3 = new Enemy(-290, 230);
let e4 = new Enemy(-390, 140);
let e5 = new Enemy(-490, 60);
let e6 = new Enemy(-890, 230);


// Place all enemy objects in an array called allEnemies
const allEnemies = [e3, e4, e5, e6] ;

// Place the player object in a variable called player
let player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
