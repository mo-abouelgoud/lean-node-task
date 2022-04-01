module.exports = {
  friendlyName: "get scheduled appointment",
  description: "get scheduled appointment",

  inputs: {
    date: {
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
      .where("date", "==", inputs.date)
      .get();

    byDayQuerySnapshot.forEach((doc) => {
      let data = doc.data();
      data.docId = doc.id;
      sheduledAppointmentsDoc = data;
    });

    if (! sheduledAppointmentsDoc) return exits.success(null);

    if (inputs.index) {
      return exits.success(sheduledAppointmentsDoc.appointmentsServices[inputs.index]);
    } else {
      return exits.success(sheduledAppointmentsDoc);
    }
  },
};
