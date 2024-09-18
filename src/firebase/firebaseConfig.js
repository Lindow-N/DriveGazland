import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import du Storage

const firebaseConfig = {
  apiKey: "AIzaSyA3nabauSNn32rLpKIkT5BoPnH8GYBMgEo",
  authDomain: "drivegazland.firebaseapp.com",
  projectId: "drivegazland",
  storageBucket: "drivegazland.appspot.com",
  messagingSenderId: "159250775284",
  appId: "1:159250775284:web:1a9bb56fcbd44938a832a1",
  measurementId: "G-0TF1NK3MC2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialisation du Storage
