/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  "*": ["setLocale", "main-packages-init"],

  "normal-auth": {
    login: "inputValidation",
    register: "inputValidation",
  },

  user: {
    details: ["isAuthenticated", "isNormalUser"],
    update: ["isAuthenticated", "inputValidation", "isNormalUser"],
  },

  admin: {
    login: "inputValidation",
    "list-users": ["inputValidation", "isAuthenticated", "isAdmin"],
  },
};
