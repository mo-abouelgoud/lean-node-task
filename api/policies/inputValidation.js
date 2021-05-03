module.exports = function inputValidation(req, res, next) {
  var schema = require("../validation/" + req.options.validation);
  if (!schema) {
    return res.errorResponse(
      sails.config.globals.responseCodes.serverError,
      sails.__("server_error"),
      { error: req.options.controller + " " + req.options.action }
    );
  }

  console.log(req.method, req.query);
  let httpReqData = {};
  if (req.method == "GET") {
    httpReqData = req.query;
  } else {
    httpReqData = req.body;
  }

  const { error, value } = schema.validate(httpReqData);
  console.log("validation input", error, value);
  if (error) {
    return res.errorResponse(
      sails.config.globals.responseCodes.validationError,
      sails.__("validation_error"),
      error.details
    );
  } else {
    return next();
  }
};
