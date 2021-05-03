module.exports = function (req, res, next) {
  console.log("my role is", req.role);

  if (req.role == sails.config.globals.userRoles.adminUser) return next();
  else
    return res.errorResponse(
      sails.config.globals.responseCodes.forbidden,
      sails.__("notAuthenticate")
    );
};
