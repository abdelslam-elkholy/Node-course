"use strict";
const http = require("http");
const fs = require("fs");
///////////////////////
//Files
//
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `this is what we know about avocado: ${textIn}\nCreated on${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("done");

// //Non Blocking
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, (err) => {
//         console.log("your File Has Been Written");
//       });
//     });
//   });
// });

/////////////////////////////
//Server

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const products = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    console.log(pathName);
    res.end("This is overView");
  } else if (pathName === "/product") {
    console.log(pathName);
    res.end("This is product");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world",
    });
    res.end("<h1>Page is not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Workiiing");
});
