import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

// Tags
export const cleanTag = (tag) => {
  return tag.trim().toLowerCase();
};

export const addUniqueTag = (tags, newTag) => {
  const cleanedTag = cleanTag(newTag);
  if (!tags.includes(cleanedTag)) {
    return [...tags, cleanedTag];
  }
  return tags;
};

// toast

export const getRandomMessage = (messages) => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

// firebase
// Fonction pour obtenir l'URL de téléchargement à partir du storagePath
export const getDownloadUrlFromStoragePath = async (storagePath) => {
  try {
    const storageRef = ref(storage, storagePath);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'URL:", error);
    return null;
  }
};

// Exemple d'utilisation pour les fichiers récents
export const fetchRecentFilesUrls = async (recentFiles) => {
  const fileUrls = await Promise.all(
    recentFiles.map((storagePath) => getDownloadUrlFromStoragePath(storagePath))
  );
  return fileUrls;
};
