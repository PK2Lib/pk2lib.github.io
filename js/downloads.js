/* History state shit */
var stateObj = {};

var backgroundMap = (function(){
	var random = Math.round(Math.random());
	if (random == 0) {
		return {path: "rooster island 2/level6.map", x: 138, y: 196}; // castle of clocks
	} else {
		return {path: "rooster island 1/level005.map", x: 69, y: 176}; // castle of towers
	}
})();

$(document).ready(function(){
	//$("a").smoothScroll();
	preInit();

	window.onpopstate = function(event) {
		if (event.state == null) {
			$("#back").click();
		}
	};

	function sectionLinkActivation(sectionID, sectionName, replaceHistoryEntry) {
		if (arguments.length > 2) {
			if (replaceHistoryEntry) {
				history.replaceState(null, sectionName, "./" + sectionID + "/");
			} else {
				history.pushState({}, sectionName, "./" + sectionID + "/");
			}
		}
		$(".active").delay(300).animate({"height": "0"}, 100, "swing");
		$(".active").removeClass("active");
		$("#" + sectionID).css({"height": "auto"}).delay(400).fadeIn(500, "swing", function() {
			$(this).addClass("active");
			$("#back").fadeIn(300, "swing");
			$("section:not(.active)").css("display", "none");
		});
	}

	$("#episodeDB-link").click(function(){
		sectionLinkActivation("episodeDB", "Episode Database", false);
	});

	$("#resourceDB-link").click(function(){
		sectionLinkActivation("resourceDB", "Resource Database", false);
	});

	$("#back").click(function(){
		history.pushState(null, "Downloads", "..");
		$(".active").removeClass("active");
		$(this).fadeOut(300, "swing");
		$("#landing").css({"height": "auto"}).delay(400).fadeIn(500, "swing", function(){
			$(this).addClass("active");
			$("section:not(.active)").css("display", "none");
		});
	});

	/* Landing on the page */
	if (window.location.href.indexOf("?p=episodeDB") != -1) {
		sectionLinkActivation("episodeDB", "Episode Database", true);
	} else if (window.location.href.indexOf("?p=resourceDB") != -1) {
		sectionLinkActivation("resourceDB", "Resource Database", true);
	} else {
		$("section:not(.active)").css("display", "none");
	}
});

