const functions = require("firebase-functions");
const DeleteSchedualedAppointments = require("./delete-shedualed-appointment/delete-schedualed-appointment");
const Appointments = require("./utilities/appointments");
const { getSetting } = require("./utilities/get-settings");

// FireStore Init()
const { db_connection } = require("./utilities/db-connection");
global.db = db_connection();

const getHourseMunitesFromTime = (inputTime) => {
  const splitedTime = inputTime.split(':');
  return splitedTime.map(time => parseInt(time));
};


exports.onChangeUserStatus = functions.https.onRequest(async(req, res) => {//functions.firestore.document('users/{userId}').onUpdate(async(change, context) => {

 /**
 * For Test purpose
 *
 * // functions.https.onRequest(async(req, res) => {
 *
 * // const userId = req.query.id;
 *
 * // const status = false;
 *
 * // res.send("Done");
 */

  const newUserData = change.after.data();
  const userId = newUserData.id;
  const status = newUserData.status;

  if (!status) {
    // Delete user scheduled appointments
    const appointmentsArray = await Appointments.getProgressAppointmentsToUser(userId);

    const settingsDoc = await getSetting();

    for (const appointment of appointmentsArray) {
      const [inputTimeHours, inputTimeMinutes] = getHourseMunitesFromTime(appointment.time);
      const [startTimeHours, startTimeMinutes] = getHourseMunitesFromTime(settingsDoc.startTime);
      const diffMinutesBetweenInputAndStart = ((inputTimeHours - startTimeHours) * 60)
        + (inputTimeMinutes - startTimeMinutes);
      const scheduledIndex = parseInt(diffMinutesBetweenInputAndStart / parseInt(settingsDoc.slotTime));
      await DeleteSchedualedAppointments.removeAppointmentServiceFromScheduale(scheduledIndex, appointment.id, appointment.service, appointment.date);
      await Appointments.setAppointmentStatus(appointment.docId, "Blocked");
    }
  }
})

exports.onDeleteUser = functions.firestore.document('users/{userId}').onDelete(async(snap, context) => {

   const deletedUserData = snap.data();
   const userId = deletedUserData.id;

    // Delete user scheduled appointments
    const appointmentsArray = await Appointments.getProgressAppointmentsToUser(userId);

    const settingsDoc = await getSetting();

    for (const appointment of appointmentsArray) {
      const [inputTimeHours, inputTimeMinutes] = getHourseMunitesFromTime(appointment.time);
      const [startTimeHours, startTimeMinutes] = getHourseMunitesFromTime(settingsDoc.startTime);
      const diffMinutesBetweenInputAndStart = ((inputTimeHours - startTimeHours) * 60)
        + (inputTimeMinutes - startTimeMinutes);
      const scheduledIndex = parseInt(diffMinutesBetweenInputAndStart / parseInt(settingsDoc.slotTime));
      await DeleteSchedualedAppointments.removeAppointmentServiceFromScheduale(scheduledIndex, appointment.id, appointment.service, appointment.date);
      await Appointments.setAppointmentStatus(appointment.docId, "Deleted");
    }
 })
