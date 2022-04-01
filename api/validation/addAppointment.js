module.exports = joi
  .object({
    serviceId: joi.string().required(),
    date: joi.date().min(new Date().setUTCHours(0, 0, 0, 0)).iso().required(),
    time: joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
  })
  .unknown();

