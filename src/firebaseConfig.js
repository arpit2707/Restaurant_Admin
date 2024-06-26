// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9-0_anYMrqHF1cf_P4ybvMdR3L_1Uu-4",
  authDomain: "restaurant-user-e1290.firebaseapp.com",
  projectId: "restaurant-user-e1290",
  storageBucket: "restaurant-user-e1290.appspot.com",
  messagingSenderId: "885082604858",
  appId: "1:885082604858:web:11ffd4dc95b44e1c10fc03",
  measurementId: "G-F2WX1NPC0H",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
