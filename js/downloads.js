// Background

var pk2assetsroot = "../game_assets/";
var pk2CustomLibraryRoot = "https://v6p9d9t4.ssl.hwcdn.net/html/420707/";

var backgroundMap = (function(){
    var random = Math.round(Math.random());
    if (random == 0) {
        return {path: "rooster island 2/level6.map", x: 130, y: 196}; // castle of clocks
    } else {
        return {path: "rooster island 1/level005.map", x: 73, y: 204}; // castle of towers
    }
})();

$(document).ready(function(){
    //$("a").smoothScroll();

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
        $("section.active").delay(300).animate({"height": "0"}, 100, "swing");
        $("section.active").removeClass("active");
        $("#" + sectionID).css({"height": "auto"}).delay(400).fadeIn(500, "swing", function() {
            $(this).addClass("active");
            $("#back").fadeIn(300, "swing");
            $("section:not(.active)").css("display", "none");
        });
        $("title").text(sectionName + " &mdash; The Pekka Kana 2 Library");
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
        $("title").text("Downloads &mdash; The Pekka Kana 2 Library");
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
    jQuery.getJSON("episodeDB/test.json", function(episodeData) {
        for (var i = 0; i < episodeData.length; i++) {
            episodeDatum = episodeData[i];

            /* Authors */
            var authors = "";
            for (var j = 0; j < episodeDatum.authors.length; j++) {
                var author = episodeDatum.authors[j];
                if (author.url === null) {
                    authors += author.name;
                } else {
                    authors += '<a href="' + author.url + '" target="_blank">' + author.name + '</a>';
                }

                if (j !== episodeDatum.authors.length - 1) {
                    authors += ", ";
                }
            }

            /* Download links */
            var downloadLinks = "";
            for (var j = 0; j < episodeDatum.downloadLink.length; j++) {
                var filename = "";
                if (episodeDatum.downloadLink[j].linkURL.indexOf("/") != -1) {
                    filename = episodeDatum.downloadLink[j].linkURL.slice(episodeDatum.downloadLink[j].lastIndexOf("/"));
                } else {
                    filename = episodeDatum.downloadLink[j].linkURL;
                }

                downloadLinks += "<li>";
                downloadLinks += '<a href="' + episodeDatum.downloadLink[j].linkURL
                    + '" download="' + filename + '">'
                    + episodeDatum.downloadLink[j].linkName +'</a>'
                downloadLinks += "</li>";
            }

            /* Review link */
            var review = "";
            if (!episodeDatum.review) {
                review += 'None yet.';
            } else {
                review = '<a href="' + episodeDatum.review.reviewURL + '">' + episodeDatum.review.text + '</a>';
            }

            /* Checkbox to indicate whether or not the episode has been tested by us */
            var testedInput = '<span class="';
            if (episodeDatum.tested) {
                testedInput += 'tested" title="This episode has been tested by PK2Lib!">';
                testedInput += "☑";
            } else {
                testedInput += 'untested" title="Unfortunately, this episode has not been tested by us yet.">';
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
                '<h4>Released ' + new Date(episodeDatum.date).toLocaleDateString() + '</h4>' +
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
                '<td>' + authors + '</td>' +
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
                '<td>' + review + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Tested: </td>' +
                '<td>' + testedInput + '</td>' +
                '</tr>' +
                '</table>' +
                '<figure>' +
                '<figcaption>Screenshots</figcaption>' + screenshots +
                '</figure>' +
                '<footer>' +
                '<a href="#">⋀</a>' +
                '</footer>' +
                '' +
                '</div>');
        }

        $(".episode").each(function() {
            cycleScreenshots($(this));
        });

        $(".episode footer a").click(function(event){
            event.preventDefault();
            $(this).parents(".episode").each(function(){
                $(this).removeClass("active");
            });
        });

        $(".episode header, .episode figure").on("click", function(){
            if (!$(this).parent().hasClass("active")) {
                $(this).parent().addClass("active");
            }
        });
    });


    function cycleScreenshots(element) {
        var length = element.children("figure").eq(0).children("img").length;

        element.children("figure").eq(0).children("img").each(function(index){
            var t = $(this);
            setTimeout(function() {
                t.parent().children("img").removeClass("active");
                t.addClass("active");
                setInterval(function() {
                    t.parent().children("img").removeClass("active");
                    t.addClass("active");
                }, 6000 * length);
            }, 6000 * index);
        });
    }

});
