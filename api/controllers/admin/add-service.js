module.exports = {
  friendlyName: "Add Service in hospital",
  description: "Add Service in hospital",

  inputs: {
    serviceName: {
      type: "string",
      required: true,
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

    const _serviceObject = {
      id: sails.helpers.randomCryptoString.with({ size: 32 }),
      name: inputs.serviceName,
      isActive: true,
      signature: sails.helpers.getSignature.with({ id: this.req.user.id })
    };

    const serviceRef = db.collection("services");

    try {
      let duplicatedServices = [];
      const services = await serviceRef
        .where("name", "==", inputs.serviceName)
        .get();
      services.forEach((doc) => {
        let data = doc.data();
        duplicatedServices.push(data);
      });
      if (duplicatedServices.length) {
        return this.res.badRequest({ message: this.req.i18n.__("duplicated_service") });
      }
      const serviceDoc = await db.collection("services").add(_serviceObject);

      return this.res.successResponse({
        message: this.req.i18n.__("mission_success"),
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
