module.exports = {
  friendlyName: "change user status",
  description: "change user status",

  inputs: {
    id: {
      type: "string",
      defaultsTo: "",
    },


  },

  exits: {
    invalid: {
      responseType: "badRequest",
      description: "The provided inputs contains data are invalid.",
    },
    unauthorized: {
      responseType: "forbidden",
      description: "The provided token is invalid",
    },
    success: {
      responseType: "ok",
      description: "The provided inputs are valid.",
    },
  },

  fn: async function (inputs, exits) {
    //create filter to the algolia index (i have to  put OR between the two filters)
    let user = await sails.helpers.findUser.with({
     id:inputs.id
    });


    if (user.length === 0)
      return this.res.notFound({ message: this.req.i18n.__("user_not_found") });

    if (_.isArray(user)) user = _.last(user);

    //update the user new data
    try {
      const usersRef = db.collection("users");
      let resp=await usersRef
        .doc(user.docId)
        .set({status:!user.status}, { merge: true });

      console.log(resp);

      return this.res.successResponse({
        message: this.req.i18n.__("mission_success"),
      });
    } catch (error) {
      console.log(error);
      return this.res.serverError({
        message: this.req.i18n.__("server_error"),
        data: { error },
      });
    }
  },
};
