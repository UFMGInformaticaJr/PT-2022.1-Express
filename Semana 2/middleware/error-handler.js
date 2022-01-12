const { InvalidParamsError } = require("../custom-errors");

function errorHandler(error, req, res, next) {
  const message = error.message;
  let status = 500; // Internal Server Error

  if (error instanceof InvalidParamsError) {
    status = 400;
  }

  console.log(error);
  res.status(status).json(message);
}

module.exports = errorHandler;
