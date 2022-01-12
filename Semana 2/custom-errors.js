class InvalidParamsError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'InvalidParamsError';
  }
}

module.exports = {InvalidParamsError};
