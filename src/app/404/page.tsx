"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";
import { unlockAchievement } from "../../firebase/users/successService";

export default function NotFound() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const checkAndUnlockAchievement = async () => {
      if (user && !user.achievements?.[13]) {
        // Si le succès n'est pas débloqué, on le débloque
        await unlockAchievement(user.id, 13); // Succès pour la page 404
      }
      // Rediriger après 3 secondes (par exemple)
      setTimeout(() => {
        router.push("/dashboard"); // Redirection vers la page de ton choix
      }, 5000);
    };

    checkAndUnlockAchievement();
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark1 text-white">
      <h1 className="text-6xl font-title mb-4">404ant too fat</h1>
      <p className="text-lg font-body mb-8">Tu t&apos;es perdu là ?</p>
      <p className="text-md font-body mb-8">Redirection en cours...</p>
    </div>
  );
}
