/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * This is the "Diabolic Image Preview" plugin           *
 * by Crudelis Diabolus (http://crudelisdiabolus.com/).  *
 * jQuery is needed for this plugin to work.             *
 * (C) 2016 Crudelis Diabolus. :)                        *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
$(document).ready(function() {
	$("figure img").each(function(){

		var img = $(this);

		$(this).click(function(){

			var src = $(this).attr("src");

			$("body").append(
				'<div class="imgview">' +
				'<div class="arrow left"></div>' +
				'<img src="' + src + '" alt="Image" />' +
				'<a class="dismiss">⊗</a>' +
				'<div class="arrow right"></div>' +
				'</div>');

			$(".imgview").fadeIn(200, "linear");

			$(".imgview img").css("margin", function(){
				var margin = window.innerHeight - $(this).innerHeight();
				margin /= 2;
				margin = margin + "px " + "auto";
				return margin;
			}).mouseover(function(){
				$(this).parent().addClass("imghover");
			}).mouseout(function(){
				$(this).parent().removeClass("imghover");
			});

			$(".imgview .dismiss").delay(500).each(function(){
				$(this).click(function(){
					$(this).parent().fadeOut(300, "linear", function(){$(this).delay(100).remove();});
				});
				$(this).parent().click(function(){
					if (!$(this).hasClass("imghover")) {
						$(this).fadeOut(300, "linear", function(){$(this).delay(100).remove();});
					}
				});
			});
			$(".imgview .arrow").each(function(){
				if ($(this).hasClass("left")) {
					$(this).click(function(){
						$(".imgview img").fadeOut(100, "linear", function(){
							$(this).attr("src", function(){
								if (img.prevAll().length != 0) {
									$(this).attr("src", img.prev().attr("src"));
									img = img.prev();
								} else {
									$(this).attr("src", img.siblings().eq(img.siblings().length - 1).attr("src"));
									img = img.siblings().eq(img.siblings().length - 1);
								}
								$(this).fadeIn(200, "linear");
							});
						});
					});
				} else if ($(this).hasClass("right")) {
					$(this).click(function(){
						$(".imgview img").fadeOut(100, "linear", function(){
							$(this).attr("src", function(){
								if (img.nextAll().length != 0) {
									$(this).attr("src", img.next().attr("src"));
									img = img.next();
								} else {
									$(this).attr("src", img.siblings().eq(0).attr("src"));
									img = img.siblings().eq(0);
								}
								$(this).fadeIn(200, "linear");
							});
						});
					});
				}
			}).mouseover(function(){
				$(this).parent().addClass("imghover");
			}).mouseout(function(){
				$(this).parent().removeClass("imghover");
			});
		});
	});
});
