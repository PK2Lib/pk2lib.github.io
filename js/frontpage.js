/*********************************
 * Scripts for PK2Lib front page *
 *********************************/

// Checking window size
console.log("Window width: " + window.innerWidth + '\n' + "Window height: " + window.innerHeight + "\n" + "Screen width: " + screen.width + '\n' + "Screen height: " + screen.height);

var backgroundMap = (function(){
	var obj = [
		{path: "rooster island 1/level004.map", x: 79, y: 24}, // rainy forest
		{path: "rooster island 2/level3.map", x: 153, y: 102}, // water cavern
		{path: "rooster island 1/level009.map", x: 91, y: 71}, // forest riddle
		{path: "rooster island 2/level5.map", x: 103, y: 71}   // forest riddle 2
	];
	var random = Math.min(Math.floor(Math.random() * 4), 3);
	return obj[random];
})();

// DOM loaded
$(document).ready(function() {	
	
	// Canvas stuff
	$("body").load(function(){preInit();});

	// fullPage initiation
	if ($(window).width() >= 520 && $(window).height() >= 520) {
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



