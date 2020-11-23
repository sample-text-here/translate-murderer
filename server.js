console.log("starting app...");
const path = require("path");
const translate = require(path.join(__dirname, "lib", "translate.js"));
const express = require("express");
const fs = require("fs");
console.log("starting server...");
const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(
    "Success! Translate murderer is listening on port " +
      listener.address().port
  );
});

const io = require("socket.io")(listener);
io.on("connection", (socket) => {
  socket.on("translate", (text, callback) =>
    translate(text, (part) => socket.emit("part", part), callback)
  );
});
