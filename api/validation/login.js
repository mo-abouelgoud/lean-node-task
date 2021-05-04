module.exports = joi
  .object({
    username: joi.string().required(),
    password: joi.string().min(6).required(),
  })
  .unknown();
