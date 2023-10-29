const { db } = require("../firebase");
const {
  doc,
  getDoc,
} = require("firebase/firestore");


class userModel {
  static async getUserDataByID(uid) {
    try {
      const docRef = doc(db, "employees", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = userModel;
