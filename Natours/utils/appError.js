class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;

// module.exports = (message, statusCode) => {
//   const error = new Error(message);
//   error.statusCode = statusCode;
//   error.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
//   error.isOperational = true;

//   Error.captureStackTrace(error, createError);

//   return error;
// };
