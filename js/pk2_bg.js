/*
 * Copyright (c) 2016 RavMahov
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */

var pk2LibraryRoot;

try{
    pk2LibraryRoot = pk2CustomLibraryRoot;
} catch(e) {
    if(e.name == "ReferenceError") {
        pk2LibraryRoot = "/js/bg/";
    }
}

require.config({
    baseUrl: pk2LibraryRoot
});


var devout;
var currentTileset;
var currentPalette = {};
var currentBackground = new Image();

require([
    pk2LibraryRoot+"binFile.js",
    pk2LibraryRoot+"binFileWriter.js",
    pk2LibraryRoot+"pk2_images.js",
    pk2LibraryRoot+"pk2_sprites.js",
    pk2LibraryRoot+"pk2_maps.js",
    pk2LibraryRoot+"pk2_common.js",
], preInit);


function preInit() {
    try{
        pk2.dirs.root = pk2assetsroot;
    } catch(e) {
        if(e.name == "ReferenceError") {
            pk2.dirs.root = "/game_assets/";
        }
    }

    init();

    window.onresize = function () {
        CANVAS_WIDTH = window.innerWidth;
        CANVAS_HEIGHT = window.innerHeight + 64;
        bg_canvas.width = CANVAS_WIDTH;
        bg_canvas.height = CANVAS_HEIGHT;
        camera.width = CANVAS_WIDTH;
        camera.height = CANVAS_HEIGHT;
    };

    loadMapAndCenterOnTile(backgroundMap.path, backgroundMap.x, backgroundMap.y);
}

function everythingIsLoadedCallback() {
    console.log("Everything is loaded");
}
