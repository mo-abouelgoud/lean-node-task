module.exports = sails.config.globals.Joi.object({
    
    username:  sails.config.globals.Joi.string().required(),
    email:  sails.config.globals.Joi.string().required() .email(),
    age:  sails.config.globals.Joi.number().min(18).max(50) .required(),
    password: sails.config.globals.Joi.string().alphanum().min(6).required()
})
    .unknown();