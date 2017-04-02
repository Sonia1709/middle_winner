function create_player1(middle){
	player1 = this.game.add.sprite(this.game.world.centerX*1.5, this.game.world.centerY*1.5, 'player1');
	player1.anchor.setTo(0.5, 0.5);
	player1.scale.setTo(0.07);

	player1._keys = this.game.input.keyboard.createCursorKeys();

	player1._reset_time = 0;
	player1._text = game.add.bitmapText(this.game.world.centerX + middle.height, 10, 'carrier_command', player1._reset_time,16);

	
	game.physics.enable(player1, Phaser.Physics.ARCADE);
	player1.enableBody = true;
	
	return player1;
}

function create_player2(middle){
	player2 = this.game.add.sprite(this.game.world.centerX/2, this.game.world.centerY*1.5, 'player2');
	player2.anchor.setTo(0.5, 0.5);
	player2.scale.setTo(0.07);

	player2._keys = this.game.input.keyboard.addKeys( { 'up': Phaser.KeyCode.W,
																'down': Phaser.KeyCode.S,
																'left': Phaser.KeyCode.A,
																'right': Phaser.KeyCode.D }
															);
	player2._reset_time = 0;
	player2._text = game.add.bitmapText(10, 10, 'carrier_command', player2._reset_time,16);

	game.physics.enable(player2, Phaser.Physics.ARCADE);
	player2.enableBody = true;

	return player2;
}