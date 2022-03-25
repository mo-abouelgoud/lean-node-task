module.exports = {
  friendlyName: "show registered users",
  description: "show registered users",

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
      defaultsTo: 1,
    },

    limit: {
      type: "number",
      defaultsTo: 10,
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
    const page = inputs.page && inputs.page > 0 ? parseInt(inputs.page) - 1 : 0;
    const hitsPerPage = inputs.limit && inputs.limit > 0 ? parseInt(inputs.limit) : 10;
    let query = "";
    if (inputs.email) query = inputs.email;
    if (inputs.username) query = query ? (query + " " + inputs.username) : inputs.username;

    //update the user new data
    try {
      const { hits } = await algoliaIndex.search(query, {
        page,
        hitsPerPage
      });
      const users = _.map(hits, _.partialRight(_.pick, ['id', 'username', 'email', 'age']));

      return this.res.successResponse({
        message: this.req.i18n.__("mission_success"),
        data: { users }
      });
    } catch (error) {
      return this.res.serverError({
        message: this.req.i18n.__("server_error"),
        data: { error },
      });
    }
  },
};
