/*********************************
 * Scripts for PK2Lib text pages *
 *********************************/

$(document).ready(function () {
    // Bird flight time
    function birdFlightTime() {
        $("#bird").css("animation", function () {
            return "birdAnim " + screen.width * 16 + "ms linear 3s infinite";
        });
    }

    $(window).resize(function () {
        birdFlightTime();
    });
    birdFlightTime();

    // See more buttons
    $("article").each(function () {
        if (!$(this).hasClass("fullcontent")) {
            var id = $(this).children().eq(0).attr("id");
            $(this).prepend('<nav><div class="arrow down"></div> <a href="#' + id + '">[ See more&hellip; ]</a> <div class="arrow down"></div></nav>');
            $(this).append('<nav><div class="arrow up"></div> <a href="#' + id + '">[ See less ]</a> <div class="arrow up"></div></nav>');
        }
    });
    $("article nav:first-child a").each(function () {
        $(this).click(function () {
            $(this).parent().fadeOut(500);
            var t = $(this).parent().parent();
            t.css("height", function () {
                var height = 0;
                for (var i = 1; i < $(this).children().length; i++) {
                    height += $(this).children().eq(i).outerHeight(true);
                }
                return height + "px";
            });
            setTimeout(function () {
                t.css("height", "auto");
            }, 1000);
            $(this).smoothScroll();
        });
    });
    $("article nav:last-child a").each(function () {
        $(this).click(function () {
            var t = $(this).parent().parent();
            t.css("height", function(){
                var height = 0;
                for (var i = 0; i < $(this).children().length; i++) {
                    height += $(this).children().eq(i).outerHeight(true);
                }
                return height + "px";
            });
            setTimeout(function(){
                t.css("height", "32em");
            }, 10);
            $(this).parent().siblings().eq(0).fadeIn(800);
        });
        $(this).smoothScroll();
    });

    // Implementing smoothScroll
    $("a").smoothScroll();

    // Figures
    $("figure").each(function () {
        var columns = $(this).data("columns");
        if ($(this).children().eq($(this).children().length - 1)[0].tagName == "FIGCAPTION") {
            for (var i = 0; i < $(this).children().length - 1; i++) {
                $(this).children().eq(i).css("width", "calc(100% / " + columns + " - 0.4rem)");
            }
        } else {
            $(this).children().each(function () {
                $(this).css("width", "calc(100% / " + columns + " - 0.4rem)");
            });
        }
    });


    // Special tiles 'n' stuff
    function positionSpecialTiles(element, callback) {
        element.each(function () {
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
    positionSpecialTiles($("div.exit"), function () {
        $(".exit").click(function () {
            $("audio.exit").trigger("play");
        });
    });
    positionSpecialTiles($("div.blueswitch"));
    $("div.blueswitch").eq(0).click(function () {
        $("audio.switch").trigger("play");
        $(this).animate({"bottom": ($(this).data("bottom") - 1) * 32 + "px"}, 1000, "linear");
        $("div.blueswitch").eq(1).animate({"bottom": ($("div.blueswitch").eq(1).data("bottom") + 1) * 32 + "px"}, 1000, "linear");
        $("div.blueswitch").eq(2).animate({"bottom": ($("div.blueswitch").eq(2).data("bottom") - 1) * 32 + "px"}, 1000, "linear");
        setTimeout(function () {
            $("div.blueswitch").eq(0).animate({"bottom": $("div.blueswitch").eq(0).data("bottom") * 32 + "px"}, 1000, "linear");
            $("div.blueswitch").eq(1).animate({"bottom": $("div.blueswitch").eq(1).data("bottom") * 32 + "px"}, 1000, "linear");
            $("div.blueswitch").eq(2).animate({"bottom": $("div.blueswitch").eq(2).data("bottom") * 32 + "px"}, 1000, "linear");
        }, 30000);
    });


    // Size of the logo
    (function () {
        var scale = Math.max(0.2, Math.min(1, window.innerHeight / 800));
        $("#page_header h1").css("transform", "scale(" + scale + "," + scale + ")");
    })();


    /* Parallax Scrolling */
    (function(element) {
        function scrollBackground(element) {
            var yPos = -($(window).scrollTop() / element.data("speed"));
            element.css("background-position", "0 " + yPos + "px");
        }

        element.each(function () {
            scrollBackground($(this));
            var prxbg = $(this);
            $(window).scroll(function () {
                scrollBackground(prxbg);
            });
        });
    })($("#page_header"));


    /* Site URL */
    (function () {
        $("#this").empty().append(window.location.hostname);                       // for non-root paths
        $("a#this").attr("href", "http://" + window.location.hostname);
        var url1 = "http://validator.w3.org/check?uri=" + window.location.href;    // W3C HTML validator link
        $("#validhtml").attr("href", url1);
    })();


    /* Initialize diabolicImagePreview */
    initDiabolicImagePreview();

}); // The End

