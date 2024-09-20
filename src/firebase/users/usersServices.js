import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const updateUserFileCount = async (userId, storagePath) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const newFileCount = (userData.totalFileUploads || 0) + 1;

    let recentFiles = userData.recentFiles || [];

    // On enregistre le storagePath et non l'URL complète
    recentFiles.unshift(storagePath);

    if (recentFiles.length > 3) {
      recentFiles = recentFiles.slice(0, 3);
    }

    await updateDoc(userRef, {
      totalFileUploads: newFileCount,
      recentFiles: recentFiles,
    });
  } else {
    throw new Error("Utilisateur non trouvé");
  }
};

// Fonction pour récupérer les informations de l'utilisateur qui a ajouté le fichier
export const fetchAddedByUser = async (userId) => {
  try {
    if (!userId) {
      return "Utilisateur inconnu";
    }

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData.pseudonym || "Utilisateur inconnu";
    } else {
      return "Utilisateur inconnu";
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return "Erreur utilisateur";
  }
};
