function add_obstacle(obstacles_group, player){
	obstacle = obstacles.create(game.world.centerX*1.5, game.world.centerY*0.5, 'obstacle');
	obstacle.anchor.setTo(0.5);
	obstacle.scale.setTo(1, 0.5);

	return obstacle;
}

function create_obstacles_group(){
	obstacles = game.add.group();
	obstacles.enableBody = true;
	obstacles.physicsBodyType = Phaser.Physics.ARCADE;

	return obstacles;
}

function descend_obstacle(obstacle){
	if(obstacle){
		obstacle.angle += obstacle_rotation_speed;
		obstacle.position.y += 1;
	}
}

function obstacleCollisionHandler(obstacle, player){
	if(collided_with_obstacle(obstacle, player)){
		console.log(player);
		game.debug.text(player.key + " lost!", 32, 32);
		console.log("Touched");
		obstacle.kill();
	}
}

function collided_with_obstacle(obstacle, player){
	return true;
}

function create_middle_bound(){
	middle = game.add.sprite(game.world.centerX, game.world.centerY, 'middle');
	middle.anchor.setTo(0.5, 0.5);
	middle.width = game.height;
	game.physics.p2.enable(middle);
	middle.body.static = true;
	middle.body.angle = 90;
	middle.body.width = game.height;

	return middle;
}