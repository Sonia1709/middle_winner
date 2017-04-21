function obstacleCollisionHandler(item1, item2){
	//game.debug.text(player.sprite.key + " lost!", 120, 100);
	if(item1.sprite.key == 'player1'){
		item1.sprite._text.text = "This player lost";
		item1.sprite._lost = true;
	}
	else if(item2.sprite.key == 'player2'){
		item2.sprite._text.text = "This player lost";
		item2.sprite._lost = true;
	}
	setTimeout(function(){this.game.state.start('MenuState')}, lose_timeout);
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

function incrementScore(player){
	try{
		var score = parseInt(player._text.text) + 100;
		if(isNaN(score)){
			throw Error("Player already lost :(")
		}
		player._text.text = score.toString();
	}
	catch(err){
		console.log(player.key + ": " + err)
	}
}

function outofBoundsKill(obstacle){
	if(obstacle && obstacle.alive){
		if(obstacle.y  > game.world.height + obstacle.height+ obstacle.width){
			obstacle.kill();

			// reward the player with points
			if(obstacle.x > game.world.centerX){
				incrementScore(this.player1);
			}
			else if(obstacle.x < game.world.centerX){
				incrementScore(this.player2);
			}
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