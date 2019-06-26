var pk2assetsroot = "../game_assets/";
var pk2CustomLibraryRoot = "https://v6p9d9t4.ssl.hwcdn.net/html/420707/";
var backgroundMap = {path: "rooster island 2/level12.map", x: 72, y: 194}; // factory 1

function toggleMinipage(id, open) {
    var fn = null;
    if (open) {
        fn = (function(event) {
            if (typeof event !== "undefined") event.preventDefault();
            var el = document.getElementById(id);
            el.classList.add("active");
            setTimeout(function(){
                el.classList.add("visible");
            }, 10);
            if (!el.hasBeenVisited) {
                el.hasBeenVisited = true;
                loadLazy(el);
            }
        });
    } else {
        fn = (function(event) {
            if (typeof event !== "undefined") event.preventDefault();
            document.getElementById(id).classList.remove("visible");
            setTimeout(function(){
                document.getElementById(id).classList.remove("active");
            }, 500);
        });
    }
    return fn;
}

$(document).ready(function(){

    let minipages = document.querySelectorAll("section");
    for (let i = 0; i < minipages.length; i++) {
        minipages[i].hasBeenVisited = false;
        let a = document.createElement("a");
        a.classList.add("back-link");
        a.appendChild(document.createTextNode("Back"));
        a.setAttribute("href", "#");
        minipages[i].appendChild(a);
        a.onclick = toggleMinipage(minipages[i].id, false);
        document.getElementById(minipages[i].id + "-link").onclick = toggleMinipage(minipages[i].id, open);
    }

});
