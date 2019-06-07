objects = [];


var $ = function (val) { return document.querySelector(val) }

// var dragManager;
var elemnt;
function dragMouseDown(windowObj, e) {
    e = e || window.event;
    thisWindowObj = windowObj;
    console.log(windowObj.newWindowMarkup);
    elemnt = windowObj.newWindowMarkup;
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
    thisWindowObj.top = elemnt.offsetTop - pos2 + "px"
    thisWindowObj.left = elemnt.offsetLeft - pos1 + "px"
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
    wid.id = parseInt(lastWindow.id) + 1;
    wid.top = parseInt(lastWindow.top) + 10 + "px";
    wid.left = parseInt(lastWindow.left) + 10 + "px";
    wid._render();
    objects.push(wid);
})
function bootLoader() {
    var collection = JSON.parse(localStorage.getItem('windows'));
    if (collection == null || localStorage.getItem('windows') == "[{}]" || localStorage.getItem('windows') == "[]") {
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

    // if (!!collection) {
    //     collection.forEach(function (propertyCollection) {
    //         myWindow = new ourWindow(propertyCollection);
    //         objects.push(myWindow);
    //         myWindow._render();
    //     })
    // }
    // else {
    //     myWindow = new ourWindow();
    //     alert('hello');
    //     objects.push(myWindow);
    //     myWindow._render();
    // }
}

bootLoader();

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

setInterval(save, desktop.save, 5000);

var left = 200;

function ourWindow(propertyCollection) {
    var orginalWindow = $('#originalWindow');
    this.newWindowMarkup = orginalWindow.cloneNode(true);
    this.newWindowMarkup.classList.remove('hidden');
    console.log(this);
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

    var originalState = [{}];

    this.minimize = function () {
        // originalState.push({ id: this.id, left: this.left, top: this.top, height: this.height, width: this.width })
        this.newWindowMarkup.classList.remove('maximized');
        this.newWindowMarkup.classList.add('minimized');
        // Object.assign(this.newWindowMarkup.style, {
        //     top: "93vh",
        //     left: "3rem",
        //     height: "2.5rem",
        //     width: "10rem"
        // });
        this.height = getComputedStyle(this.newWindowMarkup).height;
        this.width = getComputedStyle(this.newWindowMarkup).width;
        this.left = getComputedStyle(this.newWindowMarkup).left;
        this.top = getComputedStyle(this.newWindowMarkup).top;

        // this.newWindowMarkup.classList.add("minimized");
    }
    this.maximize = function () {

        // Object.assign(this.newWindowMarkup.style, {
        //     height: "90vh",
        //     width: "99vw",
        //     top: 0,
        //     left: 0
        // })
        this.newWindowMarkup.classList.remove('minimized');
        this.newWindowMarkup.classList.add('maximized');
        this.height = getComputedStyle(this.newWindowMarkup).height;
        this.width = getComputedStyle(this.newWindowMarkup).width;
        this.left = getComputedStyle(this.newWindowMarkup).left;
        this.top = getComputedStyle(this.newWindowMarkup).top;
    }
    this.restore = function () {
        this.newWindowMarkup.classList.remove("maximized");
        this.newWindowMarkup.classList.remove("minimized");
        this.height = getComputedStyle(this.newWindowMarkup).height;
        this.width = getComputedStyle(this.newWindowMarkup).width;
        this.left = getComputedStyle(this.newWindowMarkup).left;
        this.top = getComputedStyle(this.newWindowMarkup).top;
    }
    this.close = function () {
        var newThis = this;
        this.newWindowMarkup.remove();
        objects = objects.filter(function (item) {
            return (item.id != newThis.id)
        })
        delete (this);
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

        this.newWindowMarkup.querySelector('.fa-window-minimize').addEventListener('click', function () {
            console.log(thisWindow);
            handlers.minimizeHandler(thisWindow);
            console.log(thisWindow);
            console.log(thisWindow.state);
        });
        this.newWindowMarkup.querySelector('.fa-window-maximize').addEventListener('click', function () {
            handlers.maximizeHandler(thisWindow);
            console.log(thisWindow.state);
        });

        this.newWindowMarkup.querySelector('.fa-window-restore').addEventListener('click', function () {
            handlers.restoreHandler(thisWindow);
            console.log(thisWindow.state);
        });
        this.newWindowMarkup.querySelector('.fa-window-close').addEventListener('click', function () {
            handlers.closeHandler(thisWindow);
            console.log(thisWindow.state);

        });
        this.newWindowMarkup.querySelector('.header').addEventListener('mousedown', function () {
            dragMouseDown(thisWindow, event)
            e.stopPropagation;
        });
        this.newWindowMarkup.addEventListener('click', function () {
            objects.forEach(function (items) {
                items.zIndex = 0;
            })
            document.querySelectorAll('.windows').forEach(
                function (divs) {
                    divs.style.zIndex = 0;
                }
            )
            thisWindow.zIndex = 1;
            this.style.zIndex = 1;
        });

        $('.desktop').append(this.newWindowMarkup);

        if (this.state == "minimized") {
            this.newWindowMarkup.querySelector("#content").classList.add('hidden');
        }
        else {
            this.newWindowMarkup.querySelector("#content").classList.remove('hidden');
        }

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
        win.newWindowMarkup.querySelector('#content').style.display = "block";
        win.restore();
        this.stateHandler(win, 'restored');
    }
    this.closeHandler = function (win) {
        win.close();
        this.stateHandler(win, 'closed');
    }
}

