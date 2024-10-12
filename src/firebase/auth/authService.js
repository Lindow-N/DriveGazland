import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";
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
    return user; // Retourne l'utilisateur connecté
  } catch (error) {
    console.error("Erreur de connexion : ", error);
    throw error; // Remonte l'erreur pour être gérée par le composant appelant
  }
};

// Fonction pour vérifier si un utilisateur est validé
export const isUserValidated = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (!userDoc.exists()) {
    throw new Error("Utilisateur introuvable.");
  }

  const userData = userDoc.data();
  return userData.isValidated; // Retourne l'état de validation
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
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
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    throw error;
  }
};
