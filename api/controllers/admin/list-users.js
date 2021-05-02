
var algoliasearch = require("algoliasearch");

module.exports = {
	friendlyName: 'get normal user details',
	description: 'get normal user details',

	inputs: {
			username: {
			type: 'string',
			defaultsTo: ""
        },
        
		email: {
			type: 'string',
			defaultsTo: ""
		},
		page: {
            type: 'number',
		},
		limit: {
            type: 'number',
		},
	},

	exits: {
		invalid: {
			responseType: 'badRequest',
			description: 'The provided inputs contains data are invalid.',
        },
        unauthorized: {
			responseType: 'forbidden',
			description: 'The provided token is invalid',
        },
        success: {
			responseType: 'ok',
			description: 'The provided inputs are valid.',
		},
	 
	},

    fn: async function (inputs, exits) {
       
		//  let user = this.req.user
		
		// if (!user)
		// 	return this.res.errorResponse(sails.config.custom.responseCodes.notFound,
        //         sails.__('user_not_found'))
        
		// if(_.isArray(user))
        //     user = _.last(user);
        
        // //delete the password and id from the user obj
        // user= _.omit(user, [
	    // 		'password','id'
	    // 	])

		const client = algoliasearch(sails.config.algolia_config.api_id , sails.config.algolia_config.admin_api_key);
    	const index = client.initIndex(sails.config.algolia_config.index_name);

		let filters = '';
		if (inputs.username)
			filters = filters + `username:${inputs.username}`
		if (inputs.email)
			filters = filters + ( filters ? ' OR ' : '') + `email:${inputs.email}`
		
		console.log("filters",filters)
		
		index.search('', {
			page: inputs.page,
			hitsPerPage: inputs.limit,
			 filters: filters
			}).then(({ hits }) => {
			// console.log("results",hits);
			 
			return this.res.successResponse(sails.config.custom.responseCodes.success
				, sails.__('mission_success'), hits);
			
		}).catch((error) => {
			return this.res.errorResponse(sails.config.custom.responseCodes.serverError,
				sails.__('server_error'), { error: error });
		 });
 				 
		 
	}
}
