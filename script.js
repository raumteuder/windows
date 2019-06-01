var windows = document.getElementById("windows");
var desktop = document.querySelector(".desktop");
var windowsContainer = document.getElementById("windowsContainer");
var pLeft = 1;

//create new window
document.getElementById("windowCreate").addEventListener("click", function() {
  var windowsClone = windows.cloneNode(true);
  windowsClone.style.marginLeft = ++pLeft + "rem";
  windowsContainer.appendChild(windowsClone);
  //append functionalities to all the new windows created
  closeFunction();
  minimizeFunction();
});
function getOriginalSize() {}

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
      console.log(index);
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
function maximizeFunction() {}

// code to bring the box to the front when clicked
function bringToFront(box) {
  document.querySelectorAll(".windows").forEach(function(boxes) {
    boxes.style.zIndex = 0;
  });
  box.style.zIndex = 1;
}

// call all functions
closeFunction();

minimizeFunction();

maximizeFunction();
