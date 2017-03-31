var rez_x = window.innerWidth - 20;
var rez_y = window.innerHeight - 20;
var players_speed = 10;
var player_rotation_speed = 0;
var game = new Phaser.Game(rez_x, rez_y, Phaser.AUTO);
result = "Started game";

var player1_touching_middle = false;
var player2_touching_middle = false;

var player1_timer;
var player2_timer;
var default_reset_time = 3;
var player1_reset_time = 0;
var player2_reset_time = 0;
var text_style = { font: "65px Arial", fill: "#ff0044", align: "center" };

var GameState = {
	preload: function(){
		this.load.image('background', 'assets/images/background2.jpg');
		this.load.image('player1', 'assets/images/player1.png');
		this.load.image('player2', 'assets/images/player2.png');
		this.load.image('obstacle', 'assets/images/obstacle.png');
		this.load.image('middle', 'assets/images/obstacle.png');

		game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');

	},
	create: function(){
		//this.background = this.game.add.sprite(0, 0, 'background');
		this.background = this.game.add.tileSprite(0, 0, 0, 0, 'background');
		this.background.width = this.game.width;
		this.background.height = this.game.height;
		this.background.tileScale.set(0.6, 0.6);

		this.player1 = this.game.add.sprite(this.game.world.centerX*1.5, this.game.world.centerY*1.5, 'player1');
		this.player1.anchor.setTo(0.5, 0.5);
		this.player1.scale.setTo(0.07);

		this.player2 = this.game.add.sprite(this.game.world.centerX/2, this.game.world.centerY*1.5, 'player2');
		this.player2.anchor.setTo(0.5, 0.5);
		this.player2.scale.setTo(0.07);

		this.player1_keys = this.game.input.keyboard.createCursorKeys();
		this.player2_keys = this.game.input.keyboard.addKeys( { 'up': Phaser.KeyCode.W,
																'down': Phaser.KeyCode.S,
																'left': Phaser.KeyCode.A,
																'right': Phaser.KeyCode.D }
															);
		game.physics.enable(this.player1, Phaser.Physics.ARCADE);
		game.physics.enable(this.player2, Phaser.Physics.ARCADE);

		this.middle = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'middle');
		this.middle.anchor.setTo(0.5, 0.5);
		this.middle.angle += 90;
		this.middle.width = this.game.height;
		
		this.player1_text = game.add.bitmapText(10, 10, 'carrier_command', player1_reset_time,16);
		this.player2_text = game.add.bitmapText(this.game.world.centerX + this.middle.height, 10, 'carrier_command', player2_reset_time,16);
	},
	update: function(){
		// rotate players icons
		this.player1.angle += player_rotation_speed;
		this.player2.angle += player_rotation_speed;

		// scroll the background
		this.background.tilePosition.y += 3;

		// move players by pressing the keys
		playerKeyPressHandler(this.player1, this.player1_keys);
		playerKeyPressHandler(this.player2, this.player2_keys);

		// stop the player from leaving the world
		outOfBoundsBlock(this.player1);
		outOfBoundsBlock(this.player2);

		// block player from passing middle
		// enable special functions if in 
		// contact with the middle wall
		middleCollisionHandler(this.player1, this.player2, this.middle);
		this.player1_text.text = player1_reset_time;
		this.player2_text.text = player2_reset_time;
	},
	render: function(){
	}
};

function middleCollisionHandler(player1, player2, middle){
	if (player1.position.x <= middle.position.x + middle.height*0.75){
		player1.position.x = middle.position.x + middle.height*0.75;
		player1_touching_middle = true;
	}
	else if (player2.position.x >= middle.position.x - middle.height*0.75){
		player2.position.x = middle.position.x - middle.height*0.75;
		player2_touching_middle = true;
	}

	if (player1_touching_middle && player1_reset_time == 0){
		player2.position.x = 0;
		player1_touching_middle = false;
		player1_timer = game.time.create(false);
		player1_timer.loop(default_reset_time*1000, function(){player1_reset_time--}, this);
		player1_timer.start();
	}
	else if(player2_touching_middle && player2_reset_time == 0){
		player1.position.x = game.world.width;
		player2_touching_middle = false;
		player2_timer = game.time.create(false);
		player2_timer.loop(default_reset_time*1000, function(){player2_reset_time}, this);
		player2_timer.start();
	}

	if(player1_reset_time < -10){
		//player1_timer.stop();
		player1_timer = null;
		player1_reset_time = 0;
	}

	if(player2_reset_time < 0){
		//player2_timer.stop();
		//player2_timer = null;
		player2_reset_time = 0;
	}
}

function playerKeyPressHandler(player, player_keys){
	if(player_keys.left.isDown){
			player.position.x -= players_speed;
		}

		if(player_keys.right.isDown){
			player.position.x += players_speed;
		}

		if(player_keys.up.isDown){
			player.position.y -= players_speed;
		}

		if(player_keys.down.isDown){
			player.position.y += players_speed;
		}
}

function outOfBoundsBlock(player){
	if(player.position.x >= game.world.width){
		player.position.x = game.world.width;
	}
	if(player.position.x <= 0){
		player.position.x = 0;
	}
	if(player.position.y >= game.world.height){
		player.position.y = game.world.height;
	}
	if(player.position.y <= 0){
		player.position.y = 0;
	}
}

function decreaseTimer(counter){
	console.log(counter);
	counter--;
}
function createObstacle(){
	var obstacle = obstacles.getFirstExists(false);
	if (obstacle){
		obstacle.reset(500, 500);
	}
}

function collisionHandler(player, object){
	player.position.y = 1100;
	object.position.y = 2000;
}

game.state.add('GameState', GameState);
game.state.start('GameState');