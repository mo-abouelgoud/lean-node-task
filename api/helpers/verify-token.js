var jwt = require("jsonwebtoken");

const getUser = async (payload) => {
  var user = await sails.helpers.findUser.with({
    id: payload.user.id,
  });

  return user;
};

const getAdmin = async (payload) => {
  var admin = await sails.helpers.findAdmin.with({
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
    var req = inputs.req;
    var res = inputs.res;

    if (req.header("authorization")) {
      var token = req.header("authorization").split("Bearer ")[1];

      if (!token) return exits.invalid(sails.__("notAuthenticate") + "1");

      return jwt.verify(
        token,
        sails.config.jwtSecret,
        async function (err, payload) {
          if (err || !payload.user)
            return exits.invalid(sails.__("notAuthenticate") + "12");

          let user = {};

          if (payload.userType === sails.config.custom.userRoles.adminUser)
            user = await getAdmin(payload);
          else if (
            payload.userType === sails.config.custom.userRoles.normalUser
          )
            user = await getUser(payload);

          if (user.length == 0)
            return exits.invalid(sails.__("notAuthenticate"));

          if (_.isArray(user)) user = _.last(user);

          req.user = user;
          req.role = payload.userType;

          console.log("verify token_ the user token", user, payload);

          return exits.success(user);
        }
      );
    }

    return exits.invalid(sails.__("notAuthenticate") + "14");
  },
};
