import { getDocs, collection } from "firebase/firestore"; // Assure-toi d'importer Firebase
import { db } from "../../firebase/firebaseConfig";

// Fonction pour récupérer tous les tags des fichiers sans doublons
const getUniqueTagsFromFiles = async (db) => {
  const filesSnapshot = await getDocs(collection(db, "files")); // "files" est le nom de ta collection dans Firestore
  const allTags = [];

  filesSnapshot.forEach((doc) => {
    const fileData = doc.data();
    if (fileData.tags && Array.isArray(fileData.tags)) {
      allTags.push(...fileData.tags); // Ajoute tous les tags de chaque fichier
    }
  });

  // Supprimer les doublons
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags;
};

// Fonction pour récupérer tous les tags de la table tags
const getTagsFromTagsTable = async (db) => {
  const tagsSnapshot = await getDocs(collection(db, "tags")); // "tags" est le nom de ta collection dans Firestore
  const allTagsFromTable = [];

  tagsSnapshot.forEach((doc) => {
    const tagData = doc.data();
    allTagsFromTable.push(tagData.name); // Ajoute le nom de chaque tag
  });

  return allTagsFromTable;
};

// Fonction pour comparer les deux listes de tags
const compareTags = (fileTags, tableTags) => {
  const missingTags = fileTags.filter((tag) => !tableTags.includes(tag)); // Récupère les tags présents dans fileTags mais absents de tableTags
  return missingTags;
};

// Fonction principale pour faire l'état des lieux des tags
const checkMissingTags = async (db) => {
  try {
    const fileTags = await getUniqueTagsFromFiles(db);
    const tableTags = await getTagsFromTagsTable(db);
    const missingTags = compareTags(fileTags, tableTags);

    if (missingTags.length > 0) {
      console.log("Tags manquants dans la table tags:", missingTags);
    } else {
      console.log("Aucun tag manquant dans la table tags.");
    }
  } catch (error) {
    console.error("Erreur lors de la vérification des tags :", error);
  }
};

// Export de la fonction pour pouvoir l'utiliser ailleurs
export { checkMissingTags };
