var MenuState = {
	preload: function(){
		this.load.image('background', 'assets/images/background2.jpg');
		this.load.image('button', 'assets/images/button.png');

	},
	create: function(){
		this.background = this.game.add.tileSprite(0, 0, 0, 0, 'background');
		this.background.width = this.game.width;
		this.background.height = this.game.height;
		this.background.tileScale.set(0.6, 0.6);

		var title = game.add.text(game.world.centerX, game.world.centerY-260, "Middle Winner", {
			font: "50px Arial",
			fill: "#fff",
			align: "center"
		})
		title.anchor.setTo(0.5, 0.5);

		this.createButton("Compete", game.world.centerX, game.world.centerY-32, 200, 100, function(){
			game_mode = 1;
			this.game.state.start('GameState');
		})

		this.createButton("CO-OP", game.world.centerX, game.world.centerY+96, 200, 100, function(){
			game_mode = 2;
			this.game.state.start('GameState');
		})
	},

	createButton: function(title, x, y, width, height, callback){
		var button = this.game.add.button(x, y, 'button', callback, this, 2, 1, 0);

		button.anchor.setTo(0.5, 0.5);
		button.width = width;
		button.height = height;

		var text = game.add.text(button.x , button.y, title, {
			font: "25px Arial",
			fill: "#fff",
			align: "center"
		})
		text.anchor.setTo(0.5, 0.5);
	}
};
