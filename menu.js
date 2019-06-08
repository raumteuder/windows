var $ = function (val) { return document.querySelector(val) }

var menu = {

    previewUpload: function () {

        var file = $("input[type=file]").files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            Object.assign(document.querySelector(".desktop").style, {
                background: "url(" + reader.result + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                // backgroundSize: "cover",
            });
            console.log(reader.result)
            desktop.background = "url(" + reader.result + ")";
            desktop.render();
            // localStorage.setItem("bground", reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
        $(".desktop").style.background = "url(" + reader.result + ")";

    },
    changeBg: function () {
        $(".menu-item").addEventListener("click", function () {
            $("#fileToUpload").click();
        });
        this.previewUpload;

    },
    bgSizeContain: function () {
        desktop.backgroundSize = "contain";
        desktop.render();
    },

    bgSizeCover: function () {
        desktop.backgroundSize = "cover";
        desktop.render();
    }
}


$('#changeWall').addEventListener('click', menu.changeBg);
$('#toContain').addEventListener('click', menu.bgSizeContain);
$('#toCover').addEventListener('click', menu.bgSizeCover);
$('#fileToUpload').onchange = menu.previewUpload;

var menu = $('.menu');
var menuDisplayed = false;
var menuBox = null;


window.addEventListener("contextmenu",
    function () {
        console.log(arguments[0]);
        var left = arguments[0].clientX;
        var top = arguments[0].clientY;
        menuBox = document.querySelector(".menu");
        menuBox.style.left = left + "px";
        menuBox.style.top = top + "px";
        menuBox.style.display = "block";
        arguments[0].preventDefault();
        menuDisplayed = true;
    },
    false
);

window.addEventListener(
    "click",
    function () {
        if (menuDisplayed == true) {
            menuBox.style.display = "none";
        }
    },
    true
);


// $('.windows').addEventListener("contextmenu", function (e) {
//     console.log(e);
//     e.preventDefault();
//     e.stopPropagation();
// })
// $('.desktop').addEventListener('contextmenu', function () {
//     menu.classList.toggle("hidden");
//     menu.style.top = event.clientY - 15 + "px";
//     menu.style.left = event.clientX + "px";
// })

// $('.desktop').addEventListener('click', function () {
//     menu.classList.add("hidden");
// })
