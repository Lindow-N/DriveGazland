import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

const audioCollection = collection(db, "audioGroups");

// Créer un groupe audio
export const createAudioGroup = async (name, userId, type) => {
  try {
    const newGroup = {
      name,
      type, // "sandbox" ou "episode"
      createdBy: userId,
      createdAt: new Date(),
      files: [],
    };

    const docRef = await addDoc(audioCollection, newGroup);
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de la création du groupe :", error);
    throw error;
  }
};

// Ajouter un fichier audio à un groupe
export const addAudioToGroup = async (groupId, file, metadata) => {
  try {
    const storageRef = ref(storage, `audioGroups/${groupId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    const groupDocRef = doc(db, "audioGroups", groupId);

    await updateDoc(groupDocRef, {
      files: arrayUnion({
        name: metadata.name, // Utilise le nom saisi par l'utilisateur
        url: downloadURL,
        uploadedBy: metadata.uploadedBy,
        uploadedAt: new Date(),
        duration: metadata.duration,
      }),
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'audio :", error);
    throw error;
  }
};

// Récupérer tous les groupes audio
export const getAudioGroups = async () => {
  try {
    const querySnapshot = await getDocs(audioCollection);
    const audioGroups = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return audioGroups.map((group) => ({
      id: group.id,
      name: group.name || "Sans nom",
      type: group.type || "sandbox",
      files: group.files || [],
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des groupes audio :", error);
    throw error;
  }
};
