module.exports = joi
  .object({
    serviceName: joi.string().required(),
  })
  .unknown();
