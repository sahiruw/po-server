const { initializeApp, getApps, getApp } = require("firebase/app");
const {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
} = require("firebase/firestore");
const { getStorage } = require("firebase/storage");


const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
if (!getApps().length) {
  console.log("Initializing Firebase");
  const app = initializeApp(firebaseConfig);

  console.log("Initializing Firestore");
  initializeFirestore(app, {
    persistence: persistentLocalCache,
  });
  console.log("Firebase Initialized");
}

const app = getApp();

const db = getFirestore(app);
const store = getStorage(app);

// export { db, store };
module.exports = { db, store };
