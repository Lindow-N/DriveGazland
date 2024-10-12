import { db } from "../firebaseConfig";
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
  getBlob,
  FieldValue,
} from "firebase/storage";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  increment,
} from "firebase/firestore";

const storage = getStorage();
const firestore = db;

export const deleteFile = async (fileId, storagePath, tags, userId) => {
  try {
    // 1. Suppression du fichier de Firebase Storage
    const fileRef = ref(storage, storagePath);
    await deleteObject(fileRef);

    // 2. Suppression du fichier de Firestore
    const fileDocRef = doc(firestore, "files", fileId);
    await deleteDoc(fileDocRef);

    // 3. Mise à jour des tags associés
    for (const tagName of tags) {
      const tagDocRef = doc(firestore, "tags", tagName);
      const tagDoc = await getDoc(tagDocRef);

      if (tagDoc.exists()) {
        const tagData = tagDoc.data();
        const updatedTotalFiles = (tagData.totalFiles || 0) - 1;

        if (updatedTotalFiles <= 0) {
          // Supprimer le tag s'il n'y a plus de fichiers
          await deleteDoc(tagDocRef);
        } else {
          // Si le fichier supprimé est celui utilisé pour illustrer le tag
          if (tagData.lastAddedFileStoragePath === storagePath) {
            let newLastAddedFileStoragePath = "default/noimage.jpeg"; // Image par défaut

            // Recherche des autres fichiers ayant ce tag
            const otherFilesQuery = query(
              collection(firestore, "files"),
              where("tags", "array-contains", tagName),
              orderBy("createdAt", "desc"),
              limit(1)
            );
            const otherFilesSnapshot = await getDocs(otherFilesQuery);

            if (!otherFilesSnapshot.empty) {
              newLastAddedFileStoragePath =
                otherFilesSnapshot.docs[0].data().storagePath;
            }

            // Mise à jour du tag avec le nouveau fichier illustratif
            await updateDoc(tagDocRef, {
              totalFiles: updatedTotalFiles,
              lastAddedFileStoragePath: newLastAddedFileStoragePath,
            });
          } else {
            await updateDoc(tagDocRef, {
              totalFiles: updatedTotalFiles,
            });
          }
        }
      }
    }

    // 4. Mise à jour des fichiers récents et favoris de l'utilisateur
    const userDocRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Mettre à jour les fichiers récents (recentFiles)
      const updatedRecentFiles = (userData.recentFiles || []).filter(
        (file) => file !== storagePath
      );

      // Vérification si le tableau a changé, et mise à jour si nécessaire
      if (updatedRecentFiles.length !== userData.recentFiles.length) {
        await updateDoc(userDocRef, {
          recentFiles: updatedRecentFiles,
        });
      } else {
        console.log("Aucun changement dans recentFiles.");
      }

      // Mettre à jour les favoris (favorites)
      const updatedFavorites = (userData.favorites || []).filter(
        (favorite) => favorite.storagePath !== storagePath
      );

      await updateDoc(userDocRef, {
        favorites: updatedFavorites,
        totalFileUploads: increment(-1),
      });
    }

    return { success: true, message: "Fichier supprimé avec succès." };
  } catch (error) {
    console.error("Erreur lors de la suppression du fichier :", error);
    return {
      success: false,
      message: "Erreur lors de la suppression du fichier.",
    };
  }
};

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

export const fetchAllFiles = async () => {
  try {
    const filesCollection = collection(db, "files");
    const filesQuery = query(filesCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(filesQuery);

    const allFiles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return allFiles;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de tous les fichiers :",
      error
    );
    return [];
  }
};
