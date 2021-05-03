module.exports = {
  friendlyName: "login normal user",
  description: "authenticate normal user.",

  inputs: {
    username: {
      type: "string",
      required: true,
    },

    password: {
      type: "string",
      required: true,
    },
  },

  exits: {
    invalid: {
      responseType: "badRequest",
      description: "The provided inputs contains data are invalid.",
    },
    success: {
      responseType: "ok",
      description: "The provided inputs are valid.",
    },
  },

  fn: async function (inputs, exits) {
    console.log("inputs.username", inputs.username);

    let user = await sails.helpers.findUser.with({
      username: inputs.username.toLowerCase(),
    });

    if (user.length == 0)
      return this.res.errorResponse(
        sails.config.globals.responseCodes.notFound,
        sails.__("user_not_found")
      );

    if (_.isArray(user)) user = _.last(user);

    var passwordIsValid = await bcrypt.compare(inputs.password, user.password);
    if (!passwordIsValid) {
      return this.res.errorResponse(
        sails.config.globals.responseCodes.badRequest,
        sails.__("invalid_cred")
      );
    }

    var token = jwt.sign(
      { user: user, userType: sails.config.globals.userRoles.normalUser },
      sails.config.jwtSecret,
      { expiresIn: sails.config.jwtExpires }
    );

    return this.res.successResponse(
      sails.config.globals.responseCodes.success,
      sails.__("mission_success"),
      { token, userType: sails.config.globals.userRoles.normalUser }
    );
  },
};
