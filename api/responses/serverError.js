module.exports = function ({ status, message, data }) {
  var req = this.req;
  var res = this.res;

  var statusCode = sails.config.globals.responseCodes.serverError;

  if (status) statusCode = status;

  var result = {
    statusCode: statusCode,
    status: false,
  };

  // Optional message
  if (message) {
    result.message = message;
  }

  // Optional data
  if (data) {
    //always return data variable as an object
    result.data = _.isString(data) ? { data } : data;
  }

  return res.status(statusCode).json(result);
};
