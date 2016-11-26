/* JSON Shit */
var episodeDatum1 = '{' +
	'	"id": 0,' +
	'	"date": "2003-01-02",' +
	'	"episodeName": "Rooster Island 1",' +
	'	"downloadLink": [' +
	'		{"linkName": "Version 1.0", "linkURL": "URL1"},' +
	'		{"linkName": "Version 1.2", "linkURL": "URL2"}' +
	'	],' +
	'	"authors": "Janne Kivilahti",' +
	'	"numberOfMaps": 11,' +
	'	"filesize": "228 kB",' +
	'	"description": "The first content of the whole game",' +
	'	"review": "It’s a classic.",' +
	'	"tested": true,' +
	'	"screenshots": [' +
	'		{"imgURL": "http://www.pistegamez.net/PK2/SHOT10.gif"},' +
	'		{"imgURL": "URL2"},' +
	'		{"imgURL": "URL3"}' +
	'	]' +
	'}';
var episodeDatum2 = '{' +
	'	"id": 1,' +
	'	"date": "2004-06-01",' +
	'	"episodeName": "Rooster Island 2",' +
	'	"downloadLink": [' +
	'		{"linkName": "Version 1.0", "linkURL": "URL1"},' +
	'		{"linkName": "Version 1.2", "linkURL": "URL2"}' +
	'	],' +
	'	"authors": "Janne Kivilahti",' +
	'	"numberOfMaps": 13,' +
	'	"filesize": "533 kB",' +
	'	"description": "The second official episode by Janne",' +
	'	"review": "[insert_URL_to_review_here]",' +
	'	"tested": false,' +
	'	"screenshots": [' +
	'		{"imgURL": "URL1"},' +
	'		{"imgURL": "URL2"},' +
	'		{"imgURL": "URL3"}' +
	'	]' +
	'}';

var episodeData = [episodeDatum1, episodeDatum2];



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

	function sectionLinkActivation(sectionID, sectionName) {
		$(".active").delay(300).animate({"height": "0"}, 100, "swing");
		$(".active").removeClass("active");
		$("#" + sectionID).css({"height": "auto"}).delay(400).fadeIn(500, "swing", function() {
			$(this).addClass("active");
			$("#back").fadeIn(300, "swing");
			$("section:not(.active)").css("display", "none");
		});
		$("title").text(sectionName);
	}

	$("#episodeDB-link").click(function(){
		sectionLinkActivation("episodeDB", "Episode Database");
		history.pushState({sectionId: "episodeDB"}, "Episode Database", "./episodeDB/");
	});

	$("#resourceDB-link").click(function(){
		sectionLinkActivation("resourceDB", "Resource Database");
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
		sectionLinkActivation("episodeDB", "Episode Database");
		history.replaceState({sectionId: "episodeDB"}, "Episode Database", "./episodeDB/");
	} else if (window.location.href.indexOf("?p=resourceDB") != -1) {
		sectionLinkActivation("resourceDB", "Resource Database");
		history.replaceState({sectionId: "resourceDB"}, "Resource Database", "./resourceDB/");
	} else {
		$("section:not(.active)").css("display", "none");
	}


	/* Episodes on display */
	for (var i = 0; i < episodeData.length; i++) {
		episodeDatum = JSON.parse(episodeData[i]);

		/* Download links */
		var downloadLinks = "";
		for (var j = 0; j < episodeDatum.downloadLink.length; j++) {
			downloadLinks += "<li>";
			downloadLinks += '<a href="' + episodeDatum.downloadLink[j].linkURL + '">'
				+ episodeDatum.downloadLink[j].linkName +'</a>'
			downloadLinks += "</li>";
		}

		/* Checkbox to indicate whether or not the episode has been tested by us */
		var testedInput = '<span class="';
		if (episodeDatum.tested) {
			testedInput += 'tested">';
			testedInput += "☑";
		} else {
			testedInput += 'untested">';
			testedInput += "☒";
		}
		testedInput += "</span>";

		/* Screenshots */
		var screenshots = "";
		for (var j = 0; j < episodeDatum.screenshots.length; j++) {
			screenshots += '<img alt="shot' + (j + 1) + '"';
			screenshots += ' src="' + episodeDatum.screenshots[j].imgURL + '"';
			screenshots += " />";
		}

		/* Appending the episode block */
		$("#episodeDB").append('<div class="episode" id="' + episodeDatum.id + '">' +
			'<header>' +
			'<h3>' + episodeDatum.episodeName + '</h3>' +
			'<h4>Released ' + episodeDatum.date + '</h4>' +
			'</header>' +
			'<table>' +
			'<tr>' +
			'<td>Download:</td>' +
			'<td>' +
			'<ul>' + downloadLinks + '</ul>' +
			'</td>' +
			'</tr>' +
			'<tr>' +
			'<td>Author(s):</td>' +
			'<td>' + episodeDatum.authors + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>Number of maps:</td>' +
			'<td>' + episodeDatum.numberOfMaps + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>Filesize:</td>' +
			'<td>' + episodeDatum.filesize + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>Author’s description:</td>' +
			'<td>' + episodeDatum.description + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>Our review:</td>' +
			'<td>' + episodeDatum.review + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>Tested: </td>' +
			'<td>' + testedInput + '</td>' +
			'</tr>' +
			'</table>' +
			'<figure>' + screenshots +
			'<figcaption>Screenshots</figcaption>' +
			'</figure>' +
			'<footer>' +
			'<a href="#">⋀</a>' +
			'</footer>' +
			'' +
			'</div>');
	}

	$(".episode footer a").click(function(event){
		event.preventDefault();
		$(this).parents(".episode").each(function(){
			$(this).removeClass("active");
        });
	});

	$(".episode header, .episode figure").click(function(){
		if (!$(this).parent().hasClass("active")) {
            $(this).parent().addClass("active");
		}
	});

});

