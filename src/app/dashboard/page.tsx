"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Utilise useRouter de next/navigation
import { auth } from "../../firebase/firebaseConfig"; // Assure-toi que le chemin est correct
import { onAuthStateChanged } from "firebase/auth";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Si l'utilisateur n'est pas authentifié, redirige vers la page de login
        router.push("/");
      }
    });

    // Nettoie l'effet en se désinscrivant de l'écouteur Firebase
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">
        Bienvenue sur votre tableau de bord !
      </h1>
    </div>
  );
}
