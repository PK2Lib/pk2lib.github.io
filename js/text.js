/*********************************
 * Scripts for PK2Lib text pages *
 *********************************/

$(document).ready(function(){
	// Bird flight time
	function birdFlightTime() {
		$("#bird").css("animation", function(){
			return "birdAnim " + screen.width * 16 + "ms linear 3s infinite";
		});
	}
	$(window).resize(function(){birdFlightTime();});
	birdFlightTime();
	
	// See more buttons
	$("article").each(function(){
		if (!$(this).hasClass("fullcontent")) {
			var id = $(this).children().eq(0).attr("id");
			$(this).prepend('<nav><div class="arrow down"></div> <a href="#' + id + '">[ See more&hellip; ]</a> <div class="arrow down"></div></nav>');
			$(this).append('<nav><div class="arrow up"></div> <a href="#' + id + '">[ See less ]</a> <div class="arrow up"></div></nav>');
		}
	});
	$("article nav:first-child a").each(function(){
		$(this).click(function(){
			$(this).parent().fadeOut(500);
			$(this).parent().parent().css("height", function(){
				var height = 0;
				for (var i = 1; i < $(this).children().length; i++) {
					height += $(this).children().eq(i).outerHeight(true);
				}
				return height + "px";
			});
		$(this).smoothScroll();
		});
	});
	$("article nav:last-child a").each(function(){
		$(this).click(function(){
			$(this).parent().parent().css("height", "32em");
			$(this).parent().siblings().eq(0).fadeIn(800);
		});
		$(this).smoothScroll();
	});

	// Implementing smoothScroll
	$("a").smoothScroll();
	
	// Emails
	/*var email = {decode: function(uri) {return decodeURIComponent(uri);}, list: []};
	email.list[0] = email.decode("%63%72%75%64%65%6C%69%73%2E%64%69%61%62%6F%6C%75%73%40%67%6D%61%69%6C%2E%63%6F%6D");	// TEO
	email.list[1] = email.decode("%72%61%76%6D%61%68%6F%76%40%67%6D%61%69%6C%2E%63%6F%6D");								// Rav Mahov
	email.list[2] = email.decode("%70%69%6F%74%72%2E%77%77%77%77%40%67%6D%61%69%6C%2E%63%6F%6D");						// piotrulos
	email.list[3] = email.decode("%76%654%65%72%6E%69%6B%40%67%6D%61%69%6C%2E%63%6F%6D");								// Sah War
	email.list[4] = email.decode("%6C%73%75%64%6E%79%40%67%6D%61%69%6C%2E%63%6F%6D");									// lsudny
	for (var i = 0; i < email.list.length; i++) {
		$("span.email").eq(i).append('<a href="mailto:' + email.list[i] + '">' + email.list[i] + '</a>');
	}*/
	
	// Figures
	$("figure").each(function(){
		var columns = $(this).data("columns");
		if ($(this).children().eq($(this).children().length - 1)[0].tagName == "FIGCAPTION") {
			for (var i = 0; i < $(this).children().length - 1; i++) {
				$(this).children().eq(i).css("width", "calc(100% / " + columns + " - 0.4rem)");
			}
			$(this).css("height", function(){
				return Math.ceil(($(this).innerWidth() / columns) * ($(this).children().length / columns)) + "px";
			});
		} else {
			$(this).children().each(function(){
				$(this).css("width", "calc(100% / " + columns + " - 0.4rem)");
			});
			$(this).css("height", function(){
				return Math.ceil(($(this).innerWidth() / columns) * ($(this).children().length / columns)) + "px";
			});
		}
	});

	
	// Special tiles 'n' stuff
	function positionSpecialTiles(element, callback) {
		element.each(function(){
			if ($(this).data("right") !== undefined) {
				$(this).css("right", $(this).data("right") * 32 + "px");
			} else if ($(this).data("left") !== undefined) {
				$(this).css("left", $(this).data("left") * 32 + "px");
			}
			$(this).css("bottom", $(this).data("bottom") * 32 + "px");
		});

		if (callback !== undefined) {
			callback();
		}
	}
	
	positionSpecialTiles($("div.waterfall"));
	positionSpecialTiles($("div.water"));
	positionSpecialTiles($("div.exit"), function(){
		$(".exit").click(function(){
			$("audio.exit").trigger("play");
		});
	});
	positionSpecialTiles($("div.blueswitch"));
	$("div.blueswitch").eq(0).click(function(){
		$("audio.switch").trigger("play");
		$(this).animate({"bottom": ($(this).data("bottom") - 1) * 32 + "px"}, 1000, "linear");
		$("div.blueswitch").eq(1).animate({"bottom": ($("div.blueswitch").eq(1).data("bottom") + 1) * 32 + "px"}, 1000, "linear");
		$("div.blueswitch").eq(2).animate({"bottom": ($("div.blueswitch").eq(2).data("bottom") - 1) * 32 + "px"}, 1000, "linear");
		setTimeout(function(){
			$("div.blueswitch").eq(0).animate({"bottom": $("div.blueswitch").eq(0).data("bottom") * 32 + "px"}, 1000, "linear");
			$("div.blueswitch").eq(1).animate({"bottom": $("div.blueswitch").eq(1).data("bottom") * 32 + "px"}, 1000, "linear");
			$("div.blueswitch").eq(2).animate({"bottom": $("div.blueswitch").eq(2).data("bottom") * 32 + "px"}, 1000, "linear");
		}, 30000);
	});
	
	
	// Size of the logo
	(function(){
		var scale = Math.max(0.2, Math.min(1, window.innerHeight / 800));
		$("#page_header h1").css("transform", "scale(" + scale + "," + scale + ")");
	})();


	/* Parallax Scrolling */
	function initiateParallaxScrolling(element) {
		function scrollBackground(element) {
			var yPos = -($(window).scrollTop() / element.data("speed"));
			element.css("background-position", "0 " + yPos + "px");
		}
		element.each(function(){
			scrollBackground($(this));
			var prxbg = $(this);
			$(window).scroll(function() {
				scrollBackground(prxbg);
			});
		});
	}
	
	initiateParallaxScrolling($("#page_header"));

}); // The End

