class InvalidParamsError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'InvalidParamsError';
  }
}

class NotAuthorizedError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'NotAuthorizedError';
  }
}

module.exports = {InvalidParamsError, NotAuthorizedError};
