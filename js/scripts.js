$(document).ready(function() {
	/* Canvas stuff */
	/*$("body").append('<canvas id="bg" width="'+window.innerWidth+'" height="'+window.innerHeight+'"></canvas>');
	var canvas = document.getElementById("bg");
	var context = canvas.getContext("2d");

	var im1 = new Image();
	var im2 = new Image();
	var im3 = new Image();
	im1.src = "images/1w.png";
	im2.src = "images/2w.png";
	im3.src = "images/3w.png";

	im1.onload = function() {
		context.drawImage(im1, (window.innerWidth-2560)/2, 0);
	};
	if (window.innerHeight >= 480) {
		im2.onload = function() {
			context.drawImage(im2, (window.innerWidth-2560)/2, 480);
		};		
	}
	if (window.innerHeight >= 2*480) {
		im3.onload = function() {
			context.drawImage(im3, (window.innerWidth-2560)/2, 2*480);
		};		
	}*/
	
	/* Implementing smoothScroll */

	$("a").smoothScroll();

	
	/* Centering Social Widgets */

	$("#social iframe:last-of-type").on("load", function(){
		var social = $("#social > div");
		var socialWidth = 0;
		for (var i = 0; i < social.children().length; i++) {
			socialWidth += social.children().eq(i).outerWidth();
		}
		social.css("width", socialWidth + "px");
		socialWidth = (social.parent().width() - socialWidth)/2;
		if (socialWidth < 0) {
			socialWidth = social.children().eq(0).outerWidth(true);
			social.css("width", socialWidth + "px");
			social.children().css("clear", "left");
			socialWidth = (social.parent().width() - socialWidth)/2;
		}
		var socialMargin = "0 " + socialWidth + "px";
		social.css("margin", socialMargin);
	}).delay(1500);
	
	
	/* Centering Social buttons if need be */
	
	if ($("#sicons").css("position") == "relative") {
		$("#sicons").css("width", function(){
			var width = 0;
			for (var i = 0; i < $(this).children().length; i++) {
				width += $(this).children().eq(i).outerWidth(true);
			}
			return width;
		});
	}
	
	
	/* Widthing footer hr elements */
	
	$("footer > hr").each(function() {
		var width = 0;
		var nav = $("footer > nav").eq(1);
		for (var i = 0; i < nav.children().length; i++) {
			width += nav.children().eq(i).outerWidth(true);
		}
		$(this).css({"width": function() {
			if (width > $(window).width()) {
				return "100%";
			} else {
				return width;
			}
		}, "margin": function() {
			if (width > $(window).width()) {
				return "auto";
			} else {
				width = ($(window).width() - width)/2;
				return "0 " + width + "px";
			}
		}});
	});
	
	
	
	/* Slideshow prototype */
	
	function slide(element) {
		
		this.prev = function() {
			var obj = element.children().eq(0);										// ... with property "obj" which is the soundtrack overflowing container.
			pos = [];															// ... with property "pos" which is a new array.
			for (var i = 0; i < obj.children().length; i++) {				// For every section in obj...
				pos[i] = obj.children().eq(i).position().left;				// ... the x-position of the aforementioned section is stored as an element of pos array.
				pos[i] -= 2 * pos[i];
			}
			if (obj.css("left") == pos[0] + "px") {		// Cases for both when the position of obj is the minimum...
				obj.css("left", pos[pos.length - 1] + "px");
			} else {												// ... and when it is not.
				var item = obj.css("left").substr(0, obj.css("left").length - 2);
				item = pos.indexOf(Number(item)) - 1;
				item = pos[item] + "px";
				obj.css("left", item);
			}
		};
		
		this.next = function() {
			var container = {};														// A new object...
			obj = element.children().eq(0);										// ... with property "obj" which is the soundtrack overflowing container.
			pos = [];															// ... with property "pos" which is a new array.
			for (var i = 0; i < obj.children().length; i++) {				// For every section in obj...
				pos[i] = obj.children().eq(i).position().left;				// ... the x-position of the aforementioned section is stored as an element of pos array.
				pos[i] -= 2 * pos[i];
			}
			if (obj.css("left") == pos[pos.length - 1] + "px") {	// Cases for both when the position of obj is the maximum...
				obj.css("left", pos[0] + "px");
			} else {																// ... and when it is not.
				var item = obj.css("left").substr(0, obj.css("left").length - 2);
				item = pos.indexOf(Number(item)) + 1;
				item = pos[item] + "px";
				obj.css("left", item);
			}
		};
		
		this.arrange = function() {
			element.children().eq(0).children().each(function() {
				$(this).css("width", function() {
					var width = $(window).width() + "px";
					return width;
				});
			});
			element.children().eq(0).css("width", function() {
				var width = 0;
				for (var i = 0; i < element.children().eq(0).children().length; i++) {
					width += element.children().eq(0).children().eq(i).outerWidth(true);
				}
				width = width + "px";
				return width;
			});
			element.css("height", function() {
				return $(this).children().eq(0).css("height");
			});
			element.children().eq(1).click(this.prev);
			element.children().eq(2).click(this.next);
		};
		
	}

	
	/* Soundtrack slides */
	
	var soundtrackSlides = new slide($("#soundtracks")); soundtrackSlides.arrange();
	setInterval(soundtrackSlides.next, 6000);

	
	/* Arrow positioning */
	
	$(".arrow").each(function() {
		$(this).css("margin", function() {
			var height = $(this).parent().height();
			height -= $(this).outerHeight(true);
			height /= 2;
			if ($(this).hasClass("left")) {
				return height + "px 0 " + height + "px 5%";
			} else if ($(this).hasClass("right")) {
				return height + "px 5% " + height + "px 0";
			} else {
				return "auto";
			}
		});
	});
	


	
	
	
	
	
	
	/* * * * * * * * * * * * * */
	/*  Unused functions etc.  */

	
	// Soundtracks floating
	
/*	$("#soundtracks > div").children().each(function() {
		$(this).css("width", function() {
			var width = $(window).width() + "px";
			return width;
		});
	});
	$("#soundtracks > div").css("width", function() {
		var width = 0;
		for (var i = 0; i < $("#soundtracks > div").children().length; i++) {
			width += $("#soundtracks > div").children().eq(i).outerWidth(true);
		}
		width = width + "px";
		return width;
	});
	
	$("#soundtracks").css("height", function() {
		return $(this).children().eq(0).css("height");
	});
/*

	// Soundtrack slides
/*	var soundtrackSlides = (function() {
		var ost = {};														// A new object...
		ost.obj = $("#soundtracks > div");										// ... with property "obj" which is the soundtrack overflowing container.
		ost.width = ost.obj.outerWidth(true);									// ... with property "width" which is the width of "obj".
		ost.pos = [];															// ... with property "pos" which is a new array.
		for (var i = 0; i < ost.obj.children().length; i++) {				// For every section in obj...
			ost.pos[i] = ost.obj.children().eq(i).position().left;				// ... the x-position of the aforementioned section is stored as an element of pos array.
			ost.pos[i] -= 2 * ost.pos[i];
		}

		var returnable = {};
		returnable.prev = function() {
			if (ost.obj.css("left") == ost.pos[0] + "px") {		// Cases for both when the position of obj is the minimum...
				ost.obj.css("left", ost.pos[ost.pos.length - 1] + "px");
			} else {												// ... and when it is not.
				var item = ost.obj.css("left").substr(0, ost.obj.css("left").length - 2);
				item = ost.pos.indexOf(Number(item)) - 1;
				item = ost.pos[item] + "px";
				ost.obj.css("left", item);
			}
		};
		returnable.next = function() {
			if (ost.obj.css("left") == ost.pos[ost.pos.length - 1] + "px") {	// Cases for both when the position of obj is the maximum...
				ost.obj.css("left", ost.pos[0] + "px");
			} else {																// ... and when it is not.
				var item = ost.obj.css("left").substr(0, ost.obj.css("left").length - 2);
				item = ost.pos.indexOf(Number(item)) + 1;
				item = ost.pos[item] + "px";
				ost.obj.css("left", item);
			}
		};
		
		return returnable;
	})();
*/




	/* * * * * * * * * * * * * */
	/*   END document loading  */
});