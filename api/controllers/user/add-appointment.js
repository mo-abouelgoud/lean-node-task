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

const setSchedualedAppointments = (oldSchedualed,
  { appointmentIndex, appointmentId, appointmentSchedualeLength,
    appointmentDate, appointmentTime },serviceId) => {
  if (oldSchedualed) {
    const docId = oldSchedualed.docId;
    if (oldSchedualed.appointmentsServices[appointmentIndex]) {
      oldSchedualed.appointmentsServices[appointmentIndex].appointmentsIds.push(appointmentId);
      oldSchedualed.appointmentsServices[appointmentIndex].servicesIds.push(serviceId);
    } else {
      oldSchedualed.appointmentsServices[appointmentIndex] = {
        appointmentsIds: [appointmentId],
        servicesIds: [serviceId],
        appointmentTime };
    }
    delete oldSchedualed.docId;
    return db.collection("scheduledappointments")
      .doc(docId)
      .set(oldSchedualed, { merge: true });
  } else {
    const appointmentsServices = new Array(appointmentSchedualeLength).fill(null);
    appointmentsServices[appointmentIndex] = {
      appointmentsIds: [appointmentId],
      servicesIds: [serviceId],
      appointmentTime };
    oldSchedualed = {
      id: sails.helpers.randomCryptoString.with({ size: 32 }),
      appointmentsServices,
      date: appointmentDate
    };
    return db.collection("scheduledappointments").add(oldSchedualed);
  }
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

      if (new Date(inputs.date).toDateString() === new Date().toDateString()) {
        if (parseInt(inputs.time.split(':')[0]) < new Date().getHours()) {
          // not allowed to reserve a past time
          return this.res.validationError({ message: this.req.i18n.__("past_time_validation") });
        } else if (parseInt(inputs.time.split(':')[0]) === new Date().getHours()) {
          if (parseInt(inputs.time.split(':')[1]) < new Date().getMinutes()) {
            // not allowed to reserve a past time
            return this.res.validationError({ message: this.req.i18n.__("past_time_validation") });
          }
        }
      }

      const { appointmentIndex, appointmentSchedualeLength, errorHappened } = await sails.helpers.getAppointmentIndex
        .with({ time: inputs.time });

      /**@todo
       * Custom AppError
       */
      if (errorHappened) {
        return this.res.validationError({
          message: this.req.i18n.__(errorHappened)
        });
      }

      let scheduledDayAppointments = await sails.helpers.getScheduledAppointments
        .with({ date: inputs.date });
      if (scheduledDayAppointments
        && scheduledDayAppointments.appointmentsServices[appointmentIndex]
        && scheduledDayAppointments.appointmentsServices[appointmentIndex].servicesIds.includes(inputs.serviceId)) {
        return this.res.validationError({
          message: this.req.i18n.__("reserved_appointment")
        });
      } else {
        const appointmentDoc = await db.collection("appointments").add(_appointmentObject);
        const scheduleAppointmentDoc = await setSchedualedAppointments(scheduledDayAppointments,
          { appointmentIndex, appointmentId: _appointmentObject.id,
            appointmentSchedualeLength, appointmentDate: _appointmentObject.date,
            appointmentTime: _appointmentObject.time }, inputs.serviceId);
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
};
