const getFreeAppointmentsInSpecificDay = async(date, availableServices, freeAppointments) => {
  const scheduledDayAppointments = await sails.helpers.getScheduledAppointments
    .with({ date });
  if (!scheduledDayAppointments) {
    freeAppointments.push({
      date,
      availableTimes: {
        time: 'All Day Is Free',
        availableServices
      }
    });
  } else {
    const availableTimes = await getAvailableTimesForServices(availableServices, scheduledDayAppointments.appointmentsServices);
    freeAppointments.push({
      date,
      availableTimes
    });
  }
};

const getAvailableTimesForServices = async(availableServices, appointmentsServices) => {
  let availableTimes = [];
  let settingsDoc = null;

  const settingsQuerySnapshot = await db.collection("settings")
    .get();
  settingsQuerySnapshot.forEach((doc) => {
    let data = doc.data();
    data.docId = doc.id;
    settingsDoc = data;
  });
  for (let i = 0; i < appointmentsServices.length; i++) {
    const time = getTimeFromIndex(i, settingsDoc.startTime, settingsDoc.slotTime);
    if (appointmentsServices[i]) {
      let freeServices = [];
      for (const service of availableServices) {
        if (!appointmentsServices[i].servicesIds.includes(service.id)) {
          freeServices.push(service);
        }
      }
      if (freeServices.length !== 0) {
        availableTimes.push({
          time,
          availableServices: freeServices
        });
      }
    } else {
      availableTimes.push({
        time,
        availableServices
      });
    }
  }
  return availableTimes;
};

const getTimeFromIndex = (index, startTime, timeSlot) => {
  const toAddHours = parseInt((index * timeSlot) / 60);
  const toAddMinutes = parseInt((index * timeSlot) % 60);
  const newTimeHours = parseInt(startTime.split(':')[0]) + toAddHours;
  const newTimeMinutes = parseInt(startTime.split(':')[1]) + toAddMinutes;
  return `${newTimeHours.toLocaleString('en-US', { minimumIntegerDigits: 2 })}:${newTimeMinutes.toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;
}

const convertToDateSchema = (date) => {
  return date.toISOString().split('T')[0];
};

module.exports = {
  friendlyName: "get nearst free appointments in 3 days",
  description: "get nearst free appointments in 3 days",

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
    try {
      const servicesDocs = await sails.helpers.findService
        .with({});
      const services = _.map(servicesDocs, _.partialRight(_.pick, ['id', 'name']));
      let initialDateTimeFormat = new Date();
      let freeAppointments = [];
      let initialDate = convertToDateSchema(initialDateTimeFormat);
      await getFreeAppointmentsInSpecificDay(initialDate, services, freeAppointments);
      for (let i = 0; i < 2; i++) {
        initialDateTimeFormat = new Date(initialDateTimeFormat.setDate(initialDateTimeFormat.getDate() + 1));
        initialDate = convertToDateSchema(initialDateTimeFormat);
        await getFreeAppointmentsInSpecificDay(initialDate, services, freeAppointments);
      }
      return this.res.successResponse({
        message: this.req.i18n.__("mission_success"),
        data: { freeAppointments },
      });
    } catch (error) {
      return this.res.serverError({
        message: this.req.i18n.__("server_error"),
        data: { error },
      });
    }
  },
};
