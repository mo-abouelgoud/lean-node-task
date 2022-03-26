module.exports = {
  friendlyName: "Generating signature from id",
  description: "generate signature",

  sync: true,

  inputs: {
    id: {
      type: "string",
      required: true,
    }
  },

  exits: {
    invalid: {
      responseType: "badRequest",
      description: "you should provid id",
    },
  },

  fn: function (inputs, exits) {
    if (inputs.id) {
      const signature = inputs.id + "@" + new Date().toISOString();
      return exits.success(signature);
    } else {
      return exits.invalid(req.i18n.__("validation_error"));
    }
  },
};
