import { updateDoc, arrayUnion, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { showAchievementToast } from "../../utils/toastConfig";
import { achievementsList } from "../../utils/achievementsList";

export const unlockAchievement = async (
  userId: string,
  achievementId: number
) => {
  const userDocRef = doc(db, "users", userId);
  try {
    // Mise à jour de l'utilisateur avec le succès débloqué
    await updateDoc(userDocRef, {
      achievements: arrayUnion(achievementId),
    });

    // Récupérer les informations du succès depuis la liste des succès
    const achievement = achievementsList.find(
      (ach) => ach.id === achievementId
    );

    if (achievement) {
      // Afficher le toast avec les informations du succès
      showAchievementToast(achievement);
    }
  } catch (error) {
    console.error("Erreur lors du déblocage du succès :", error);
  }
};
