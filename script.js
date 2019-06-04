objects = [];
// var dragManager;
var elemnt;
function dragMouseDown(e) {
    e = e || window.event;
    elemnt = this;
    e.preventDefault();
    //mouse position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call function when mouse moves
    document.onmousemove = elementDrag;
}
function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element to the new calculated
    // e.target.style.left = 0;
    // e.target.style.top = 0;
    elemnt.style.top = elemnt.offsetTop - pos2 + "px";
    elemnt.style.left = elemnt.offsetLeft - pos1 + "px";
}
function closeDragElement() {
    // stop moving when the mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
}
var left = 300, top = 300;
document.querySelector("#newWindowCreate").addEventListener('click', function () {
    wid = new ourWindow();
    wid._render();
})
function bootLoader() {
    var collection = JSON.parse(localStorage.getItem('windows'));

    if (collection == null || localStorage.getItem('windows') == "[{}]") {
        myWindow = new ourWindow();
        objects.push(myWindow);
        myWindow._render();
    } else {

        collection.forEach(function (propertyCollection) {
            console.log(propertyCollection);
            myWindow = new ourWindow(propertyCollection);
            objects.push(myWindow);
            myWindow._render();
        })
    }
}


function save() {
    var collection = [];
    objects.forEach(function (windowObject) {
        collection.push({
            top: windowObject.top,
            left: windowObject.left,
            height: windowObject.height,
            width: windowObject.width,
            state: windowObject.state
        })
    })
    localStorage.setItem('windows', JSON.stringify(collection))
}

setInterval(save, 1000);

var left = 200;

function ourWindow(propertyCollection) {
    var orginalWindow = document.querySelector('#originalWindow');
    this.newWindowMarkup = orginalWindow.cloneNode(true);
    this.objectId = "window-1";

    this.default = {
        height: 400,
        width: 600,
        top: 200,
        left: left++,
        state: 'normal'
    }

    if (!propertyCollection) {
        propertyCollection = this.default;
    }

    this.height = propertyCollection.height;
    this.width = propertyCollection.width;
    this.top = propertyCollection.top;
    this.left = propertyCollection.left;
    this.state = propertyCollection.state;

    // this.setLeft = function (left) {
    //     this.default.left = ++left;
    // }


    this.minimize = function () {
        this.newWindowMarkup.style.top = "93vh";
        this.newWindowMarkup.style.left = "3rem";
        this.newWindowMarkup.style.height = "2.5rem";
        this.newWindowMarkup.style.width = "10rem";
    }
    this.maximize = function () {
        this.newWindowMarkup.style.height = "90vh";
        this.newWindowMarkup.style.width = "98vw";
    }
    this.restore = function () {

    }
    this.close = function () {
        this.newWindowMarkup.style.display = "none";
    }

    this._render = function () {
        var thisWindow = this;
        this.newWindowMarkup.setAttribute('id', this.objectId);
        this.newWindowMarkup.style.height = this.height;
        this.newWindowMarkup.style.width = this.width;
        this.newWindowMarkup.style.top = this.top;
        this.newWindowMarkup.style.left = this.left;
        this.newWindowMarkup.style.display = 'block';
        this.newWindowMarkup.querySelector('.fa-window-minimize').addEventListener('click', function () {
            handlers.minimizeHandler(thisWindow);
            console.log(thisWindow.state);
        });
        this.newWindowMarkup.querySelector('.fa-window-maximize').addEventListener('click', function () {
            handlers.maximizeHandler(thisWindow);
        });

        this.newWindowMarkup.querySelector('.fa-window-restore').addEventListener('click', function () {
            handlers.restoreHandler(thisWindow);
        });
        this.newWindowMarkup.querySelector('.fa-window-close').addEventListener('click', function () {
            handlers.closeHandler(thisWindow);
        });
        this.newWindowMarkup.addEventListener('mousedown', dragMouseDown);
        document.querySelector('.desktop').append(this.newWindowMarkup);

    }


}

handlers = new function () {
    this.stateHandler = function (win, state) {
        win.state = state;
    }
    this.minimizeHandler = function (win) {
        win.newWindowMarkup.querySelector('#content').style.display = "none";
        win.minimize();
        this.stateHandler(win, 'minimized');
    }
    this.maximizeHandler = function (win) {
        win.maximize();
        win.newWindowMarkup.querySelector('.fa-window-restore').style.display = "inline";
        win.newWindowMarkup.querySelector('.fa-window-maximize').style.display = "none";
        this.stateHandler(win, 'maximized');
    }
    this.restoreHandler = function (win) {
        win.restore();
        win.newWindowMarkup.querySelector('.fa-window-maximize').style.display = "inline";
        win.newWindowMarkup.querySelector('.fa-window-restore').style.display = "none";
        this.stateHandler(win, 'restored');
    }
    this.closeHandler = function (win) {
        win.close();
        this.stateHandler(win, 'closed');
    }
}

bootLoader();
