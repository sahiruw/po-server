const { db, store } = require("../firebase");
const {
  collection,
  doc,
  getDoc,
  where,
  query,
  getDocs,
  setDoc,
} = require("firebase/firestore");
const dateUtils = require("../utils/dateUtils");

class routeModel {
  static async addRouteToDatabase(classifiedMailItems) {
    try {
      // Add a new document with id as today.
      let date = dateUtils.getToday();
      let docRef = await doc(db, "Route", date);
      await setDoc(docRef, classifiedMailItems);

      console.log("Route created");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = routeModel;
