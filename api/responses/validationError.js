module.exports = function ({ status, message, data }) {
  let req = this.req;
  let res = this.res;

  let statusCode = sails.config.globals.responseCodes.validationError;

  if (status) statusCode = status;

  let result = {
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
