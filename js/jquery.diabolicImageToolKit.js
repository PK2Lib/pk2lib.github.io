/* * * * * * * * * * * * * * * * * * * * * * *
 * This is a toolkit for image manipulation, *
 * written by Crudelis Diabolus              *
 * (http://crudelisdiabolus.com/).           *
 * (C) 2016 Crudelis Diabolus. :)            *
 * * * * * * * * * * * * * * * * * * * * * * */

/* Returns a 3d array of numbers between 0 and 255, inclusive. If the array is called pixels, then in pixels[x][y] there is an array of the rgba color components of the exact pixel that is in coordinates (x,y) in the original image. So, for instance, pixels[3][5][0] is the red component of the rgba color in the pixel in (3,5). */
function getPixelsOfAnImage(imageObj) {
	var pixels = [];
	
	var width = imageObj.naturalWidth;
	var height = imageObj.naturalHeight;

	var canvas = document.createElement("canvas");
//	document.getElementsByTagName("body")[0].appendChild(canvas);
	canvas.setAttribute("width", width);
	canvas.setAttribute("height", height);
	var context = canvas.getContext("2d");
	context.drawImage(imageObj, 0, 0);
	var imageData = context.getImageData(0, 0, width, height);
	
	for (var x = 0; x < width; x++) {
		pixels[x] = [];
		for (var y = 0; y < height; y++) {
			var r = imageData.data[( (y * (imageData.width * 4)) + (x * 4)) + 0];
			var g = imageData.data[( (y * (imageData.width * 4)) + (x * 4)) + 1];
			var b = imageData.data[( (y * (imageData.width * 4)) + (x * 4)) + 2];
			var a = imageData.data[( (y * (imageData.width * 4)) + (x * 4)) + 3];
			pixels[x][y] = [r,g,b,a];
		}
	}
	
	canvas.remove();
	return pixels;
}


function curvifyAnImage(jQuerySelector, maxWidth, alignment, yourClassName, removeOriginal, callback) {	// jQuerySelector is a string, i.e. "#id" or ".class" or "tag" (the selector needs to identify the element, so you need to use selectors like "div:nth-of-type(3)"); maxWidth is a double between 0 and 1, inclusive, and is multiplied by the width of the parent of the image to determine the maximum width of the sliced image; if you want to use the original image width, give -1 as maxWidth; alignment should be either "left" or "right"; yourClassName is the name of the class you want to give to the sliced image parts; removeOriginal is a boolean and states whether you want the original image deleted after the function has completed or just hidden; callback is a callback function
	var img = $(jQuerySelector)[0];
	var imgURL = img.src;

	img.onload = function() {
		var width = img.naturalWidth;
		var height = img.naturalHeight;
		var aspectRatio = width / height;
		maxWidth = (function() {
			if (maxWidth == -1) {
				maxWidth = width;
			} else {
				maxWidth = $(jQuerySelector).parent().innerWidth() * maxWidth;
			}
			return maxWidth;
		})();
		maxWidth = Math.round(maxWidth);
		var maxHeight = Math.round(maxWidth / aspectRatio);
		
		if (maxWidth != width) {
			var canvas = document.createElement("canvas");
//			document.getElementsByTagName("body")[0].appendChild(canvas);
			canvas.setAttribute("width", maxWidth);
			canvas.setAttribute("height", maxHeight);
			var context = canvas.getContext("2d");
			context.drawImage(img, 0, 0, maxWidth, maxHeight);
			img = new Image();
			img.src = canvas.toDataURL();
//			$(jQuerySelector)[0].parentElement.insertBefore(img, $(jQuerySelector)[0]);
			canvas.remove();
			img.style = $(jQuerySelector)[0].style;
			img.onload = function(){doTheRest()};
		} else {
			doTheRest();
		}

		function doTheRest()  {
			var pixels = getPixelsOfAnImage(img);
			var rowWidths = [];
			for (var i = 0; i < maxHeight; i++) {
				rowWidths[i] = 0;
				for (var j = 0; j < maxWidth; j++) {
					if (alignment == "left") {
						if (pixels[maxWidth-1 - j][i][3] != 0) {
							rowWidths[i] = maxWidth-1 - j;
							break;
						}
					} else if (alignment == "right") {
						if (pixels[j][i][3] != 0) {
							rowWidths[i] = maxWidth - j - 1;
							break;
						}
					}
				}
			}

			for (var i = 0; i < rowWidths.length; i++) {
				$(jQuerySelector).before('<div class="' + yourClassName + '" style="' +
					'float: ' + alignment + '; clear: ' + alignment + '; ' +
					'background-image: url('+ imgURL +'); ' +
					'width: 0; ' +
					'height: 1px; ' +
					'background-position: ' + alignment + ' -' + i + 'px; ' +
					'background-size: ' + maxWidth + 'px auto; background-repeat: no-repeat; opacity: 0;"></div>');
			}
			img.remove();
			if (removeOriginal) {
				$(jQuerySelector)[0].remove();
			} else {
				$(jQuerySelector).css("display", "none");
			}

			for (var i = 0; i < rowWidths.length; i++) {
				if (rowWidths[i] == 0) {
					$("." + yourClassName).eq(i).css("display", "none");
					continue;
				}
				$("." + yourClassName).eq(i).animate({"width": rowWidths[i] + "px"}, 100, "linear", function(){
					$(this).delay(300).animate({"opacity": 1}, 200, "swing");
				});
			}

			if (callback != undefined) {
				callback();
			}
		}
	};
}

