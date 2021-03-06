module.exports = async function (req, res, next) {
  sails.helpers.verifyToken
    .with({
      req: req,
      res: res,
    })
    .switch({
      error: function (error) {
        return res.serverError(error);
      },
      invalid: function (error) {
        return res.notAuthenticate({
          message: req.i18n.__("notAuthenticate"),
          data: error,
        });
      },
      success: function () {
        return next();
      },
    });
};
