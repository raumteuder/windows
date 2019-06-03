var windows = document.getElementById("windows");
var desktop = document.querySelector(".desktop");
var windowsContainer = document.getElementById("windowsContainer");

document.querySelector(".desktop").style.background =
  "url(" + localStorage.getItem("bground") + ")";

var pLeft = 0.2;
var ogHeight = [],
  ogWidth = [];
getOriginalSize(windows);
//create new window
document.getElementById("windowCreate").addEventListener("click", function() {
  var windowsClone = windows.cloneNode(true);
  let randomColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
  Object.assign(windowsClone.style, {
    background: randomColor,
    marginLeft: ++pLeft + "rem",
    opacity: 0.9
  });
  windowsContainer.appendChild(windowsClone);
  // windowsContainer.innerHTML += localStorage.getItem("windows");
  //append functionalities to all the new windows created
  closeFunction();
  minimizeFunction();
  maximizeFunction();
  getOriginalSize(windowsClone);
});

function getOriginalSize(ogWindow) {
  ogHeight.push(getComputedStyle(ogWindow).height);
  ogWidth.push(getComputedStyle(ogWindow).width);
  console.log(ogHeight);
}

//close button code
function closeFunction() {
  document.querySelectorAll(".fa-window-close").forEach(function(closebtns) {
    closebtns.addEventListener("click", function() {
      this.parentNode.parentNode.style.display = "none";
    });
  });
}

//minimize button code
function minimizeFunction() {
  document
    .querySelectorAll(".fa-window-minimize")
    .forEach(function(minimizebtns, index) {
      minimizebtns.addEventListener("click", function() {
        this.parentNode.nextSibling.nextSibling.style.display = "none";
        Object.assign(this.parentNode.parentNode.style, {
          // position: "absolute",
          height: "2.5rem",
          width: "14rem",
          bottom: 0,
          margin: "1rem",
          left: index + "rem"
        });
      });
    });
}

// maximize button code
function maximizeFunction() {
  document
    .querySelectorAll(".fa-window-maximize")
    .forEach(function(maximizebtns, index) {
      maximizebtns.addEventListener("click", function() {
        Object.assign(this.parentNode.parentNode.style, {
          height: "90vh",
          width: "95vw",
          marginLeft: "0"
        });
        this.parentNode.nextSibling.nextSibling.style.display = "inline-block";
        restoreFunction();
        this.style.display = "none";
        this.nextSibling.nextSibling.style.display = "inline";
      });
    });
}

// code to bring the box to the front when clicked
function bringToFront(box) {
  document.querySelectorAll(".windows").forEach(function(boxes) {
    boxes.style.zIndex = 0;
  });
  box.style.zIndex = 1;
}

//restore window to original size
function restoreFunction() {
  document
    .querySelectorAll(".fa-window-restore")
    .forEach(function(restorebtns, index) {
      restorebtns.addEventListener("click", function() {
        console.log(ogHeight);
        Object.assign(this.parentNode.parentNode.style, {
          height: ogHeight[index],
          width: ogWidth[index]
        });
        this.style.display = "none";
        this.previousSibling.previousSibling.style.display = "inline";
      });
    });
}
// make window draggable
function dragElement(elemnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  // if (windows) {
  //   windows.onmousedown = dragMouseDown;
  // } else {
  //   elemnt.onmousedown = dragMouseDown;
  // }
  elemnt.onmousedown = dragMouseDown;
}
function dragMouseDown(e) {
  e = e || window.event;
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
  e.target.style.top = e.target.offsetTop - pos2 + "px";
  e.target.style.left = e.target.offsetLeft - pos1 + "px";
}
function closeDragElement() {
  // stop moving when the mouse button is released
  document.onmouseup = null;
  document.onmousemove = null;
}

// call all functions
closeFunction();

minimizeFunction();

maximizeFunction();

dragElement(windows);

//wallpaper

// console.log(
//   document.querySelector(".desktop:not(.desktop>.windows-container)")
// );

// window.oncontextmenu = function() {
//   alert("Right Click");
// };

//code to display menu where clicked
var menuDisplayed = false;
var menuBox = null;

window.addEventListener(
  "contextmenu",
  function() {
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
  function() {
    if (menuDisplayed == true) {
      menuBox.style.display = "none";
    }
  },
  true
);

windows.addEventListener("contextmenu", e => {
  e.preventDefault();
  e.stopPropagation();
});

// code to handle uploaded image and append it as image
document.querySelector(".menu-item").addEventListener("click", function() {
  document.querySelector("#fileToUpload").click();
});
document.querySelector(".desktop").style.background =
  "url(" + reader.result + ")";
function previewUpload() {
  var file = document.querySelector("input[type=file]").files[0];
  var reader = new FileReader();

  reader.onloadend = function() {
    Object.assign(document.querySelector(".desktop").style, {
      background: "url(" + reader.result + ")"
    });
    localStorage.setItem("bground", reader.result);
  };
  if (file) {
    reader.readAsDataURL(file);
  } else {
    alert("please choose a valid file");
  }
}
