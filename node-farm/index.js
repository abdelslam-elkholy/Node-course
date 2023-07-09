"use strict";

const fs = require("fs");
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `this is what we know about avocado: ${textIn}\nCreated on${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("done");

//Non Blocking
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
});
