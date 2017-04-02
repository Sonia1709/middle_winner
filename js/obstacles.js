function add_obstacle(obstacles_group, player, playerCollisionGroup, obstacleCollisionGroup){
	var obstacle = null;
	var now = (new Date()).getTime();
	console.log(obstacles_group.children.length);
	if(player._last_created == null || now - player._last_created >= obstacle_creation_time * 1000){
		player._last_created = (new Date()).getTime();

		obstacle = obstacles_group.getFirstDead(true, player.body.x, -10, 'obstacle');
		obstacle.anchor.setTo(0.5);
		obstacle.scale.setTo(1, 0.5);

		game.physics.p2.enable(obstacle);
		obstacle.body.createBodyCallback(player, obstacleCollisionHandler, this);
		obstacle.body.collideWorldBounds = false;

		obstacle.body.setCollisionGroup(obstacleCollisionGroup);
		obstacle.body.collides(playerCollisionGroup);
	}
	return obstacle;
}

function create_obstacles_group(){
	obstacles = game.add.group();

	return obstacles;
}

function descend_obstacle(obstacle){
	if(obstacle){
		obstacle.body.angle += obstacle_rotation_speed;
		obstacle.body.y += obstacle_speed;
	}
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