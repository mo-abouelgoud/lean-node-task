module.exports = function (status, message, data) {
  var req = this.req;
  var res = this.res;

  var statusCode = status;

  var result = {
    status: statusCode,
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
