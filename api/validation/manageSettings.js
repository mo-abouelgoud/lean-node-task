module.exports = joi
  .object({
    startTime: joi.date().iso().required(),
    endTime:   joi.date().iso().min(joi.ref("startTime")).required(),
    slotTime:  joi .number().required(),
  })
  .unknown();

