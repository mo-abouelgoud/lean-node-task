
  const firebase = require('firebase-admin');
 
firebase.initializeApp({
  credential: firebase.credential.cert(sails.config.custom.firebase_config),
  databaseURL:sails.config.custom.firebase_config.url
});

module.exports = function (req, res, next) {
 
  return next();
};