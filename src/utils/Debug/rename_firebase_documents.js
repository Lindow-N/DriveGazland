import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export const renameDocument = async (oldDocId, newDocId, collectionName) => {
  try {
    // Lire l'ancien document
    const oldDocRef = doc(db, collectionName, oldDocId);
    const oldDocSnap = await getDoc(oldDocRef);

    if (oldDocSnap.exists()) {
      const data = oldDocSnap.data();

      // Créer le nouveau document avec l'ID souhaité
      const newDocRef = doc(db, collectionName, newDocId);
      await setDoc(newDocRef, data);

      // Supprimer l'ancien document
      await deleteDoc(oldDocRef);

      console.log(`Le document a été renommé de ${oldDocId} à ${newDocId}`);
    } else {
      console.log("L'ancien document n'existe pas.");
    }
  } catch (error) {
    console.error("Erreur lors du renommage du document :", error);
  }
};

// Renommer les deux documents comme demandé
renameDocument("KbJFejMeVuJbgHyhyhi9", "affiche", "tags");
renameDocument("cYNxJOa2gf5DZ0M9tbH1", "casi", "tags");
