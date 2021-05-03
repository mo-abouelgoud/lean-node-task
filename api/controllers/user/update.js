const algoliaUpdateIndex = (object, objectId) => {
  object.objectID = objectId;
  object = _.omit(object, ["password", "id"]);
  return algoliaIndex.partialUpdateObject(object);
};

module.exports = {
  friendlyName: "normal user to update his profile",
  description: "normal user to update his profile",

  inputs: {
    username: {
      type: "string",
      required: true,
    },

    email: {
      type: "string",
      required: true,
    },
    age: {
      type: "number",
      required: true,
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
    let user = this.req.user;

    if (!user)
      return this.res.errorResponse(
        sails.config.globals.responseCodes.notFound,
        sails.__("user_not_found")
      );

    if (_.isArray(user)) user = _.last(user);

    //check the user to ensure the unique for email and password
    let attr = {};
    if (inputs.email !== user.email) attr.email = inputs.email.toLowerCase();

    if (inputs.username !== user.username)
      attr.username = inputs.username.toLowerCase();

    if (!_.isEmpty(attr)) {
      let _user = await sails.helpers.findUser.with(attr);

      if (_user.length != 0)
        return this.res.errorResponse(
          sails.config.globals.responseCodes.badRequest,
          sails.__("email_found"),
          {
            message: sails.__("email_found"),
            path: ["email", "username"],
          }
        );
    }

    const usersRef = db.collection("users");

    let _object = {
      email: inputs.email.toLowerCase(),
      username: inputs.username.toLowerCase(),
      age: inputs.age,
    };

    //update the user new data
    try {
      let updateUser = await usersRef
        .doc(user.docId)
        .set(_object, { merge: true });

      //update the index in algolia
      const { objectID } = await algoliaUpdateIndex(_object, user.id);

      return this.res.successResponse({ message: sails.__("mission_success") });
    } catch (error) {
      return this.res.serverError({
        message: sails.__("server_error"),
        data: { error },
      });
    }
  },
};
