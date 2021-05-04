module.exports = function inputValidation(req, res, next) {
  let schema = require("../validation/" + req.options.validation);
  if (!schema) {
    return res.serverError({
      message: this.req.i18n.__("server_error"),
      data: { error: req.options.controller + " " + req.options.action },
    });
  }

  const { error, value } = schema.validate(req.allParams());
  console.log("validation input", error, value);
  if (error) {
    return res.validationError({
      message: req.i18n.__("validation_error"),
      data: error.details,
    });
  } else {
    return next();
  }
};
