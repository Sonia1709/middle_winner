var rez_x = window.innerWidth - 20;
var rez_y = window.innerHeight - 20;
var players_speed = 10;
var player_rotation_speed = 0;
var game = new Phaser.Game(rez_x, rez_y, Phaser.AUTO);

var GameState = {
	preload: function(){
		this.load.image('background', 'assets/images/background2.jpg');
		this.load.image('player1', 'assets/images/player1.png');
		this.load.image('player2', 'assets/images/player2.png');
		this.load.image('obstacle', 'assets/images/obstacle.png');
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
		
		obstacles = game.add.group();
		obstacles.enableBody = true;
		obstacles.physicsBodyType = Phaser.Physics.ARCADE;
		obstacles.createMultiple(10, 'obstacle');
		obstacles.setAll('anchor.x', 0,5);
		obstacles.setAll('anchor.y', 1);
		obstacles.setAll('outOfBoundsKill', true);
		obstacles.setAll('checkWorldBounds', true);

		middle = game.add.group();
		middle.enableBody = true;
		middle.physicsBodyType = Phaser.Physics.ARCADE;

		game.physics.enable(this.player1, Phaser.Physics.ARCADE);
		game.physics.enable(this.player2, Phaser.Physics.ARCADE);


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

		// out-of-bounds fix
		outOfBoundsBlock(this.player1);
		outOfBoundsBlock(this.player2);
	}
};

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