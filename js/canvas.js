var currentTileset = new Image();
var currentPalette = {};
var currentBackground = new Image();
function preInit() {
	devoutAppend = function(){};
	init();
	pk2.dirs.root = "//dl.dropboxusercontent.com/u/158776840/vanilla_assets/";
	window.onresize = function () {
		CANVAS_WIDTH = window.innerWidth;
		CANVAS_HEIGHT = window.innerHeight + 64;
		bg_canvas.width = CANVAS_WIDTH;
		bg_canvas.height = CANVAS_HEIGHT;
		camera.width = CANVAS_WIDTH;
		camera.height = CANVAS_HEIGHT;
	};
	loadMapAndCenterOnTile("rooster island 1/level004.map", 79, 24);
}
