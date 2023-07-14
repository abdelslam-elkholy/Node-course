const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
const tourRouter = require("./routs/toursRouts");
const userRouter = require("./routs/usersRouts");

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
