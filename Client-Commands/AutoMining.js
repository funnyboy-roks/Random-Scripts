// It's a sin to make me use this disgusting `var` keyword and lambda function syntax
var moveNorth = function () {
	player.moveTo(player.x, player.z - 1);
};

var move1 = function () {
	while (true) {
		player.longMineBlock(
			Math.floor(player.x),
			player.y + 1,
			Math.floor(player.z) - 1
		);
		player.longMineBlock(
			Math.floor(player.x),
			player.y + 2,
			Math.floor(player.z) - 1
		);
		player.longMineBlock(
			Math.floor(player.x),
			player.y,
			Math.floor(player.z) - 1
		);
		moveNorth();
	}
};

var mainThread = Thread.current;

new Thread(move1).run();

while (true) tick(); // keep running until killed

// move1();
