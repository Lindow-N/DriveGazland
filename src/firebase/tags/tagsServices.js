import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { unlockAchievement } from "../users/successService"; // Importer la fonction de déblocage des succès

export const updateOrCreateTag = async (tagName, storagePath, user) => {
  const tagRef = doc(db, "tags", tagName);
  const tagDoc = await getDoc(tagRef);

  let tagCreated = false;

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
    tagCreated = true;

    // Mise à jour du champ `createdTags` de l'utilisateur
    const userRef = doc(db, "users", user.id);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedCreatedTags = userData.createdTags || [];

      // Ajouter le tag s'il n'est pas déjà dans la liste `createdTags`
      if (!updatedCreatedTags.includes(tagName)) {
        updatedCreatedTags.push(tagName);

        await updateDoc(userRef, {
          createdTags: updatedCreatedTags,
        });

        // Vérifier si l'utilisateur a déjà débloqué certains succès
        const userAchievements = userData.achievements || [];

        // Achievements à vérifier
        const createdTagsCount = updatedCreatedTags.length;

        const tagAchievements = [
          { count: 7, achievementId: 3 }, // "J'représente le sept"
          { count: 10, achievementId: 6 }, // "Ghost 10"
          { count: 21, achievementId: 8 }, // "Tu crées une règle."
          { count: 50, achievementId: 12 }, // "Maître des tags"
        ];

        for (const achievement of tagAchievements) {
          if (
            createdTagsCount >= achievement.count &&
            !userAchievements.includes(achievement.achievementId) // Vérifie si l'ID du succès n'existe pas déjà
          ) {
            // Débloquer le succès et afficher le toast
            await unlockAchievement(user.id, achievement.achievementId);

            // Ajouter le succès débloqué dans la base de données
            await updateDoc(userRef, {
              achievements: [...userAchievements, achievement.achievementId], // Ajoute l'ID du succès
            });
          }
        }
      }
    }
  }

  // Succès spécial : débloquer le succès "2000" si l'utilisateur utilise ou crée le tag "2000"
  if (tagName === "2000") {
    // Si l'utilisateur n'a pas encore ce succès, on le débloque
    const userRef = doc(db, "users", user.id);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const userAchievements = userData.achievements || [];

      if (!userAchievements.includes(2)) {
        await unlockAchievement(user.id, 2); // ID du succès "2000"
        await updateDoc(userRef, {
          achievements: [...userAchievements, 2],
        });
      }
    }
  }
};
