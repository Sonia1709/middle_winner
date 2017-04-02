function add_obstacle(obstacles_group, player, playerCollisionGroup, obstacleCollisionGroup){
	obstacle = obstacles_group.create(game.world.centerX*1.5, game.world.centerY*0.5, 'obstacle');
	obstacle.anchor.setTo(0.5);
	obstacle.scale.setTo(1, 0.5);

	game.physics.p2.enable(obstacle);
	obstacle.body.createBodyCallback(player, obstacleCollisionHandler, this);
	obstacle.body.collideWorldBounds = false;

	obstacle.body.setCollisionGroup(obstacleCollisionGroup);
	obstacle.body.collides(playerCollisionGroup);
	return obstacle;
}

function create_obstacles_group(){
	obstacles = game.add.group();

	return obstacles;
}

function descend_obstacle(obstacle){
	if(obstacle){
		obstacle.body.angle += obstacle_rotation_speed;
		obstacle.body.y += 1;
	}
}

function obstacleCollisionHandler(player, obstacle){
	if(collided_with_obstacle(obstacle, player)){
		console.log(player);
		game.debug.text(player.sprite.key + " lost!", 32, 32);
		console.log("Touched");
	}
}

function collided_with_obstacle(obstacle, player){
	return true;
}

function create_middle_bound(middleCollisionGroup, playerCollisionGroup){
	middle = game.add.sprite(game.world.centerX, game.world.centerY, 'middle');
	middle.anchor.setTo(0.5, 0.5);
	middle.width = game.height;
	game.physics.p2.enable(middle);
	middle.body.static = true;
	middle.body.angle = 90;
	middle.body.width = game.height;

	middle.body.setCollisionGroup(middleCollisionGroup);
	middle.body.collides(playerCollisionGroup);
	return middle;
}