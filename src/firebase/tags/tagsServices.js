const firestore = db;
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const updateOrCreateTag = async (tagName, storagePath, user) => {
  console.log(storagePath, "storagePath", "tagsServices.js");
  const tagRef = doc(firestore, "tags", tagName);
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
    await setDoc(tagRef, {
      name: tagName,
      totalFiles: 1,
      lastAddedFileStoragePath: storagePath, // On enregistre seulement le storagePath
      createdBy: user.id,
      createdAt: new Date(),
    });
  }
};
