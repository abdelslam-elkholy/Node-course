const express = require("express");
const errorHandeler = require("./utils/appError");
const errControler = require("./controllers/errorControler");
const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
const tourRouter = require("./routs/toursRouts");
const userRouter = require("./routs/usersRouts");

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(
    errorHandeler.createError(
      `Can't find ${req.originalUrl} in the server`,
      404
    )
  );
});

app.use(errControler);

module.exports = app;
