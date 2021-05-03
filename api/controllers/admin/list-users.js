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
    //create filter to the algolia index (i have to  put OR between the two filters)
    let filters = "";
    if (inputs.username) filters = filters + `username:${inputs.username}`;
    if (inputs.email)
      filters = filters + (filters ? " OR " : "") + `email:${inputs.email}`;

    try {
      let results = await algolia_index.search("", {
        page: inputs.page,
        hitsPerPage: inputs.limit,
        filters: filters,
      });
      return this.res.successResponse({
        message: sails.__("mission_success"),
        data: results,
      });
    } catch (error) {
      return this.res.serverError({
        message: sails.__("server_error"),
        data: { error },
      });
    }
  },
};
