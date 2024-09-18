import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const storage = getStorage();
const firestore = db;

export const uploadFile = async (file, type, tags, user, onProgress) => {
  if (!file || !file.name) {
    throw new Error("Le fichier est invalide ou manquant.");
  }

  // Générer le nom du fichier à partir des tags
  const tagsForName = tags.join("_").toLowerCase(); // Concaténer les tags avec des underscores
  const extension = file.name.split(".").pop(); // Extraire l'extension du fichier

  // Ce que tu enregistres comme storagePath (DOIT être un chemin relatif)
  const filePath = `${
    type === "image" ? "images" : "videos"
  }/${tagsForName}_${Date.now()}.${extension}`;
  const storageRef = ref(storage, filePath);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (onProgress) {
          onProgress(progress);
        }
      },
      (error) => {
        reject(error); // Gestion des erreurs d'upload
      },
      async () => {
        try {
          // Enregistrer le fichier dans Firestore avec le storagePath
          await addDoc(collection(firestore, "files"), {
            name: `${tagsForName}.${extension}`, // Utiliser les tags pour le nom en base
            storagePath: filePath, // Enregistre uniquement le chemin relatif
            type: type,
            tags: tags,
            addBy: user.id,
            createdAt: new Date(),
          });

          console.log(
            "Fichier ajouté avec succès dans Firestore avec storagePath."
          );

          // Résoudre avec le chemin relatif du fichier (storagePath)
          resolve(filePath);
        } catch (error) {
          console.error(
            "Erreur lors de l'ajout du fichier à Firestore :",
            error
          );
          reject(error); // Gestion des erreurs Firestore
        }
      }
    );
  });
};

export const toggleFavorite = async (user, currentFile) => {
  const userDocRef = doc(db, "users", user.id);

  if (!user.favorites.includes(currentFile.storagePath)) {
    // Ajouter l'image dans les favoris
    await updateDoc(userDocRef, {
      favorites: arrayUnion(currentFile.storagePath),
    });
    return true; // Favori ajouté
  } else {
    // Supprimer l'image des favoris
    await updateDoc(userDocRef, {
      favorites: arrayRemove(currentFile.storagePath),
    });
    return false; // Favori retiré
  }
};
