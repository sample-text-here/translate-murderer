/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");
const textareas = document.querySelectorAll("textarea");

fetch("port")
  .then((res) => res.text())
  .then((res) => {
    socket = io(location.origin + ":" + res);
    document.querySelector("span").innerText = "Ready!";
    socket.on("part", function (text) {
      textareas[1].value = text;
    });
    document.querySelector("button").removeAttribute("disabled");
  });

async function doit() {
  document.querySelector("span").innerText = "Doing the thing!";
  var value = textareas[0].value;
  socket.emit("translate", value, function (translated) {
    textareas[1].value = translated;
    document.querySelector("span").innerText = "Did the thing!";
  });
}
