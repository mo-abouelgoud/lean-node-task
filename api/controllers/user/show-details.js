module.exports = {
  friendlyName: "get normal user details",
  description: "get normal user details",

  inputs: {},

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
      return this.res.notFound({ message: sails.__("user_not_found") });

    if (_.isArray(user)) user = _.last(user);

    //delete the password and id from the user obj
    user = _.omit(user, ["password", "id"]);

    return this.res.successResponse({
      message: sails.__("mission_success"),
      data: { user },
    });
  },
};
