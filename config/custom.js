/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
responseCodes : {
            badRequest: 400,
            serverError: 500,
            forbidden: 403,
            notFound: 404,
            validationError: 422,
            notAuthenticate: 401,
            success: 200,
            create: 201,
  },
  userRoles: {
    normalUser: "NORMAL_USER",
    adminUser: "ADMIN_USER",
    guestUser:"GUEST_USER"
  },


};
