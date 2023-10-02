const { db, store } = require("../firebase");
const {
  collection,
  doc,
  getDoc,
  where,
  query,
  getDocs,
  updateDoc,
} = require("firebase/firestore");

const Constants = require("../utils/constants");

class mailItemModel {
  static async getMailItemsForRegion(addressIDs, addressData) {
    // const statusValues = [
    //   Constants.MailItemStatus.TobeDelivered,
    // ];
    const chunkSize = 15; // Maximum number of values per query

    const chunks = [];
    for (let i = 0; i < addressIDs.length; i += chunkSize) {
      const chunk = addressIDs.slice(i, i + chunkSize);
      chunks.push(chunk);
    }

    const queries = chunks.map((chunk) => {
      return query(
        collection(db, "MailServiceItem"),
        where("receiver_address_id", "in", chunk),
        where("status", "==", Constants.MailItemStatus.TobeDelivered)
      );
    });

    const mailItems = [];

    // Execute each query and merge the results
    const executeQueries = async () => {
      for (const query of queries) {
        const querySnapshot = await getDocs(query);
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          let receiver_address = addressData[data.receiver_address_id];
          mailItems.push({ ...data, receiver_address, id: doc.id });
        });
      }
    };

    await executeQueries()
      .then(() => {
        // mailItems now contains the merged results
        // console.log(mailItems);
      })
      .catch((error) => {
        console.error("Error executing queries:", error);
      });

    return mailItems;
  }

  static async markMailItemsAsToBeDelivered() {
    // get all mail items with status "To be Delivered"
    console.log([
        Constants.MailItemStatus.OutforDelivery,
        Constants.MailItemStatus.Failed,
      ])
    const q = query(
        collection(db, "MailServiceItem"),
        where("status", "in", [Constants.MailItemStatus.OutforDelivery, Constants.MailItemStatus.Failed])
      )

      
    //update status to tobedelivered
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, { status: Constants.MailItemStatus.TobeDelivered });
    });
  }
}

module.exports = mailItemModel;