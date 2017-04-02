function obstacleCollisionHandler(item1, item2){
	//game.debug.text(player.sprite.key + " lost!", 120, 100);
	if(item1.sprite.key == 'player1'){
		item1.sprite._text.text = "This player lost";
	}
	else if(item2.sprite.key == 'player2'){
		item2.sprite._text.text = "This player lost";	
	}
}

function middleCollisionHandler(player, middle){
	//player.sprite._text.text = "This player hit the middle";
	if(player.sprite.key == "player1"){
		this.player2.body.x = 0;
	}

	if(player.sprite.key == "player2"){
		this.player1.body.x = game.world.width;
	}
}

function decreaseTimer(player){
	player._reset_time--;
}

function outofBoundsKill(obstacle){
	if(obstacle && obstacle.alive){
		if(obstacle.y  > game.world.height + obstacle.height+ obstacle.width){
			obstacle.kill();
		}
	}
}

function playerKeyPressHandler(player, player_keys){
	player.body.setZeroVelocity();

	if(player._keys.left.isDown){
			player.body.moveLeft(players_speed);
		}

		if(player._keys.right.isDown){
			player.body.moveRight(players_speed);
		}

		if(player._keys.up.isDown){
			player.body.moveUp(players_speed);
		}

		if(player._keys.down.isDown){
			player.body.moveDown(players_speed);
		}
}