const canUserMakeAppointment = (sameDayAppointments, serviceId) => {
  if (sameDayAppointments.length === 0) return { isAllowed: true };
  if (sameDayAppointments.length > 2) return { isAllowed: false, message: "max_day_appointments" };
  for (const appointment of sameDayAppointments) {
    if (appointment.service === serviceId) {
      return { isAllowed: false, message: "max_service_appointments" };
    }
  }
  return { isAllowed: true };
};

const setSchedualedAppointments = (oldSchedualed, appointmentIndex, appointmentId, appointmentSchedualeLength, date, serviceId) => {
  if (oldSchedualed) {
    oldSchedualed.appointments[appointmentIndex] = appointmentId;
  } else {
    const appointments = new Array(appointmentSchedualeLength).fill(null);
    appointments[appointmentIndex] = appointmentId;
    oldSchedualed = {
      date,
      appointments,
      service: serviceId
    };
  }
  return db.collection("scheduledappointments").add(oldSchedualed);
};

module.exports = {
  friendlyName: "Add new appointment",
  description: "Add new appointment",

  inputs: {
    serviceId: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
      required: true,
    },
    time: {
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
    let _appointmentObject = {
      id: sails.helpers.randomCryptoString.with({ size: 32 }),
      date: inputs.date,
      time: inputs.time,
      service: inputs.serviceId,
      user: this.req.user.id,
      status: "inProgress"
    };

    try {
      const userAppointments = await sails.helpers.findAppointment
        .with({ userId: this.req.user.id, date: inputs.date });

      const { isAllowed, message } = canUserMakeAppointment(userAppointments, inputs.serviceId);
      if (!isAllowed) {
        return this.res.validationError({ message: this.req.i18n.__(message) });
      }

      const { appointmentIndex, appointmentSchedualeLength } = await sails.helpers.getAppointmentIndex
        .with({ time: inputs.time });
      let scheduledAppointmentDay = await sails.helpers.getScheduledAppointments
        .with({ day: inputs.date });
      if (scheduledAppointmentDay && scheduledAppointmentDay.appointments[appointmentIndex]) {
        return this.res.validationError({
          message: this.req.i18n.__("reserved_appointment")
        });
      } else {
        const appointmentDoc = await db.collection("appointments").add(_appointmentObject);
        const scheduleAppointmentDoc = await setSchedualedAppointments(scheduledAppointmentDay,
          appointmentIndex, _appointmentObject.id,
          appointmentSchedualeLength, _appointmentObject.date, inputs.serviceId)
      }

      return this.res.successResponse({
        message: this.req.i18n.__("mission_success")
      });
    } catch (error) {
      return this.res.serverError({
        message: this.req.i18n.__("server_error"),
        data: { error },
      });
    }
  },
  /**@todo
   * Sorry but i have no time to complete task
   * But i can write Pseudocode for what i have in my mind
   * I imagin a new table called scheduled appointments have
   * { date: the date of the day,
   * service: appointments of exact service
   * appointments: [] "array of appointments divided into valid time slots" }
   * when i need to make validation to a time slot
   * i have to clac the index of it in array of appointments
   * then trying to check if index have value or null
   * if has value then it is reserved else its free
   * we can set appointments index of exact service on exact day by a cloud function
   * By the same way we can delete appointment if user deactivated
   */
};
