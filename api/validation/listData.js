module.exports = sails.config.globals.Joi.object({
  username: sails.config.globals.Joi.string(),
  email: sails.config.globals.Joi.string().email(),
  page: sails.config.globals.Joi.number().required(),
  limit: sails.config.globals.Joi.number().required(),
}).unknown();
