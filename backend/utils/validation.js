// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    // let errors = {};

    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Validation error');
    err.errors = errors;
    err.status = 400;
    err.statusCode = 400;
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};
