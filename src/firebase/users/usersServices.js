import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const updateUserFileCount = async (userId, newFileUrl) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const newFileCount = (userData.totalFileUploads || 0) + 1;

    let recentFiles = userData.recentFiles || [];

    recentFiles.unshift(newFileUrl);

    if (recentFiles.length > 3) {
      recentFiles = recentFiles.slice(0, 3);
    }

    await updateDoc(userRef, {
      totalFileUploads: newFileCount,
      recentFiles: recentFiles,
    });
  } else {
    throw new Error("Utilisateur non trouvé");
  }
};
