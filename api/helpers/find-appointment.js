module.exports = {
  friendlyName: "find appointment object Or Some appointments",
  description: "find appointment object Or Some appointments",

  inputs: {
    id: {
      type: "string",
    },
    userId: {
      type: "string",
    },
    status: {
      type: "string",
    },
    date: {
      type: "string"
    }
  },

  exits: {
    invalid: {
      responseType: "badRequest",
      description: "The provided data are invalid.",
    },
  },

  fn: async function (inputs, exits) {
    let appointmentsArray = [];

    const appointmentsRef = db.collection("appointments");

    if (inputs.userId && inputs.date) {
      const byIdDateQuerySnapshot = await appointmentsRef
        .where("user", "==", inputs.userId)
        .where("date", "==", inputs.date)
        .where("status", "==", "inProgress")
        .get();

      byIdDateQuerySnapshot.forEach((doc) => {
        let data = doc.data();
        data.docId = doc.id;
        appointmentsArray.push(data);
      });
    } else if (inputs.id) {
      const byIdQuerySnapshot = await appointmentsRef
        .where("id", "==", inputs.id)
        .get();

      byIdQuerySnapshot.forEach((doc) => {
        let data = doc.data();
        data.docId = doc.id;
        appointmentsArray.push(data);
      });
    } else if (inputs.userId) {
      const byUserIdQuerySnapshot = await appointmentsRef
        .where("user", "==", inputs.userId)
        .get();

      byUserIdQuerySnapshot.forEach((doc) => {
        let data = doc.data();
        data.docId = doc.id;
        appointmentsArray.push(data);
      });
    } else if (inputs.status) {
      const byStatusQuerySnapshot = await appointmentsRef
        .where("status", "==", inputs.status)
        .get();

      byStatusQuerySnapshot.forEach((doc) => {
        let data = doc.data();
        data.docId = doc.id;
        appointmentsArray.push(data);
      });
    } else if (inputs.date) {
      const byDateQuerySnapshot = await appointmentsRef
        .where("date", "==", inputs.date)
        .get();

      byDateQuerySnapshot.forEach((doc) => {
        let data = doc.data();
        data.docId = doc.id;
        appointmentsArray.push(data);
      });
    } else {
      const allAppointmentsQuerySnapshot = await appointmentsRef
        .get();

      allAppointmentsQuerySnapshot.forEach((doc) => {
        let data = doc.data();
        data.docId = doc.id;
        appointmentsArray.push(data);
      });
    }

    return exits.success(appointmentsArray);
  },
};
