var rez_x = window.innerWidth - 20;
var rez_y = window.innerHeight - 20;

var game = new Phaser.Game(rez_x, rez_y, Phaser.AUTO);

var players_speed = 10;
var player_rotation_speed = 0;
var default_reset_time = 3;

var obstacle_rotation_speed = 3;

result = "Started game";
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
		game.physics.startSystem(Phaser.Physics.P2JS);

		//this.background = this.game.add.sprite(0, 0, 'background');
		this.background = this.game.add.tileSprite(0, 0, 0, 0, 'background');
		this.background.width = this.game.width;
		this.background.height = this.game.height;
		this.background.tileScale.set(0.6, 0.6);

		this.middle = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'middle');
		this.middle.anchor.setTo(0.5, 0.5);
		this.middle.angle += 90;
		this.middle.width = this.game.height;

		this.player1 = create_player1(this.middle);
		this.player2 = create_player2(this.middle);

		// Create obstacles group
		this.obstacles = create_obstacles_group();
		
		//Put obstacles in the game
		this.obstacle = add_obstacle(this.obstacles, this.player1);

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

		descend_obstacle(this.obstacle);
		obstacleCollisionHandler(this.obstacle, player1);
		outofBoundsKill(this.obstacle);
		//game.physics.arcade.collide(this.obstacle, this.player1, obstacleCollisionHandler, null, this);
	},
	render: function(){
		this.player1._text.text = this.player1._reset_time;
		this.player2._text.text = this.player2._reset_time;
	}
};


game.state.add('GameState', GameState);
game.state.start('GameState');