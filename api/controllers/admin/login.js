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

    let admin = await sails.helpers.findAdmin.with({
      username: inputs.username.toLowerCase(),
    });

    if (admin.length === 0)
      return this.res.notFound({ message: this.req.i18n.__("user_not_found") });

    if (_.isArray(admin)) admin = _.last(admin);

    let passwordIsValid = await bcrypt.compare(inputs.password, admin.password);
    if (!passwordIsValid) {
      return this.res.badRequest({ message: this.req.i18n.__("invalid_cred") });
    }

    let token = jwt.sign(
      { user: admin, userType: sails.config.globals.userRoles.adminUser },
      sails.config.jwtSecret,
      { expiresIn: sails.config.jwtExpires }
    );

    return this.res.successResponse({
      message: this.req.i18n.__("mission_success"),
      data: { token, userType: sails.config.globals.userRoles.adminUser },
    });
  },
};
