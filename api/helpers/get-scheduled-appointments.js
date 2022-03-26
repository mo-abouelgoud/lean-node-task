module.exports = {
  friendlyName: "get scheduled appointment",
  description: "get scheduled appointment",

  inputs: {
    day: {
      type: "string",
      require: true
    },
    serviceId: {
      type: "string",
      require: true
    },
    index: {
      type: "string",
    },
  },

  exits: {
    invalid: {},
  },

  fn: async function (inputs, exits) {
    let sheduledAppointmentsDoc = null;

    const sheduledAppointmentsRef = db.collection("scheduledappointments");

    const byDayQuerySnapshot = await sheduledAppointmentsRef
      .where("day", "==", inputs.day)
      .where("service", "==", inputs.serviceId)
      .get();

    byDayQuerySnapshot.forEach((doc) => {
      let data = doc.data();
      data.docId = doc.id;
      sheduledAppointmentsDoc = data;
    });

    if (! sheduledAppointmentsDoc) return exits.success(null);

    if (inputs.index) {
      return exits.success(sheduledAppointmentsDoc.appointments[inputs.index]);
    } else {
      return exits.success(sheduledAppointmentsDoc.appointments);
    }
  },
};
