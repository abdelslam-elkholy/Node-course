const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
const tourRouter = require("./routs/toursRouts");
const userRouter = require("./routs/usersRouts");

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.url} in the server`);
  err.status = "fail";
  err.statusCode = 404;
});

module.exports = app;
