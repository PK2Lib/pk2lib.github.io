/* «««««««««««««««««««««««««««««««««
   « Scripts for PK2Lib front page »
   »»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»» */

// Checking window size
console.log("Window width: " + window.innerWidth + '\n' + "Window height: " + window.innerHeight + "\n" + "Screen width: " + screen.width + '\n' + "Screen height: " + screen.height);

// DOM loaded
$(document).ready(function() {
	
	$("body").load(function(){
		preInit();
	});
	
	
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
/*	(function() {
		var pekka = {};
		pekka.element = $("#welcome img.wobbly").eq(0);
		pekka.src = pekka.element.attr("src");
		for (var i = 0; i < 20; i++) {
			pekka.element.before('<div class="wobbly"></div>');
		}
		pekka.div = $(".wobbly");
		pekka.div.eq(0).css("width", "130px");
		pekka.div.eq(1).css("width", "144px");
		pekka.div.eq(2).css("width", "153px");
		pekka.div.eq(3).css("width", "156px");
		pekka.div.eq(4).css("width", "155px");
		pekka.div.eq(5).css("width", "147px");
		pekka.div.eq(6).css("width", "138px");
		pekka.div.eq(7).css("width", "122px");
		pekka.div.eq(8).css("width", "144px");
		pekka.div.eq(9).css("width", "146px");
		pekka.div.eq(10).css("width", "146px");
		pekka.div.eq(11).css("width", "102px");
		pekka.div.eq(12).css("width", "103px");
		pekka.div.eq(13).css("width", "116px");
		pekka.div.eq(14).css("width", "119px");
		pekka.div.eq(15).css("width", "121px");
		pekka.div.eq(16).css("width", "120px");
		pekka.div.eq(17).css("width", "111px");
		pekka.div.eq(18).css("width", "136px");
		pekka.div.eq(19).css("width", "109px");
		pekka.div.css("background-image", "url(" + pekka.src + ")");
		for (var i = 0; i < 20; i++) {
			pekka.div.eq(i).css("background-position", function() {
				var height = 0;
				height += i * 16;
				return "right -" + height + "px";
			});
		}
		pekka.element.remove();
	})();*/
	
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
