module.exports = {
  friendlyName: "show settings details",
  description: "show settings details",

  inputs: {
    startTime: {
      type: "string",
      defaultsTo: "",
    },

    endTime: {
      type: "string",
      defaultsTo: "",
    },
    slotTime: {
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
    const settingsRef = db.collection("settings");

    let _object = {
      startTime: inputs.startTime,
      endTime: inputs.endTime,
      slotTime: inputs.slotTime,
    };

    //update the user new data
    try {
      let updateSettings = await settingsRef
        .doc("settings")
        .set(_object, { merge: true });

      return this.res.successResponse({
        message: this.req.i18n.__("mission_success"),
      });
    } catch (error) {
      return this.res.serverError({
        message: this.req.i18n.__("server_error"),
        data: { error },
      });
    }
  },
};
