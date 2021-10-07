module.exports = joi
  .object({
    username: joi.string(),
    email: joi.string().email(),
    page: joi.number().required(),
    limit: joi.number().required(),
  })
  .unknown();
