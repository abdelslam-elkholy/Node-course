"use strict";

const fs = require("fs");
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `this is what we know about avocado: ${textIn}\nCreated on${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("done");

//Non Blocking
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, (err) => {
        console.log("your File Has Been Written");
      });
    });
  });
});
