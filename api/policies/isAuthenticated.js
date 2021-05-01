 
var jwt = require('jsonwebtoken')

module.exports = async function(req, res, next) {
	sails.helpers.verifyToken({
		req: req,
		res: res
	})
	.switch({
		error: function(err) {
			return res.serverError(err)
		},
		invalid: function(err) {
			 
			return res.errorResponse(sails.config.custom.responseCodes.notAuthenticate,
				sails.__('notAuthenticate'), {error:err})
			 
		},
		success: function() {
 			return next()
		}
	})
}
