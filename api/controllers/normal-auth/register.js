var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

module.exports = {
	friendlyName: 'Create user',
	description: 'Create a new user.',

	inputs: {
		 
		username: {
            type: 'string',
              required: true
        },
        
		email: {
            type: 'string',
            required: true
        },
        age: {
            type: 'number',
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
        let user = await sails.helpers.findUser.with({
            email: inputs.email.toLowerCase(),
            username: inputs.username.toLowerCase()
        });

        console.log(user);
        
        if (user.length!=0)
            return this.res.errorResponse(sails.config.custom.responseCodes.badRequest, sails.__('email_found'), {
                "message": sails.__('email_found'),
            "path": [
                "email","username"
            ]})
				
		
		var attr = {
			id: sails.helpers.randomCryptoString({ size: 32 }).execSync(),
            email: inputs.email.toLowerCase(),
            username: inputs.username.toLowerCase(),
			age: inputs.age,
		 
			 
		}
	 
        attr.password = await bcrypt.hash(inputs.password, 10);
	
        var db =  sails.config.globals.firebase.firestore();
     
        db.collection("users").add(
           attr
        )
        .then((docRef) => {
            var token = jwt.sign({user: attr}, sails.config.jwtSecret, {expiresIn: sails.config.jwtExpires})
					
            return this.res.successResponse(sails.config.custom.responseCodes.success,
                sails.__('mission_success'),
                { token: token, user: attr, userType: sails.config.custom.userRoles.normalUser }
            );
        })
            .catch((error) => {
                return this.res.errorResponse(sails.config.custom.responseCodes.serverError,
                    sails.__('database_error'),
                    { error: error });

         });


	}
}
