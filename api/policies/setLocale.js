module.exports = function (req, res, next) {
  let lang = req.header("lang");
  if (lang) {
    req.setLocale(lang);
  }

  return next();
};
