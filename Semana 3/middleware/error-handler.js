const {InvalidParamsError, NotAuthorizedError} = require("../custom-errors");

function errorHandler(error, req, res, next) {
  const message = error.message;
  let status = 500; // Internal Server Error

  if (error instanceof InvalidParamsError) {
    status = 400; // Bad Request
  }

  if (error instanceof NotAuthorizedError) {
    status = 401; // Unauthorized
  }

  console.log(error);
  res.status(status).json(message);
}

module.exports = errorHandler;
