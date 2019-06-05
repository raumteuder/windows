objects = [];


var $ = function (val) { return document.querySelector(val) }

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
    elemnt.style.top = elemnt.offsetTop - pos2 + "px";
    elemnt.style.left = elemnt.offsetLeft - pos1 + "px";
}
function closeDragElement() {
    // stop moving when the mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
}
// var left = 300, top = 300;
$("#newWindowCreate").addEventListener('click', function () {
    lastWindow = objects.reverse()[0];
    wid = new ourWindow();
    console.log(lastWindow);
    wid.id = parseInt(lastWindow.id) + 1;
    wid.top = parseInt(lastWindow.top) + 10 + "px";
    wid.left = parseInt(lastWindow.left) + 10 + "px";
    wid._render();
    objects.push(wid);
})
function bootLoader() {
    var collection = JSON.parse(localStorage.getItem('windows'));

    if (collection == null || localStorage.getItem('windows') == "[{}]") {
        myWindow = new ourWindow();
        objects.push(myWindow);
        myWindow._render();
    } else {

        collection.forEach(function (propertyCollection) {
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
            id: windowObject.id,
            top: windowObject.top,
            left: windowObject.left,
            height: windowObject.height,
            width: windowObject.width,
            zIndex: windowObject.zIndex,
            state: windowObject.state
        })
    })
    localStorage.setItem('windows', JSON.stringify(collection))
}

setInterval(save, 5000);

var left = 200;

function ourWindow(propertyCollection) {
    var orginalWindow = $('#originalWindow');
    this.newWindowMarkup = orginalWindow.cloneNode(true);
    this.objectId = "window-1";
    this.default = {
        id: 0,
        height: '400px',
        width: '500px',
        top: '20px',
        left: '20px',
        zIndex: 0,
        state: 'normal'
    }

    if (!propertyCollection) {
        propertyCollection = this.default;
    }
    this.id = propertyCollection.id;
    this.height = propertyCollection.height;
    this.width = propertyCollection.width;
    this.top = propertyCollection.top;
    this.left = propertyCollection.left;
    this.zIndex = propertyCollection.zIndex;
    this.state = propertyCollection.state;

    this.minimize = function () {
        console.log(this.height);
        Object.assign(this.newWindowMarkup.style, {
            top: "93vh",
            left: "3rem",
            height: "2.5rem",
            width: "10rem"
        })
    }
    this.maximize = function () {
        Object.assign(this.newWindowMarkup.style, {
            height: "90vh",
            width: "99vw",
            top: 0,
            left: 0
        })
    }
    this.restore = function () {
        Object.assign(this.newWindowMarkup.style, {
            height: this.height,
            width: this.width
        })
    }
    this.close = function () {
        this.newWindowMarkup.style.display = "none";
    }

    this._render = function () {
        var thisWindow = this;
        this.newWindowMarkup.setAttribute('id', this.objectId);
        Object.assign(this.newWindowMarkup.style, {
            height: this.height,
            width: this.width,
            top: this.top,
            left: this.left,
            display: 'block'
        })
        // this.newWindowMarkup.style.height = this.height;
        // this.newWindowMarkup.style.width = this.width;
        // this.newWindowMarkup.style.top = this.top;
        // this.newWindowMarkup.style.left = this.left;
        // this.newWindowMarkup.style.display = 'block';


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
        $('.desktop').append(this.newWindowMarkup);

    }


}

handlers = new function () {
    this.stateHandler = function (win, state) {
        win.state = state;
    }
    this.minimizeHandler = function (win) {
        win.newWindowMarkup.querySelector('#content').style.display = "none";
        win.newWindowMarkup.querySelector('.fa-window-restore').style.display = "inline";
        win.newWindowMarkup.querySelector('.fa-window-maximize').style.display = "none";
        win.minimize();
        this.stateHandler(win, 'minimized');
    }
    this.maximizeHandler = function (win) {
        win.newWindowMarkup.querySelector('#content').style.display = "block";
        win.newWindowMarkup.querySelector('.fa-window-restore').style.display = "inline";
        win.newWindowMarkup.querySelector('.fa-window-maximize').style.display = "none";
        win.maximize();
        this.stateHandler(win, 'maximized');
    }
    this.restoreHandler = function (win) {
        win.newWindowMarkup.querySelector('.fa-window-maximize').style.display = "inline";
        win.newWindowMarkup.querySelector('.fa-window-restore').style.display = "none";
        win.restore();
        this.stateHandler(win, 'restored');
    }
    this.closeHandler = function (win) {
        win.close();
        this.stateHandler(win, 'closed');
    }
}

bootLoader();
