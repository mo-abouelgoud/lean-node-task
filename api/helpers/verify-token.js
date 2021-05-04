const getUser = async (payload) => {
  let user = await sails.helpers.findUser.with({
    id: payload.user.id,
  });

  return user;
};

const getAdmin = async (payload) => {
  let admin = await sails.helpers.findAdmin.with({
    id: payload.user.id,
  });

  return admin;
};

module.exports = {
  friendlyName: "Verify JWT",
  description: "Verify a JWT token.",
  inputs: {
    req: {
      type: "ref",
      friendlyName: "Request",
      description: "A reference to the request object (req).",
      required: true,
    },
    res: {
      type: "ref",
      friendlyName: "Response",
      description: "A reference to the response object (res).",
      required: true,
    },
  },
  exits: {
    invalid: {},
  },
  fn: function (inputs, exits) {
    let req = inputs.req;
    let res = inputs.res;

    let token = req.header("authorization") || null;
    if (token) {
      token = token.split("Bearer ")[1];

      if (!token) return exits.invalid(req.i18n.__("notAuthenticate"));

      return jwt.verify(
        token,
        sails.config.jwtSecret,
        async function (err, payload) {
          if (err || !payload.user)
            return exits.invalid(req.i18n.__("notAuthenticate"));

          let user = {};

          if (payload.userType === sails.config.globals.userRoles.adminUser)
            user = await getAdmin(payload);
          else if (
            payload.userType === sails.config.globals.userRoles.normalUser
          )
            user = await getUser(payload);

          if (user.length == 0)
            return exits.invalid(req.i18n.__("notAuthenticate"));

          if (_.isArray(user)) user = _.last(user);

          req.user = user;
          req.role = payload.userType;

          console.log("verify token_ the user token", user, payload);

          return exits.success(user);
        }
      );
    }

    return exits.invalid(req.i18n.__("notAuthenticate"));
  },
};
