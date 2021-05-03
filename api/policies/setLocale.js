module.exports = function (req, res, next) {
  let lang = req.header("lang");

  if (lang) {
    console.log(lang, " is set for this request");
    req.setLocale(lang);
  }

  return next();
};
