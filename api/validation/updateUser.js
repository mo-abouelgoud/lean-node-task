module.exports = sails.config.globals.Joi.object({
    
    username:  sails.config.globals.Joi.string().required(),
    email:  sails.config.globals.Joi.string().required() .email(),
    age:  sails.config.globals.Joi.number().min(18).max(50) .required()
 })
    .unknown();