

class SchedualedAppointments {

  static async getSchedualedAppointment(date) {
    let sheduledAppointmentsDoc = null;
    const sheduledAppointmentsRef = db.collection("scheduledappointments");
    const byDayQuerySnapshot = await sheduledAppointmentsRef
      .where("date", "==", date)
      .get();

    byDayQuerySnapshot.forEach((doc) => {
      let data = doc.data();
      data.docId = doc.id;
      sheduledAppointmentsDoc = data;
    });
    return sheduledAppointmentsDoc;
  }

  static async setSchedualedAppointment(docId, newSheduledAppointmentsDoc) {
    return db.collection("scheduledappointments")
      .doc(docId)
      .set(newSheduledAppointmentsDoc, { merge: true });
  }

}

module.exports = SchedualedAppointments;
