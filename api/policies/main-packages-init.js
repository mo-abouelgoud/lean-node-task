
const firebase = require('firebase-admin');
 
firebase.initializeApp({
  credential: firebase.credential.cert(sails.config.firebase_config),
  databaseURL:sails.config.firebase_config.url
});

module.exports = function (req, res, next) {
 
  return next();
};