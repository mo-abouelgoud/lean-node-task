/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  bcrypt = require("bcryptjs");
  jwt = require("jsonwebtoken");
  joi = require("joi");
  crypto = require("crypto");

  //add the algolia index
  algoliaSearch = require("algoliasearch");
  algoliaClient = algoliaSearch(
    sails.config.algolia_config.api_id,
    sails.config.algolia_config.admin_api_key
  );

  algoliaIndex = algoliaClient.initIndex(
    sails.config.algolia_config.index_name
  );
  //set algolia settings for search
  algoliaIndex.setSettings({
    searchableAttributes: ["email", "username"],
    attributesForFaceting: ["email", "username"],
    responseFields: ["hits", "hitsPerPage", "nbPages", "page"],
  });

  //init firebase connections
  firebase = require("firebase-admin");

  firebase.initializeApp({
    credential: firebase.credential.cert(sails.config.firebase_config),
    databaseURL: sails.config.firebase_config.url,
  });
  //the firestore database object
  db = firebase.firestore();
};
