const express = require("express");
const app = express();
const tourRouter = require("./routs/toursRouts");
const userRouter = require("./routs/usersRouts");
app.use(express.json());

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
