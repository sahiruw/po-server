const admin = require('firebase-admin');

// import service account file (helps to know the firebase project details)
const serviceAccount = require("./pomis-g6-firebase-adminsdk-5x0nn-03325c9228.json");

// Intialize the firebase-admin project/account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



module.exports = {admin}
