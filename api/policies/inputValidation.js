module.exports = function inputValidation(req, res, next) {
  var schema = require('../validation/' + req.options.validation)
  if (!schema) {
    return res.errorResponse(sails.config.custom.responseCodes.serverError, sails.__('server_error'), { error:req.options.controller + " " + req.options.action });
  }


  const  { error, value }= schema.validate(req.body);
    console.log("validation input", error, value);
  if (error) {
       return res.errorResponse(sails.config.custom.responseCodes.validationError,sails.__('validation_error') ,error.details );
  } else {
      return next();
  }

 

};