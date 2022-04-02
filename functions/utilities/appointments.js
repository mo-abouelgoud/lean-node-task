
class GetAppointments {
  static async getProgressAppointmentsToUser(userId) {
    let appointmentsArray = [];
    const byUserIdQuerySnapshot = await db.collection("appointments")
    .where("user", "==", userId)
    .where("status", "==", "inProgress")
    .get();

    byUserIdQuerySnapshot.forEach((doc) => {
      let data = doc.data();
      data.docId = doc.id;
      appointmentsArray.push(data);
    });
    return appointmentsArray;
  }

  static async setAppointmentStatus(docId, status) {
    return db.collection("appointments")
      .doc(docId)
      .set({ status }, { merge: true });
  }
}

module.exports = GetAppointments;
