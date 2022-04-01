
const validateTimeInFram = (inputTime, systemTime={}, exits) => {
  const [inputTimeHours, inputTimeMinutes] = getHourseMunitesFromTime(inputTime, exits);
  if (inputTimeHours < systemTime.startTimeHours
    || inputTimeHours > systemTime.endTimeHours) {
    return exits.success({errorHappened: 'appointment_time_fram_validation'});
  }
  if (inputTimeHours === systemTime.startTimeHours) {
    if (inputTimeMinutes < systemTime.startTimeMinutes) {
      // Time can not be before start time
      return exits.success({errorHappened: 'time_before_start_error'});
    }
  } else if (inputTimeHours === systemTime.endTimeHours) {
    if (inputTimeMinutes > systemTime.endTimeMinutes) {
      // Time can not be after end time
      return exits.success({errorHappened: 'time_after_end_error'});
    }
  }
  const diffMinutesBetweenInputAndStart = ((inputTimeHours - systemTime.startTimeHours) * 60)
      + (inputTimeMinutes - systemTime.startTimeMinutes);
  if (diffMinutesBetweenInputAndStart < systemTime.timeSlot) {
    // Not valid time
    return exits.success({errorHappened: 'not_valid_time'});
  } else if (diffMinutesBetweenInputAndStart % systemTime.timeSlot !== 0) {
    // Not Valid Time
    return exits.success({errorHappened: 'not_valid_time'});
  }
  return { diffMinutesBetweenInputAndStart };
};

const getHourseMunitesFromTime = (inputTime, exits) => {
  const splitedTime = inputTime.split(':');
  if (splitedTime.length !== 2) {
    return exits.success({errorHappened: 'invalid_date_format'});
  }
  return splitedTime.map(time => parseInt(time));
};

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
    let [startTimeHours, startTimeMinutes] = getHourseMunitesFromTime(settingsDoc.startTime, exits);
    let [endTimeHours, endTimeMinutes] = getHourseMunitesFromTime(settingsDoc.endTime, exits);
    let diffInMinutes = 0;
    if (startTimeHours > endTimeHours) {
      endTimeHours += 12;
    }
    diffInMinutes = ((endTimeHours - startTimeHours) * 60)
      + (endTimeMinutes - startTimeMinutes);
    if (diffInMinutes <= 0
      || diffInMinutes < parseInt(settingsDoc.slotTime)
      || parseInt(settingsDoc.slotTime) === 0) {
      return exits.success({errorHappened: 'error_happened'});
    }
    const { diffMinutesBetweenInputAndStart } = validateTimeInFram(inputs.time, { startTimeHours, startTimeMinutes,
      endTimeHours, endTimeMinutes, timeSlot: parseInt(settingsDoc.slotTime) }, exits)
    const appointmentSchedualeLength = parseInt(diffInMinutes / parseInt(settingsDoc.slotTime));

    const appointmentIndex = parseInt(diffMinutesBetweenInputAndStart / parseInt(settingsDoc.slotTime));
    return exits.success({ appointmentIndex, appointmentSchedualeLength });
  },
};
