/*********************************
 * Scripts for PK2Lib front page *
 *********************************/

// Checking window size
console.log("Window width: " + window.innerWidth + '\n' + "Window height: " + window.innerHeight + "\n" + "Screen width: " + screen.width + '\n' + "Screen height: " + screen.height);



// Background
var pk2assetsroot = "./game_assets/";
var pk2CustomLibraryRoot = "https://v6p9d9t4.ssl.hwcdn.net/html/420707/";
var backgroundMap = (function(){
	var obj = [
		{path: "rooster island 1/level004.map", x: 79, y: 24}, // rainy forest
		{path: "rooster island 2/level3.map", x: 146, y: 116}, // water cavern
		{path: "rooster island 1/level009.map", x: 91, y: 71}, // forest riddle
		{path: "rooster island 2/level5.map", x: 103, y: 71}   // forest riddle 2
	];
	var random = Math.min(Math.floor(Math.random() * 4), 3);
	return obj[random];
})();



// DOM loaded
$(document).ready(function() {	
	

	// fullPage initiation
	if (($(window).width() >= 640 && $(window).height() >= 640) || $(window).width() > $(window).height()) {
		$('#fullpage').fullpage({
			scrollingSpeed: 500,
			paddingBottom: '2rem',
			paddingTop: '1rem',
			navigation: true,
			navigationPosition: 'right',
			slidesNavigation: true
		});
	} else {
		$("img[src='#'], iframe").each(function(){
			$(this).attr("src", $(this).attr("data-src"));
		});
	}

	// Welcome Pekka Image
	curvifyAnImage("#welcome img.wobbly:first-of-type", -1, "right", "wobbly", false);

	
	// Bird flight time
	function birdFlightTime() {
		$("#bird").css("transition-duration", function(){
			return screen.width * 16 + "ms";
		});
	}
	$(window).resize(function(){birdFlightTime();});
	birdFlightTime();

	
	// Forum Link
	$("#forum").click(function(){
		$(this).next().children().eq(0).trigger("click");
	});
	

}); // END



