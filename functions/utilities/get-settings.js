
module.exports.getSetting = async() => {
  let settingsDoc = null;

  const settingsRef = db.collection("settings");

  const settingsQuerySnapshot = await settingsRef
    .get();
  settingsQuerySnapshot.forEach((doc) => {
    let data = doc.data();
    data.docId = doc.id;
    settingsDoc = data;
  });
  return settingsDoc;
};
