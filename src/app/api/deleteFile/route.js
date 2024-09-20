import admin from "firebase-admin";
import { join } from "path";
import { readFileSync } from "fs";

if (!admin.apps.length) {
  // Chemin vers le fichier de clé JSON
  const serviceAccountPath = join(process.cwd(), "config", "key.json");
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "drivegazland.appspot.com", // Remplace par ton bucket Firebase Storage
  });
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

export async function DELETE(req, res) {
  try {
    const { fileId, storagePath, tags, userId } = await req.json();

    console.log("Requête reçue pour suppression de fichier : ", {
      fileId,
      storagePath,
      tags,
      userId,
    });

    // Vérification des paramètres
    if (!fileId || !storagePath || !tags || !userId) {
      console.error("Paramètres manquants :", {
        fileId,
        storagePath,
        tags,
        userId,
      });
      return new Response(JSON.stringify({ error: "Paramètres manquants" }), {
        status: 400,
      });
    }

    // 1. Suppression du fichier du storage
    const fileRef = bucket.file(storagePath);
    await fileRef.delete();

    // 2. Suppression du fichier dans Firestore (collection "files")
    const fileDocRef = db.collection("files").doc(fileId);
    await fileDocRef.delete();

    // 3. Mise à jour des tags associés
    for (const tagName of tags) {
      const tagRef = db.collection("tags").doc(tagName);
      const tagDoc = await tagRef.get();

      if (tagDoc.exists) {
        const tagData = tagDoc.data();
        const updatedTotalFiles = (tagData.totalFiles || 0) - 1;

        if (updatedTotalFiles <= 0) {
          // Suppression du tag s'il n'y a plus de fichiers associés
          await tagRef.delete();
        } else {
          // Recherche du nouveau dernier fichier si ce n'était pas le dernier
          let newLastAddedFileStoragePath = "default/noimage.jpeg"; // Image par défaut

          // On récupère les fichiers restants ayant ce tag, triés par date de création décroissante (plus récent en premier)
          const otherFilesQuery = await db
            .collection("files")
            .where("tags", "array-contains", tagName)
            .orderBy("createdAt", "desc")
            .limit(1)
            .get();

          // Si d'autres fichiers existent pour ce tag, on utilise le fichier le plus récent
          if (!otherFilesQuery.empty) {
            newLastAddedFileStoragePath =
              otherFilesQuery.docs[0].data().storagePath;
          }

          // Mise à jour du tag avec le nouveau fichier le plus récent
          await tagRef.update({
            totalFiles: updatedTotalFiles,
            lastAddedFileStoragePath: newLastAddedFileStoragePath,
          });
        }
      }
    }

    // 4. Mise à jour de l'utilisateur (fichiers récents)
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const recentFiles = userDoc.data().recentFiles || [];
      const updatedRecentFiles = recentFiles.filter(
        (file) => file !== storagePath
      );

      await userRef.update({
        recentFiles: updatedRecentFiles,
        totalFileUploads: admin.firestore.FieldValue.increment(-1),
      });
    }

    return new Response(
      JSON.stringify({ message: "Fichier supprimé avec succès." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du fichier : ", error);
    return new Response(
      JSON.stringify({ error: "Erreur lors de la suppression du fichier." }),
      { status: 500 }
    );
  }
}
