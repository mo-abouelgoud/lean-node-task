module.exports = {
  friendlyName: "find appointment index from its time",
  description: "find appointment index from its time",

  inputs: {
    time: {
      type: "string",
    }
  },

  exits: {
    invalid: {},
  },

  fn: async function (inputs, exits) {
    let settingsDoc = null;

    const settingsRef = db.collection("settings");

    const settingsQuerySnapshot = await settingsRef
      .get();
    settingsQuerySnapshot.forEach((doc) => {
      let data = doc.data();
      data.docId = doc.id;
      settingsDoc = data;
    });
    let startTimeHours = parseInt(settingsDoc.startTime.split(":")[0]);
    let startTimeMinutes = parseInt(settingsDoc.startTime.split(":")[1]);
    let endTimeHours = parseInt(settingsDoc.endTime.split(":")[0]);
    let endTimeMinutes = parseInt(settingsDoc.endTime.split(":")[1]);
    let diffInMinutes = 0;
    if (startTimeHours > endTimeHours) {
      endTimeHours += 12;
    }
    diffInMinutes = Math.abs(parseInt((endTimeHours - startTimeHours) * 60)
      + Math.abs(endTimeMinutes - startTimeMinutes));
    if (diffInMinutes <= 0
      || diffInMinutes < parseInt(settingsDoc.slotTime)
      || parseInt(settingsDoc.slotTime) === 0) {
      return exits.invalid(req.i18n.__("error_happened"));
    }
    const appointmentSchedualeLength = parseInt(diffInMinutes / parseInt(settingsDoc.slotTime));

    const inputTimeHours = parseInt(inputs.time.split(":")[0]);
    const inputTimeMinutes = parseInt(inputs.time.split(":")[1]);
    let diffMinutesBetweenInputAndStart = 0;
    if (startTimeHours > inputTimeHours) {
      endTimeHours += 12;
    }
    diffMinutesBetweenInputAndStart = Math.abs(parseInt((inputTimeHours - startTimeHours) * 60)
      + Math.abs(inputTimeMinutes - startTimeMinutes));
    if (diffMinutesBetweenInputAndStart <= 0) {
      return exits.success({appointmentIndex: 0, appointmentSchedualeLength});
    } else {
      const appointmentIndex = parseInt(diffMinutesBetweenInputAndStart / parseInt(settingsDoc.slotTime));
      return exits.success({ appointmentIndex, appointmentSchedualeLength });
    }
  },
};
