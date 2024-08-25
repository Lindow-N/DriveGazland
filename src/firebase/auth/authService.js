import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Inscription réussie : ", user);
    return user;
  } catch (error) {
    console.error("Erreur d'inscription : ", error);
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
