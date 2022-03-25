module.exports.policies = {
  "*": "setLocale",

  "normal-auth": {
    login: ["setLocale", "inputValidation"],
    register: ["setLocale", "inputValidation"],
  },

  user: {
    "show-details": ["setLocale", "isAuthenticated", "isNormalUser"],
    update: ["setLocale", "isAuthenticated", "inputValidation", "isNormalUser"],
  },

  admin: {
    login: ["setLocale", "inputValidation"],
    "get-users": ["setLocale", "isAuthenticated", "isAdmin"]
  }
};
