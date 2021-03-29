var shovelBlocks = ['grass_block', 'dirt', 'gravel', 'sand', 'clay'];

var replaceBlocks = ['lava', 'water', 'air'];

var placeBlock = function (x, y, z) {
	if (
		!player.pick(function (itemNbt) {
			return (
				itemNbt.id === 'minecraft:cobblestone' ||
				itemNbt.id === 'minecraft:stone' ||
				itemNbt.id === 'minecraft:dirt'
			);
		})
	) {
		print('No Stone or Cobblestone in your inventory!');
		throw new Error();
	}

	if (player.rightClick(x - 1, y, z, 'east')) return true;
	if (player.rightClick(x + 1, y, z, 'west')) return true;
	if (player.rightClick(x, y, z - 1, 'south')) return true;
	if (player.rightClick(x, y, z + 1, 'north')) return true;
	if (player.rightClick(x, y - 1, z, 'up')) return true;
	if (player.rightClick(x, y + 1, z, 'down')) return true;
	return false;
};

var fillLiquid = function (y) {
	for (var x = -1; x <= 1; x++) {
		for (var z = -1; z <= 1; z++) {
			if (
				replaceBlocks.indexOf(
					world.getBlock(
						Math.floor(player.x) + x,
						y,
						Math.floor(player.z) + z
					)
				) != -1
			) {
				placeBlock(
					Math.floor(player.x) + x,
					y,
					Math.floor(player.z) + z
				);
			}
		}
	}
};

var pickTool = function (block) {
	player.pick(function (nbt) {
		return shovelBlocks.indexOf(block) !== -1
			? nbt.id.endsWith('_shovel')
			: nbt.id.endsWith('_pickaxe');
	});
};

var run = function () {
	// try {
	var xC = Math.floor(player.x);
	var yC = Math.floor(player.y);
	var zC = Math.floor(player.z);

	var minX = Math.floor(xC / 16) * 16;
	var minZ = Math.floor(zC / 16) * 16;
	var maxX = minX + 16;
	var maxZ = minZ + 16;

	print(
		'Min X: ' +
			minX +
			' Min Z: ' +
			minZ +
			'\nMax X: ' +
			maxX +
			' Max Z: ' +
			maxZ
	);

	var y = yC - 1;
	while (y > 5) {
		try {
			for (var zM = minZ; zM < maxZ; zM++) {
				player.pathTo(minX, y + 1, zM + 0.5);
				while (world.getBlock(minX, y, zM) != 'air') {
					pickTool(world.getBlock(minX, y, zM));
					player.longMineBlock(minX, y, zM);
				}

				for (var xM = minX + 1; xM < maxX; xM++) {
					while (world.getBlock(xM, y, zM) != 'air') {
						pickTool(world.getBlock(xM, y, zM));
						player.longMineBlock(xM, y, zM);
						fillLiquid(y - 1);
					}
					player.pathTo(xM, y, zM + 0.5);
				}
				fillLiquid(y - 1);
			}

			print('§lCleaning up!');

			for (var zM = minZ; zM < maxZ; zM++) {
				for (var xM = minX + 1; xM < maxX; xM++) {
					while (world.getBlock(xM, y, zM) != 'air') {
						player.pathTo(xM, y + 1, zM + 0.5);
						pickTool(world.getBlock(xM, y, zM));
						player.longMineBlock(xM, y, zM);
					}
				}
			}
			y--;
		} catch {
			mainThread.kill();
		}
	}
	print('§lDone!');
};

var mainThread = Thread.current;

// new Thread(move1).run();
run();

// while (true) tick(); // keep running until killed
