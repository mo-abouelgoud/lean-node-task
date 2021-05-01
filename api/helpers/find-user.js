module.exports = {
	friendlyName: 'find user object',
	description: 'find a user details',

	inputs: {
		username: {
			type: 'string'
		},
		email: {
			type: 'string',
			defaultsTo: ""
		},
	},

	exits: {
		invalid: {
			responseType: 'badRequest',
			description: 'The provided email address and/or password are invalid.',
		},
	},

    fn: async function (inputs, exits) {
        
        var db = sails.config.globals.firebase.firestore();
        
		const usersRef = db.collection('users');
		
		console.log("email", inputs.email);
		console.log("username", inputs.username);

    
        const byUsername = usersRef.where('username', '==', inputs.username).get();
		const byEmail = usersRef.where('email', '==', inputs.email).get();
		


        const [byUsernameQuerySnapshot, byEmailQuerySnapshot] = await Promise.all([
          byUsername,
          byEmail
        ]);

		const byEmailArray = [];
		byUsernameQuerySnapshot.forEach((doc) => {
			byEmailArray.push(doc.data())
		});
		
		const byUsernameArray = [];
		byEmailQuerySnapshot.forEach((doc) => {
			byUsernameArray.push(doc.data())
        });;

        const usersArray = byEmailArray.concat(byUsernameArray);
        
        return exits.success(usersArray);
 
		
	}
}








