"use strict";
const http = require("http");
const fs = require("fs");
const url = require("url");
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

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const products = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/" || pathname === "/overview") {
    console.log(pathname);
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = products
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARD%}", cardsHtml);

    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = products[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  } else if (pathname === "/api") {
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
