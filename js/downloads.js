var backgroundMap = (function(){
	var random = Math.round(Math.random());
	if (random == 0) {
		return {path: "rooster island 2/level6.map", x: 138, y: 196}; // castle of clocks
	} else {
		return {path: "rooster island 1/level005.map", x: 69, y: 176}; // castle of towers
	}
})();

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

(function (x) {return 2*x;})(3);