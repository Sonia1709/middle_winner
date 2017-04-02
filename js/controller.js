function middleCollisionHandler(player, middle){
	player.sprite._text.text = "This player hit the middle";
	console.log("ASD");
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