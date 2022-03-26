module.exports = joi
  .object({
    serviceId: joi.string().required(),
    date: joi.date().iso().required(),
    time: joi.date().iso().required(),
  })
  .unknown();

