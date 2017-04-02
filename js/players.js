function create_player1(middle, middleCollisionGroup, playerCollisionGroup, obstacleCollisionGroup){
	player1 = this.game.add.sprite(this.game.world.centerX*1.5, this.game.world.centerY*1.5, 'player1');
	player1.anchor.setTo(0.5, 0.5);
	player1.scale.setTo(0.07);

	player1._keys = this.game.input.keyboard.createCursorKeys();

	player1._reset_time = 0;
	player1._text = game.add.bitmapText(this.game.world.centerX + middle.height, 10, 'carrier_command', player1._reset_time,16);
	
	game.physics.p2.enable(player1);
	// callback called if the player
	// hits the middle bounds
	player1.body.setCollisionGroup(playerCollisionGroup);
	player1.body.collides(obstacleCollisionGroup, obstacleCollisionHandler, this);
	player1.body.collides(middleCollisionGroup, middleCollisionHandler, this);
	return player1;
}

function create_player2(middle, middleCollisionGroup, playerCollisionGroup, obstacleCollisionGroup){
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

	game.physics.p2.enable(player2);
	// callback called if the player
	// hits the middle bounds
	player2.body.setCollisionGroup(playerCollisionGroup);
	player2.body.collides(obstacleCollisionGroup, obstacleCollisionHandler, this);
	player2.body.collides(middleCollisionGroup, middleCollisionHandler, this);

	return player2;
}