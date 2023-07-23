const express = require("express");
const errorHandeler = require("./utils/appError");
const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
const tourRouter = require("./routs/toursRouts");
const userRouter = require("./routs/usersRouts");

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} in the server`);
  // err.status = "fail";
  // err.statusCode = 404;
  next(
    errorHandeler.createError(
      `Can't find ${req.originalUrl} in the server`,
      404
    )
  );
});

app.use((err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    staus: err.status,
    message: err.message,
  });
});

module.exports = app;
