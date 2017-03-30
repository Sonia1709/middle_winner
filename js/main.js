var rez_x = window.innerWidth - 20;
var rez_y = window.innerHeight - 20;
var players_speed = 10;
var game = new Phaser.Game(rez_x, rez_y, Phaser.AUTO);

var GameState = {
	preload: function(){
		this.load.image('background', 'assets/images/background2.jpg');
		this.load.image('player1', 'assets/images/player1.png');
		this.load.image('player2', 'assets/images/player2.png');
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
		

	},
	update: function(){
		//this.player1.angle += 5;
		this.background.tilePosition.y += 3;

		if(this.player1_keys.left.isDown){
			this.player1.position.x -= players_speed;
		}

		if(this.player1_keys.right.isDown){
			this.player1.position.x += players_speed;
		}

		if(this.player1_keys.up.isDown){
			this.player1.position.y -= players_speed;
		}

		if(this.player1_keys.down.isDown){
			this.player1.position.y += players_speed;
		}

		if(this.player2_keys.left.isDown){
			this.player2.position.x -= players_speed;
		}

		if(this.player2_keys.right.isDown){
			this.player2.position.x += players_speed;
		}

		if(this.player2_keys.up.isDown){
			this.player2.position.y -= players_speed;
		}

		if(this.player2_keys.down.isDown){
			this.player2.position.y += players_speed;
		}
	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');