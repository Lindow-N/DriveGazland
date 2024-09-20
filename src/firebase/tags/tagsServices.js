import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const updateOrCreateTag = async (tagName, storagePath, user) => {
  console.log(storagePath, "storagePath", "tagsServices.js");
  const tagRef = doc(db, "tags", tagName);
  const tagDoc = await getDoc(tagRef);

  if (tagDoc.exists()) {
    const tagData = tagDoc.data();
    await setDoc(
      tagRef,
      {
        ...tagData,
        totalFiles: tagData.totalFiles + 1,
        lastAddedFileStoragePath: storagePath, // On enregistre seulement le storagePath
      },
      { merge: true }
    );
  } else {
    // Le tag n'existe pas, on le crée et on l'ajoute aux tags créés par l'utilisateur
    await setDoc(tagRef, {
      name: tagName,
      totalFiles: 1,
      lastAddedFileStoragePath: storagePath, // On enregistre seulement le storagePath
      createdBy: user.id,
      createdAt: new Date(),
    });

    // Mise à jour du champ `createdTags` de l'utilisateur
    const userRef = doc(db, "users", user.id);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedCreatedTags = userData.createdTags || [];

      // Ajouter le tag si il n'est pas déjà dans la liste `createdTags`
      if (!updatedCreatedTags.includes(tagName)) {
        updatedCreatedTags.push(tagName);

        await updateDoc(userRef, {
          createdTags: updatedCreatedTags,
        });
      }
    }
  }
};
