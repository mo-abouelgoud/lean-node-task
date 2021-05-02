var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

module.exports = {
	friendlyName: 'login normal user',
	description: 'authenticate normal user.',

	inputs: {
		 
		username: {
            type: 'string',
              required: true
        },
        
		password: {
            type: 'string',
            required: true
            
		},
	},

	exits: {
		invalid: {
			responseType: 'badRequest',
			description: 'The provided inputs contains data are invalid.',
        },
        success: {
			responseType: 'ok',
			description: 'The provided inputs are valid.',
		},
	 
	},

    fn: async function (inputs, exits) {
        console.log("inputs.username",inputs.username);
	 
		 let admin = await sails.helpers.findadmin.with({
            username: inputs.username.toLowerCase()
		 });
		
		if (admin.length == 0)
			return this.res.errorResponse(sails.config.custom.responseCodes.notFound,
				sails.__('user_not_found'))
		
		if(_.isArray(admin))
            admin = _.last(admin);

		var passwordIsValid = await bcrypt.compare(inputs.password, admin.password)
		if (!passwordIsValid) {
			return this.res.errorResponse(sails.config.custom.responseCodes.badRequest
				, sails.__('invalid_cred'))
		 }

  		var token = jwt.sign({user: user,userType:sails.config.custom.userRoles.adminUser}, sails.config.jwtSecret, {expiresIn: sails.config.jwtExpires})
 		 
         return this.res.successResponse(sails.config.custom.responseCodes.success
            , sails.__('mission_success'), { token ,userType:sails.config.custom.userRoles.adminUser})			 
		 
	}
}
