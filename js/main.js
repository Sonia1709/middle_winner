var rez_x = window.innerWidth - 20;
var rez_y = window.innerHeight - 20;

var game = new Phaser.Game(rez_x, rez_y, Phaser.AUTO);

var players_speed = 400;
var default_reset_time = 3;

var obstacle_rotation_speed = 3;

var background_scroll_speed = 3;

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

		this.background = this.game.add.tileSprite(0, 0, 0, 0, 'background');
		this.background.width = this.game.width;
		this.background.height = this.game.height;
		this.background.tileScale.set(0.6, 0.6);

		this.middle = create_middle_bound();

		this.player1 = create_player1(this.middle);
		this.player2 = create_player2(this.middle);
		
		game.physics.p2.setImpactEvents(true);
		// Create obstacles group
		this.obstacles = create_obstacles_group();
		
		//Put obstacles in the game
		//this.obstacle = add_obstacle(this.obstacles, this.player1);

	},
	update: function(){
		// scroll the background
		this.background.tilePosition.y += background_scroll_speed;

		// move players by pressing the keys
		playerKeyPressHandler(this.player1, this.player1_keys);
		playerKeyPressHandler(this.player2, this.player2_keys);

		// enable special functions if in 
		// contact with the middle wall
		//middleCollisionHandler(this.player1, this.player2, this.middle);

		descend_obstacle(this.obstacle);
		//obstacleCollisionHandler(this.obstacle, player1);
		outofBoundsKill(this.obstacle);
		//game.physics.arcade.collide(this.obstacle, this.player1, obstacleCollisionHandler, null, this);
	},
	render: function(){
		this.player1._text.text = this.player1._reset_time;
		this.player2._text.text = this.player2._reset_time;
		//game.debug.text(this.middle.position.x, 32, 32);
		game.debug.text(this.player1.x, 32, 64);
	}
};


game.state.add('GameState', GameState);
game.state.start('GameState');