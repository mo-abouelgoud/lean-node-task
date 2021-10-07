module.exports = function (req, res, next) {
  console.log("my role is", req.role);

  if (req.role === sails.config.globals.userRoles.normalUser) return next();
  else return res.forbidden({ message: req.i18n.__("notAuthenticate") });
};
