bootLoader() = function () {
    savedBg = JSON.parse(localStorage.getItem('desktop'));
    if (!!savedBg) {
        generateDesktop = new desktop(savedBg);
        generateDesktop._render();
    }
    else {
        generateDesktop = new desktop();
        generateDesktop._render();
    }
}

function ourDesktop(propertyDesktop) {
    this.default = {
        background: "#505050",
        backgroundSize: "auto",
        height: '100vh',
        width: '100%',
    };
    if (!propertyDesktop) {
        propertyDesktop = this.default;
    }
    this.background = propertyDesktop.background;
    this.backgroundSize = propertyDesktop.backgroundSize;
    this.height = propertyDesktop.height;
    this.width = propertyDesktop.width;
    this._render = function () {
        var desktop = $('.desktop');
        desktop.style.background = this.background;
        desktop.style.backgroundSize = this.backgroundSize;
        desktop.style.height = this.height;
        desktop.style.width = this.width;
    };
    this.save = function () {
        var bg = {
            background: this.background,
            height: this.height,
            width: this.width,
            backgroundSize: this.backgroundSize
        }

        localStorage.setItem('desktop', JSON.stringify(bg))
    }
}

var menu = {
    changeBg: function () {
        var fileObject = $('.file');
        fileObject.click();

        fileObject.addEventListener('change', function () {
            var reader = new FileReader();

            reader.addEventListener("load", function () {
                desktop.background = "url(" + reader.result + ")";
                desktop.render();
            }, false);

            if (fileObject.files[0]) {
                reader.readAsDataURL(fileObject.files[0]);
            }
        });
    },

    changeBgSize: function () {
        desktop.backgroundSize = "contain";
        desktop.render();
    },

    changeBgSizeCover: function () {
        desktop.backgroundSize = "cover";
        desktop.render();
    }
}


$('#changeBg').addEventListener('click', menu.changeBg);
$('#bgSizeContain').addEventListener('click', menu.changeBgSize);
$('#bgSizeCover').addEventListener('click', menu.changeBgSizeCover);

var menu = $('.menu');
$('.desktop').addEventListener('contextmenu', function () {
    menu.classList.toggle("hidden");
    menu.style.top = event.clientY - 15 + "px";
    menu.style.left = event.clientX + "px";
})

$('.desktop').addEventListener('click', function () {
    menu.classList.add("hidden");
})