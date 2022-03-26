module.exports = {
  friendlyName: "find service object Or Some Services",
  description: "find service object Or Some Services",

  inputs: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    isActive: {
      type: "string",
    },
  },

  exits: {
    invalid: {
      responseType: "badRequest",
      description: "The provided data are invalid.",
    },
  },

  fn: async function (inputs, exits) {
    let servicesArray = [];

    const servicesRef = db.collection("services");

    if (inputs.id) {
      const byIdQuerySnapshot = await servicesRef
        .where("id", "==", inputs.id)
        .get();

      byIdQuerySnapshot.forEach((doc) => {
        let data = doc.data();
        data.docId = doc.id;
        servicesArray.push(data);
      });
    } else if (inputs.isActive) {
      const byIsActiveQuerySnapshot = await servicesRef
        .where("isActive", "==", inputs.isActive)
        .get();

      byIsActiveQuerySnapshot.forEach((doc) => {
        let data = doc.data();
        data.docId = doc.id;
        servicesArray.push(data);
      });
    } else if (inputs.name) {
      const byNameQuerySnapshot = await servicesRef
        .where("name", "==", inputs.name)
        .get();

        byNameQuerySnapshot.forEach((doc) => {
        let data = doc.data();
        data.docId = doc.id;
        servicesArray.push(data);
      });
    } else {
      const allServicesQuerySnapshot = await servicesRef
        .get();

        allServicesQuerySnapshot.forEach((doc) => {
        let data = doc.data();
        data.docId = doc.id;
        servicesArray.push(data);
      });
    }

    return exits.success(servicesArray);
  },
};
