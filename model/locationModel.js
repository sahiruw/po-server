const { db, store } = require("../firebase");
const {
  collection,
  doc,
  getDoc,
  where,
  query,
  getDocs,
} = require("firebase/firestore");

class locationModel {
  static async getRegions(poID) {
    let regions = [];
    //get documents from Region where postoffice_id=poID and push the id of each doc to regions
    const q = query(
      collection(db, "Region"),
      where("postoffice_id", "==", poID)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      regions.push(doc.id);
    });

    return regions;
  }

  static async getAddressesofRegion(regionIDs) {
    let addresses = [];
    let addressData = {};
      let q = query(
        collection(db, "Address"),
        where("RegionID", "in", regionIDs)
      );
      let querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        addresses.push(doc.id);
        addressData[doc.id] = doc.data();
      });
    

    return {addresses, addressData};
  }
}

module.exports = locationModel;
