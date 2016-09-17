var backgroundMap = {path: "rooster island 2/level12.map", x: 72, y: 194}; // factory 1

IMAGE1.src = "/images/1.png";
IMAGE2.src = "/images/2.png";
IMAGE3.src = "/images/3.png";
IMAGE4.src = "/images/FACTORY3.png";
APPLE_SPR.src = "/images/apple_sprite.png";
pk2.images.SPR_BONS.src = "/images/SPR_BONS.png";

$(document).ready(function(){
	document.body.onLoad = preInit();
	$("a").smoothScroll();
});
