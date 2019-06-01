var windows = document.getElementById("windows");
var desktop = document.querySelector(".desktop");
var windowsContainer = document.getElementById("windowsContainer");
var pLeft = 1;

document.getElementById("windowCreate").addEventListener("click", function() {
  var windowsClone = windows.cloneNode(true);
  windowsClone.style.marginLeft = ++pLeft + "rem";
  windowsContainer.appendChild(windowsClone);
  closeFunction();
  minimizeFunction();
});

function closeFunction() {
  document.querySelectorAll(".fa-window-close").forEach(function(closebtns) {
    closebtns.addEventListener("click", function() {
      this.parentNode.parentNode.style.display = "none";
    });
  });
}

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

closeFunction();

minimizeFunction();
