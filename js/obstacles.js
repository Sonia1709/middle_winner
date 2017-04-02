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
	obstacle.angle += obstacle_rotation_speed;
	obstacle.position.y += 1;
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
	// calculate obstacle points
	var A = {
		x: obstacle.position.x - obstacle.width/2,
		y: obstacle.position.y + obstacle.height/2
	};
	var B = {
		x: obstacle.position.x + obstacle.width/2,
		y: obstacle.position.y + obstacle.height/2
	};
	var C = {
		x: obstacle.position.x - obstacle.width/2,
		y: obstacle.position.y - obstacles.height/2
	};
	var D = {
		x: obstacle.position.x + obstacle.width/2,
		y: obstacle.position.y - obstacle.height/2
	};
	var center = {
		x: obstacle.position.x,
		y: obstacle.position.y
	}

	angle = obstacle.angle/360;

	// rotate the rectangle according to it's
	// sprite rotation angle
	A = rotate_point(A, center, angle);
	B = rotate_point(B, center, angle);
	C = rotate_point(C, center, angle);
	D = rotate_point(D, center, angle);

	//console.log(obstacle.height, obstacle.width);
	var area = obstacle.height * obstacle.width;
	var sum_area = 0;
	var player_center = {
		x: player.position.x,
		y: player.position.y
	};

	for (let points of [[A, B], [B, D], [D, C], [C, A]]){
		point1 = points[0];
		point2 = points[1];
		let side1 = points_distance(point1, point2);
		let side2 = points_distance(point2, player_center);
		let side3 = points_distance(player_center, point1);

		// Heron's formula
		let perimeter = (side1 + side2 + side3)/2;
		let part_area =  Math.sqrt(perimeter*((perimeter-side1)*(perimeter-side2)*(perimeter-side3)));
		console.log("part area: " + parseInt(part_area));
		sum_area +=  parseInt(part_area);
	}
	console.log("calculated: " + parseInt(sum_area));
	console.log("area: " + area);
	return (parseInt(sum_area) == area);
}

function points_distance(point1, point2){
	return Math.sqrt(((point2.x - point1.x)**2) + ((point2.y - point1.y)**2));
}
function rotate_point(point, center, theta){
	// cx, cy - center of square coordinates
	// x, y - coordinates of a corner point of the square
	// theta is the angle of rotation

	var x = point.x;
	var y = point.y;

	var cx = center.x;
	var cy = center.y;

	// translate point to origin
	var tempX = x - cx;
	var tempY = y - cy;

	// now apply rotation
	var rotatedX = tempX*Math.cos(theta) - tempY*Math.sin(theta);
	var rotatedY = tempX*Math.sin(theta) + tempY*Math.cos(theta);

	// translate back
	x = rotatedX + cx;
	y = rotatedY + cy;

	point.x = x;
	point.y = y;

	return point;
}