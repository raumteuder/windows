var windows = document.getElementById("windows");
var desktop = document.querySelector(".desktop");
var windowsContainer = document.getElementById("windowsContainer");
var pLeft = 1;

document.getElementById("windowCreate").addEventListener("click", function() {
  var windowsClone = windows.cloneNode(true);
  windowsClone.style.marginLeft = ++pLeft + "rem";
  windowsContainer.appendChild(windowsClone);
  closeFunction();
});

function closeFunction() {
  document.querySelectorAll(".fa-window-close").forEach(function(closebtns) {
    closebtns.addEventListener("click", function() {
      this.parentNode.parentNode.style.display = "none";
    });
  });
}

function minimizeFunction(){
    document.querySelectorAll
}

closeFunction();
