module.exports = {
  friendlyName: "find user object",
  description: "find a user details",

  inputs: {
    id: {
      type: "string",
    },
    username: {
      type: "string",
      defaultsTo: "",
    },
  },

  exits: {
    invalid: {
      responseType: "badRequest",
      description: "The provided email address and/or password are invalid.",
    },
  },

  fn: async function (inputs, exits) {
    let adminArray = [];

    const usersRef = db.collection("admins");

    if (inputs.id) {
      const byIdQuerySnapshot = await usersRef
        .where("id", "==", inputs.id)
        .get();

      byIdQuerySnapshot.forEach((doc) => {
        let data = doc.data();
        data.docId = doc.id;
        adminArray.push(data);
      });
    } else {
      const byUsernameSnapshot = await usersRef
        .where("username", "==", inputs.username)
        .get();

      byUsernameSnapshot.forEach((doc) => {
        let data = doc.data();
        data.docId = doc.id;
        adminArray.push(data);
      });
    }

    return exits.success(adminArray);
  },
};
