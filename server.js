const translate = require("translate-google");
const express = require("express");
const langs = require("./langs.js");
const fs = require("fs");
const app = express();

const settings = { duration: 10, using: "en" };

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/port", (req, res) => {
  res.send(process.env.PORT || 5000);
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 5000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const io = require("socket.io")(listener);
io.on("connection", (socket) => {
  socket.on("translate", async function (text, callback) {
    let lang = randLang();
    text = await translate(text, {
      from: settings.using,
      to: lang,
    });
    for (let i = 0; i <= settings.duration; i++) {
      text = await translate(text, {
        from: lang,
        to: (lang = randLang()),
      });
      socket.emit("part", text);
    }
    text = await translate(text, {
      from: lang,
      to: settings.using,
    });
    callback(text);
  });
});

function randLang() {
  return langs[Math.floor(Math.random() * langs.length)];
}
