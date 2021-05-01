var jwt = require('jsonwebtoken')

module.exports = {
	friendlyName: 'Verify JWT',
	description: 'Verify a JWT token.',
	inputs: {
		req: {
			type: 'ref',
			friendlyName: 'Request',
			description: 'A reference to the request object (req).',
			required: true
		},
		res: {
			type: 'ref',
			friendlyName: 'Response',
			description: 'A reference to the response object (res).',
			required: true
		}
	},
	exits: {
		invalid: {
			 
		}
	},
	fn: function(inputs, exits) {
		var req = inputs.req
		var res = inputs.res
	 
 		if (req.header('authorization')) {
		 
			var token = req.header('authorization').split('Bearer ')[1]
			 
			if (!token) return exits.invalid( sails.__('notAuthenticate'))
		 
			return jwt.verify(token, sails.config.jwtSecret, async function(err, payload) {
				if (err || !payload.user) return exits.invalid( sails.__('notAuthenticate'))
				 
				var user = await sails.helpers.findUser.with({
         		   username: payload.user.username.toLowerCase()
				 });
				if (user.length == 0) return exits.invalid( sails.__('notAuthenticate'))
				user = _.last(user);
			 
				req.user = user
				return exits.success(user)
			})
		}
 
		return exits.invalid( sails.__('notAuthenticate'))
	}
}
