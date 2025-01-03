import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

// Tags
// Nettoyer un tag (enlever les espaces et mettre en minuscule)
export const cleanTag = (tag) => {
  return tag.trim().toLowerCase();
};

// Ajouter un tag uniquement s'il n'est pas déjà présent
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

// FileGrid

export const calculateFilesToShow = (
  files,
  isTagView,
  baseCount = 29,
  videoWeight = 3,
  tagViewLimit = 54 // Limite stricte pour la vue par tags
) => {
  if (isTagView) {
    return Math.min(files.length, tagViewLimit); // Ne pas dépasser 50 éléments en vue par tags
  }

  const videoCount = files.filter((file) =>
    file.storagePath.startsWith("videos/")
  ).length;

  const totalFilesToShow = Math.max(
    baseCount - videoCount * videoWeight,
    4 // Valeur minimale d'éléments à afficher, à ajuster si besoin
  );

  return totalFilesToShow;
};
