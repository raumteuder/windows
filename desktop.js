var $ = function (val) { return document.querySelector(val) }
var desktop = {
    background: "#123333",
    height: '100%',
    width: '100%',
    backgroundSize: "auto",
    render: function () {
        var desktop = $('body');
        desktop.style.background = this.background;
        desktop.style.backgroundSize = this.backgroundSize;
        desktop.style.height = this.height;
        desktop.style.width = this.width;
    },

    save: function () {
        var model = {
            background: this.background,
            height: this.height,
            width: this.width,
            backgroundSize: this.backgroundSize
        }

        localStorage.setItem('desktop', JSON.stringify(model))
    }
}

desktopBootloader = function () {
    actualData = JSON.parse(localStorage.getItem('desktop'));
    if (!!actualData) {
        desktop.background = actualData.background;
        desktop.height = actualData.height;
        desktop.width = actualData.width;
        desktop.backgroundSize = actualData.backgroundSize;
    }
}

desktopBootloader();
desktop.render();

setInterval(() => {
    desktop.save();
}, 2000);

