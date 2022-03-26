module.exports = {
  friendlyName: "get services details",
  description: "get services details",

  inputs: {},

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
    const servicesRef = db.collection("services");

    try {
      let servicesDocs = [];
      const dbServices = await servicesRef
      .where("isActive", "==", true)
      .get();
      dbServices.forEach((doc) => {
        let data = doc.data();
        servicesDocs.push(data);
      });
      const services = _.map(servicesDocs, _.partialRight(_.pick, ['id', 'name']));

      return this.res.successResponse({
        message: this.req.i18n.__("mission_success"),
        data: { services }
      });
    } catch (error) {
      console.log(error);
      return this.res.serverError({
        message: this.req.i18n.__("server_error"),
        data: { error },
      });
    }
  },
};
