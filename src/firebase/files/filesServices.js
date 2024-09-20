import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getBlob,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

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
  console.log(currentFile, "currentFile");
  try {
    const userDocRef = doc(db, "users", user.id);

    // Si le fichier n'est pas encore dans les favoris, l'ajouter
    if (
      !user.favorites.some((fav) => fav.storagePath === currentFile.storagePath)
    ) {
      await updateDoc(userDocRef, {
        favorites: arrayUnion({
          id: currentFile.id,
          storagePath: currentFile.storagePath,
          name: currentFile.name,
          type: currentFile.type,
          addBy: currentFile.addBy,
          tags: currentFile.tags,
        }),
      });
      return true; // Fichier ajouté aux favoris
    } else {
      // Si le fichier est déjà dans les favoris, le retirer en entier
      const favoriteToRemove = user.favorites.find(
        (fav) => fav.storagePath === currentFile.storagePath
      );

      if (favoriteToRemove) {
        await updateDoc(userDocRef, {
          favorites: arrayRemove(favoriteToRemove), // Retirer l'objet complet
        });
      }
      return false; // Fichier retiré des favoris
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour des favoris :", error);
    return false;
  }
};

// Fonction pour télécharger un fichier à partir du storagePath
export const downloadFile = async (storagePath, fileName) => {
  try {
    const fileRef = ref(storage, storagePath);
    const fileBlob = await getBlob(fileRef);
    const url = window.URL.createObjectURL(fileBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName || "fichier-inconnu");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erreur lors du téléchargement :", error);
  }
};
