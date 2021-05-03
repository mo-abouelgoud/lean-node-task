module.exports = sails.config.globals.Joi.object({
  username: sails.config.globals.Joi.string().required(),
  password: sails.config.globals.Joi.string().min(6).required(),
}).unknown();
