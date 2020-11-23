console.log("starting translater...");
const translate = require("translate-google");
const langs = require("./langs.js");

const settings = { duration: 10, using: "en" };

async function murder(text, part, finish) {
  let lang = randLang();
  let next;
  text = await attempt(text, settings.using, lang);
  for (let i = 0; i < settings.duration; i++) {
    next = randLang();
    text = await attempt(text, lang, next);
    lang = next;
    part(text);
  }
  text = await attempt(text, lang, settings.using);
  finish(text);
}

async function attempt(text, from, to) {
  try {
    return await translate(text, {
      from: from,
      to: to,
    });
  } catch (err) {
    console.log(err);
    return "oh no translate broke";
  }
}

function randLang() {
  return langs[Math.floor(Math.random() * langs.length)];
}

module.exports = murder;
