var CANVAS_WIDTH = window.innerWidth;
var CANVAS_HEIGHT = window.innerHeight + 64;
var PK2_WIDTH = 640;
var PK2_HEIGHT = 480;
var xpos = 400;
var ypos = 0;

var bg_canvas;
var bgctx;

var IMAGE1 = new Image();
var IMAGE2 = new Image();
var IMAGE3 = new Image();
var IMAGE4 = new Image();
init_images();

function init() {
	bg_canvas = document.getElementById("bg-canvas");
	bgctx = bg_canvas.getContext("2d");
	drawBackgrounds();
}

function init_images() {
	IMAGE1.src = "images/1.png";
	IMAGE2.src = "images/2.png";
	IMAGE3.src = "images/3.png";
	IMAGE4.src = "images/4.png";
}

function drawBackgrounds() {
	for (var i = 0; i < (Math.ceil(CANVAS_WIDTH / PK2_WIDTH)); i++) {
		for (var j = 0; j < (Math.ceil(CANVAS_HEIGHT / PK2_HEIGHT)); j++) {
			bgctx.drawImage(IMAGE4, i * 640, j * 480);
		}
	}
	var clipX = Math.floor((2560 - CANVAS_WIDTH) / 2);
	var clipY = Math.max(Math.floor((960 - CANVAS_HEIGHT) / 2), 0);
	bgctx.drawImage(IMAGE3, clipX, 0, CANVAS_WIDTH, PK2_HEIGHT, 0, 2 * PK2_HEIGHT - clipY, CANVAS_WIDTH, PK2_HEIGHT);
	bgctx.drawImage(IMAGE2, clipX, 0, CANVAS_WIDTH, PK2_HEIGHT, 0, 1 * PK2_HEIGHT - clipY, CANVAS_WIDTH, PK2_HEIGHT);
	bgctx.drawImage(IMAGE1, clipX, clipY, CANVAS_WIDTH, PK2_HEIGHT, 0, 0 * PK2_HEIGHT, CANVAS_WIDTH, PK2_HEIGHT);
}


 function PK2_Sprite(x, y) {
	this.x = x * PK2_Const.TILE_WIDTH;
	this.y = y * PK2_Const.TILE_HEIGHT;
	this.frame = 0;
	this.frameTicker = 0;
	this.data = new PK2_SpriteData();
}

function PK2_SpriteData(){
	this.width = 19;
	this.height = 23;
	this.frameCount = 8;
	this.frameStart_x = 0;
	this.frameStart_y = 0;
	this.frameGap = 1;
	this.frameDelay = 6;
}

PK2_Sprite.prototype.think = function () {
	this.frameTicker += 1;
	if (this.frameTicker >= this.data.frameDelay) {
		this.increaseFrame();
	}
}

PK2_Sprite.prototype.increaseFrame = function () {
	this.frame += 1;
	if(this.frame >= this.data.frameCount){
		this.frame = 0;
	}
}

PK2_Sprite.prototype.draw = function (ctx) {
	ctx.drawImage(APPLE_SPR, (this.data.frameStart_x + this.data.frameGap) * this.frame, this.data.frameStart_y,
			this.data.width, this.data.height, this.x, this.y, CANVAS_WIDTH, CANVAS_HEIGHT);
}
