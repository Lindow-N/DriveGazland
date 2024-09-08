import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export const registerUser = async (email, password, pseudonym) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      id: user.uid,
      pseudonym: pseudonym,
      isValidated: false,
      totalFileUploads: 0,
      creationDate: new Date(),
      recentFiles: [],
      achievements: {},
      createdTags: [],
      favorites: [],
    });

    return user;
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'utilisateur ou du document Firestore : ",
      error
    );
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Connexion réussie : ", user);
    return user;
  } catch (error) {
    console.error("Erreur de connexion : ", error);
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Email de réinitialisation envoyé à : ", email);
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de réinitialisation : ",
      error
    );
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("Déconnexion réussie.");
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    throw error;
  }
};
