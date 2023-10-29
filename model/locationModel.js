const { db, store } = require("../firebase");
const {
  collection,
  doc,
  getDoc,
  where,
  query,
  getDocs,
} = require("firebase/firestore");
const axios = require('axios');

const apiKey = process.env.GMAPS_API_KEY;

class locationModel {
  static async getPostmen(poID) {
    let postmen = [];
    
    const q = query(
      collection(db, "employees"),
      where("role", "==", "postman"),
      where("postoffice", "==", poID)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      postmen.push(doc.id);
    });

    return postmen;
  }

  static async getAddressByID(addressID) {
    const docRef = doc(db, "Address", addressID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("Address does not exist");
    }
  }


  static async getPostOfficeLocation(poID) {
    const docRef = doc(db, "Postoffice", poID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().Location;
    } else {
      throw new Error("Post Office does not exist");
    }

  }


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

  static async getDistance(origin, dest) {
    let [originLat, originLng] = origin
    let [destLat, destLng] = dest

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destLat},${destLng}&mode=driving&key=${apiKey}`
      );
  
      if (response.status === 200) {
        const route = response.data.routes[0];
        const distanceText = route.legs[0].distance.text;
        const distanceFloat = parseFloat(distanceText.replace(/[^0-9.]/g, ''));
        return distanceFloat;
      } else {
        throw new Error('Error fetching directions');
      }
    } catch (error) {
      throw error;
    }
  }
  
}

module.exports = locationModel;
