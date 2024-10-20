import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// Fonction pour compter le nombre de fichiers contenant un tag spécifique
const countFilesWithTag = async (db, tagName) => {
  const filesSnapshot = await getDocs(collection(db, "files"));
  let count = 0;

  filesSnapshot.forEach((doc) => {
    const fileData = doc.data();
    if (
      fileData.tags &&
      Array.isArray(fileData.tags) &&
      fileData.tags.includes(tagName)
    ) {
      count++;
    }
  });

  return count;
};

// Fonction pour créer un tag dans la table tags
const createTagInTagsTable = async (
  db,
  tagName,
  lastAddedFileStoragePath,
  createdBy
) => {
  const totalFiles = await countFilesWithTag(db, tagName); // Appel pour compter les fichiers avec le tag

  // Créer un nouveau document dans la collection "tags"
  await addDoc(collection(db, "tags"), {
    createdAt: serverTimestamp(), // Met la date de création à aujourd'hui
    createdBy: createdBy,
    lastAddedFileStoragePath: lastAddedFileStoragePath,
    name: tagName,
    totalFiles: totalFiles,
  });

  console.log(`Le tag "${tagName}" a été recréé avec succès.`);
};

// Appel pour recréer le tag "casi"
const recreateTag = async () => {
  const db = getFirestore();
  const tagName = "affiche";
  const lastAddedFileStoragePath =
    "images/casi_ghost_montage_1727437155160.png";
  const createdBy = "zOm5Piw7tYPDTQsxzhDXJOJyqgB3";

  await createTagInTagsTable(db, tagName, lastAddedFileStoragePath, createdBy);
};

// Export de la fonction pour l'utiliser ailleurs
export { recreateTag };
