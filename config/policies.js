module.exports.policies = {
  "*": "setLocale",

  "normal-auth": {
    login: ["setLocale", "inputValidation"],
    register: ["setLocale", "inputValidation"],
  },

  user: {
    "show-details": ["setLocale", "isAuthenticated", "isNormalUser"],
    "show-services": ["setLocale", "isAuthenticated", "isNormalUser"],
    "add-appointment": ["setLocale", "isAuthenticated", "inputValidation", "isNormalUser"],
    update: ["setLocale", "isAuthenticated", "inputValidation", "isNormalUser"],
  },

  admin: {
    login: ["setLocale", "inputValidation"],
    "get-users": ["setLocale", "isAuthenticated", "isAdmin"],
    "add-service": ["setLocale", "isAuthenticated", "inputValidation", "isAdmin"],
    // "manage-settings": ["setLocale", "inputValidation", "isAdmin"]
  }
};
