var currentTileset = new Image();
var currentPalette = {};
var currentBackground = new Image();
function preInit() {
	devoutAppend = function(){};
	pk2.dirs.root = "/game_assets/";
	init();
	window.onresize = function () {
		CANVAS_WIDTH = window.innerWidth;
		CANVAS_HEIGHT = window.innerHeight + 64;
		bg_canvas.width = CANVAS_WIDTH;
		bg_canvas.height = CANVAS_HEIGHT;
		camera.width = CANVAS_WIDTH;
		camera.height = CANVAS_HEIGHT;
	};
	loadMapAndCenterOnTile(backgroundMap.path, backgroundMap.x, backgroundMap.y);
}
