import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const firestore = db;

export const updateOrCreateTag = async (tagName, fileUrl, user) => {
  const tagRef = doc(firestore, "tags", tagName);
  const tagDoc = await getDoc(tagRef);

  if (tagDoc.exists()) {
    // Si le tag existe déjà, on met juste à jour les informations du tag
    const tagData = tagDoc.data();
    await setDoc(
      tagRef,
      {
        ...tagData,
        totalFiles: tagData.totalFiles + 1,
        lastAddedFileUrl: fileUrl,
      },
      { merge: true }
    );
  } else {
    // Si le tag n'existe pas, on le crée et l'utilisateur devient le créateur
    await setDoc(tagRef, {
      name: tagName,
      totalFiles: 1,
      lastAddedFileUrl: fileUrl,
      createdBy: user.id,
      createdAt: new Date(),
    });

    // Ajouter le tag à la liste des tags créés par l'utilisateur
    const userRef = doc(firestore, "users", user.id);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const createdTags = userData.createdTags || [];

      // Ajouter le nouveau tag à la liste des tags créés par l'utilisateur
      createdTags.push(tagName);

      // Mise à jour de l'utilisateur avec le nouveau tag créé
      await updateDoc(userRef, {
        createdTags: createdTags,
      });
    }
  }
};
