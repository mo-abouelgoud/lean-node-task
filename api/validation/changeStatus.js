module.exports = joi
  .object({
    id: joi.string().required(),
  })
  .unknown();
