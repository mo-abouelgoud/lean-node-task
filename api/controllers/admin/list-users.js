module.exports = {
  friendlyName: "get normal user details",
  description: "get normal user details",

  inputs: {
    username: {
      type: "string",
      defaultsTo: "",
    },

    email: {
      type: "string",
      defaultsTo: "",
    },
    page: {
      type: "number",
    },
    limit: {
      type: "number",
    },
  },

  exits: {
    invalid: {
      responseType: "badRequest",
      description: "The provided inputs contains data are invalid.",
    },
    unauthorized: {
      responseType: "forbidden",
      description: "The provided token is invalid",
    },
    success: {
      responseType: "ok",
      description: "The provided inputs are valid.",
    },
  },

  fn: async function (inputs, exits) {
    let filters = "";
    if (inputs.username) filters = filters + `username:${inputs.username}`;
    if (inputs.email)
      filters = filters + (filters ? " OR " : "") + `email:${inputs.email}`;

    algolia_index
      .search("", {
        page: inputs.page,
        hitsPerPage: inputs.limit,
        filters: filters,
      })
      .then((results) => {
        return this.res.successResponse(
          sails.config.globals.responseCodes.success,
          sails.__("mission_success"),
          results
        );
      })
      .catch((error) => {
        return this.res.errorResponse(
          sails.config.globals.responseCodes.serverError,
          sails.__("server_error"),
          { error: error }
        );
      });
  },
};
