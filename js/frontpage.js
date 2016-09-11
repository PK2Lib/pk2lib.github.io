/* «««««««««««««««««««««««««««««««««
   « Scripts for PK2Lib front page »
   »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»» */

// Checking window size
console.log("Window width: " + window.innerWidth + '\n' + "Window height: " + window.innerHeight + "\n" + "Screen width: " + screen.width + '\n' + "Screen height: " + screen.height);


// DOM loaded
$(document).ready(function() {	
	
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


// Canvas stuff
document.getElementsByTagName("body")[0].onLoad = preInit();


