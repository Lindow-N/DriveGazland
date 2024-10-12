import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

// Référence à la collection "linkedTags"
const linkedTagsCollection = collection(db, "linkedTags");

export const createLinkedTagGroup = async (groupName, tags) => {
  try {
    const newGroup = {
      group: groupName,
      tags: tags, // Les tags que tu veux ajouter au groupe
    };

    const docRef = await addDoc(linkedTagsCollection, newGroup);
    return docRef.id; // Retourne l'ID du nouveau document
  } catch (error) {
    console.error("Erreur lors de la création du groupe de tags :", error);
    throw error;
  }
};

// Fonction pour ajouter un tag dans un groupe existant
export const addTagToGroup = async (groupId, newTag) => {
  try {
    const groupDocRef = doc(db, "linkedTags", groupId);

    // Ajouter le tag dans le tableau `tags`
    await updateDoc(groupDocRef, {
      tags: arrayUnion(newTag),
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du tag :", error);
    throw error;
  }
};

// Fonction pour retirer un tag d'un groupe existant
export const removeTagFromGroup = async (groupId, tagToRemove) => {
  try {
    const groupDocRef = doc(db, "linkedTags", groupId);

    // Retirer le tag du tableau `tags`
    await updateDoc(groupDocRef, {
      tags: arrayRemove(tagToRemove),
    });

    // Vérifie si le groupe n'a plus de tags, puis supprime le groupe
    const groupDoc = await getDoc(groupDocRef);
    const groupData = groupDoc.data();

    if (groupData && groupData.tags.length === 0) {
      await deleteLinkedTagGroup(groupId); // Supprime le groupe s'il n'y a plus de tags
    }
  } catch (error) {
    console.error("Erreur lors du retrait du tag :", error);
    throw error;
  }
};

// Fonction pour supprimer un groupe entier
export const deleteLinkedTagGroup = async (groupId) => {
  try {
    const groupDocRef = doc(db, "linkedTags", groupId);

    // Suppression du document (groupe)
    await deleteDoc(groupDocRef);
  } catch (error) {
    console.error("Erreur lors de la suppression du groupe :", error);
    throw error;
  }
};

// Fonction pour récupérer un groupe par son ID
export const getLinkedTagGroupById = async (groupId) => {
  try {
    const groupDocRef = doc(db, "linkedTags", groupId);
    const groupDoc = await getDoc(groupDocRef);

    if (groupDoc.exists()) {
      return groupDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du groupe :", error);
    throw error;
  }
};
