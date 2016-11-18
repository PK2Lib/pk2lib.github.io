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
		if (event.state == null || event.state.sectionId == "downloads") {
			goBack($("#back"));
		} else if (event.state.sectionId == "episodeDB") {
			sectionLinkActivation("episodeDB");
		} else if (event.state.sectionId == "resourceDB") {
			sectionLinkActivation("resourceDB");
		}
	};

	function sectionLinkActivation(sectionID) {
		$(".active").delay(300).animate({"height": "0"}, 100, "swing");
		$(".active").removeClass("active");
		$("#" + sectionID).css({"height": "auto"}).delay(400).fadeIn(500, "swing", function() {
			$(this).addClass("active");
			$("#back").fadeIn(300, "swing");
			$("section:not(.active)").css("display", "none");
		});
	}

	$("#episodeDB-link").click(function(){
		sectionLinkActivation("episodeDB");
		history.pushState({sectionId: "episodeDB"}, "Episode Database", "./episodeDB/");
	});

	$("#resourceDB-link").click(function(){
		sectionLinkActivation("resourceDB");
		history.pushState({sectionId: "resourceDB"}, "Resource Database", "./resourceDB/");
	});

	function goBack(element) {
		$(".active").removeClass("active");
		element.fadeOut(300, "swing");
		$("#landing").css({"height": "auto"}).delay(400).fadeIn(500, "swing", function(){
			$(this).addClass("active");
			$("section:not(.active)").css("display", "none");
		});
	}

	$("#back").click(function(){
		history.pushState({sectionId: "downloads"}, "Downloads", "..");
		goBack($(this));
	});

	/* Landing on the page */
	if (window.location.href.indexOf("?p=episodeDB") != -1) {
		sectionLinkActivation("episodeDB");
		history.replaceState({sectionId: "episodeDB"}, "Episode Database", "./episodeDB/");
	} else if (window.location.href.indexOf("?p=resourceDB") != -1) {
		sectionLinkActivation("resourceDB");
		history.replaceState({sectionId: "resourceDB"}, "Resource Database", "./resourceDB/");
	} else {
		$("section:not(.active)").css("display", "none");
	}
});

