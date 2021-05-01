module.exports = {
	friendlyName: 'find user object',
	description: 'find a user details',

	inputs: {
		id: {
			type: 'string'
		},
		username: {
			type: 'string',
			defaultsTo: ""
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
		let usersArray=[];
        var db = sails.config.globals.firebase.firestore();
        
		const usersRef = db.collection('users');
		
		if (inputs.id) {
			const byIdQuerySnapshot = await usersRef.where('id', '==', inputs.id).get();

			 
		byIdQuerySnapshot.forEach((doc) => {
			let data = doc.data();
			data.docId = doc.id;
			usersArray.push(data)
		});

		 
		}
		else{

    
        const byUsername = usersRef.where('username', '==', inputs.username).get();
		const byEmail = usersRef.where('email', '==', inputs.email).get();
		


        const [byUsernameQuerySnapshot, byEmailQuerySnapshot] = await Promise.all([
          byUsername,
          byEmail
        ]);

		const byEmailArray = [];
		byUsernameQuerySnapshot.forEach((doc) => {
			let data = doc.data();
			data.docId = doc.id;
			byEmailArray.push(data)
		});
		
		const byUsernameArray = [];
		byEmailQuerySnapshot.forEach((doc) => {
			let data = doc.data();
			data.docId = doc.id;
			byUsernameArray.push(data)
        });;

		 usersArray = byEmailArray.concat(byUsernameArray);
		}
        
        return exits.success(usersArray);
 
		
	}
}








