var backgroundMap = (function(){
	var random = Math.round(Math.random());
	if (random == 0) {
		return {path: "rooster island 2/level6.map", x: 138, y: 196}; // castle of clocks
	} else {
		return {path: "rooster island 1/level005.map", x: 69, y: 176}; // castle of towers
	}
})();

IMG_BACKGROUND.src = "/images/CASTLE.png";

$(document).ready(function(){
	$("a").smoothScroll();
	preInit();
});
