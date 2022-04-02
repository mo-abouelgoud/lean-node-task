const SchedualedAppointments = require("../utilities/schedualed-appointments");


class DeleteSchedualedAppointments {

  static async removeAppointmentServiceFromScheduale(schedualeIndex, appointmentId, serviceId, appointmentDay) {

    const sheduledAppointmentsDoc = await SchedualedAppointments.getSchedualedAppointment(appointmentDay);

    sheduledAppointmentsDoc.appointmentsServices[schedualeIndex].appointmentsIds = DeleteSchedualedAppointments
      .removeItemFromArray(sheduledAppointmentsDoc.appointmentsServices[schedualeIndex].appointmentsIds, appointmentId);

    sheduledAppointmentsDoc.appointmentsServices[schedualeIndex].servicesIds = DeleteSchedualedAppointments
      .removeItemFromArray(sheduledAppointmentsDoc.appointmentsServices[schedualeIndex].servicesIds, serviceId);

    const docId = sheduledAppointmentsDoc.docId;
    delete sheduledAppointmentsDoc.docId;
    return SchedualedAppointments.setSchedualedAppointment(docId, sheduledAppointmentsDoc);
  }

  static removeItemFromArray(array, itemToRemove) {
    const itemIndex = array.indexOf(itemToRemove);
    if (itemIndex !== -1) {
      array.splice(itemIndex, 1);
    }
    return array;
  }

}

module.exports = DeleteSchedualedAppointments;
