import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { unlockAchievement } from "../users/successService";

export const updateUserFileCount = async (userId, storagePath) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const newFileCount = (userData.totalFileUploads || 0) + 1;

    let recentFiles = userData.recentFiles || [];

    // Ajouter le nouveau fichier en haut de la liste
    recentFiles.unshift(storagePath);

    // Limiter à 3 fichiers récents
    if (recentFiles.length > 3) {
      recentFiles = recentFiles.slice(0, 3);
    }

    // Mettre à jour les informations de l'utilisateur (total d'uploads et fichiers récents)
    await updateDoc(userRef, {
      totalFileUploads: newFileCount,
      recentFiles: recentFiles,
    });

    // Liste des succès liés au nombre d'uploads
    const uploadAchievements = [
      { count: 1, achievementId: 1 }, // 1er upload
      { count: 8, achievementId: 4 }, // 8 uploads
      { count: 13, achievementId: 7 }, // 13 uploads
      { count: 69, achievementId: 9 }, // 69 uploads
      { count: 99, achievementId: 10 }, // 99 uploads
    ];

    // Initialiser le tableau `achievements` s'il est absent ou mal défini
    let userAchievements = Array.isArray(userData.achievements)
      ? userData.achievements
      : [];

    for (const achievement of uploadAchievements) {
      if (
        userData.totalFileUploads < achievement.count &&
        newFileCount >= achievement.count
      ) {
        // Vérifier si le succès est déjà débloqué
        if (!userAchievements.includes(achievement.achievementId)) {
          // Débloquer le succès et afficher le toast
          await unlockAchievement(userId, achievement.achievementId);

          // Ajouter le succès à la liste des succès débloqués
          userAchievements.push(achievement.achievementId);

          // Mettre à jour la base de données avec les succès débloqués
          await updateDoc(userRef, {
            achievements: userAchievements, // Mise à jour des succès
          });
        }
      }
    }
  } else {
    throw new Error("Utilisateur non trouvé");
  }
};

// Fonction pour récupérer les informations de l'utilisateur qui a ajouté le fichier
export const fetchAddedByUser = async (userId) => {
  try {
    if (!userId) {
      return "Utilisateur inconnu";
    }

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData.pseudonym || "Utilisateur inconnu";
    } else {
      return "Utilisateur inconnu";
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return "Erreur utilisateur";
  }
};
