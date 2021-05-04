/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  // "/": { view: "pages/homepage" },

  "post /api/users/register": {
    controller: "normal-auth",
    action: "register",
    validation: "register",
  },
  "patch /api/users/login": {
    controller: "normal-auth",
    action: "login",
    validation: "login",
  },

  "get /api/users": { controller: "user", action: "show-details" },
  "put /api/users": {
    controller: "user",
    action: "update",
    validation: "updateUser",
  },

  "patch /api/admin/login": {
    controller: "admin",
    action: "login",
    validation: "login",
  },
  "get /api/admin/list-users": {
    controller: "admin",
    action: "list-users",
    validation: "listData",
  },

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
