function middleCollisionHandler(player1, player2, middle){
	if (player1.position.x <= middle.position.x + middle.height*0.75){
		player1.position.x = middle.position.x + middle.height*0.75;

		if (player1._reset_time == 0){
			player2.position.x = 0;
			player1._reset_time = default_reset_time;
			player1._timer = game.time.events.loop(default_reset_time*1000, decreaseTimer, this, player1);
		}
	}
	if (player2.position.x >= middle.position.x - middle.height*0.75){
		player2.position.x = middle.position.x - middle.height*0.75;

		if (player2._reset_time == 0){
			player1.position.x = game.world.width;
			player2._reset_time = default_reset_time;
			player2._timer = game.time.events.loop(default_reset_time*1000, decreaseTimer, this, player2);
		}
	}

	if(player1._reset_time <= 0){
		game.time.events.remove(player1._timer);
		player1._reset_time = 0;
	}

	if(player2._reset_time <= 0){
		game.time.events.remove(player2._timer);
		player2._reset_time = 0;
	}

	// hardcoding
	if (player1._reset_time <= 0 && player2._reset_time <= 0){
		game.time.events.removeAll();
	}
}

function decreaseTimer(player){
	player._reset_time--;
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

function playerKeyPressHandler(player, player_keys){
	if(player._keys.left.isDown){
			player.position.x -= players_speed;
		}

		if(player._keys.right.isDown){
			player.position.x += players_speed;
		}

		if(player._keys.up.isDown){
			player.position.y -= players_speed;
		}

		if(player._keys.down.isDown){
			player.position.y += players_speed;
		}
}