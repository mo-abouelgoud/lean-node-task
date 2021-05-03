module.exports = function inputValidation(req, res, next) {
  var schema = require("../validation/" + req.options.validation);
  if (!schema) {
    return res.serverError({
      message: sails.__("server_error"),
      data: { error: req.options.controller + " " + req.options.action },
    });
  }

  const { error, value } = schema.validate(req.allParams());
  console.log("validation input", error, value);
  if (error) {
    return res.validationError({
      message: sails.__("validation_error"),
      data: error.details,
    });
  } else {
    return next();
  }
};
