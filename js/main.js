var rez_x = window.innerWidth - 20;
var rez_y = window.innerHeight - 20;

var game = new Phaser.Game(rez_x, rez_y, Phaser.AUTO);

var players_speed = 400;
var default_reset_time = 3;

var obstacle_speed = 1;
var obstacle_rotation_speed = 2;
var obstacle_creation_time = 3; // seconds

var background_scroll_speed = 3;

var text_style = { font: "65px Arial", fill: "#ff0044", align: "center" };

var lose_timeout = 5000 // milliseconds

game.state.add('MenuState', MenuState);
game.state.add('GameState', GameState);
game.state.start('MenuState');