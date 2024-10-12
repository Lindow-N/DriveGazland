"use client";

import { useRouter, usePathname } from "next/navigation";
import { auth, db } from "../firebase/firebaseConfig";
import {
  doc,
  onSnapshot,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { showSuccessToast, showErrorToast } from "../utils/toastConfig";
import { User } from "../interfaces/auth";
import { UserContextType } from "../interfaces/context";
import { useTags } from "./TagContext";
import { unlockAchievement } from "../firebase/users/successService";

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

// Hook pour utiliser le contexte utilisateur
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [toastShown, setToastShown] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const { tags, loadingTags } = useTags();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);

        const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const userData = { ...doc.data(), id: currentUser.uid } as User;
            setUser(userData);

            const toastAlreadyShown = localStorage.getItem("toastShown");

            if (!toastAlreadyShown && !toastShown) {
              showSuccessToast(`Salut ${userData.pseudonym} !`);
              setToastShown(true);
              localStorage.setItem("toastShown", "true");
            }

            if (!loadingTags) {
              if (!userData.isValidated) {
                router.push("/account-validation");
              } else {
                if (
                  ![
                    "/dashboard",
                    "/ranking",
                    "/profile",
                    "/uploadMedia",
                    "/linked",
                  ].includes(pathname ?? "")
                ) {
                  router.push("/dashboard");
                }
              }
            }

            // Vérification du succès 420 (connexion à 16h20 ou 4h20) à l'heure de Paris
            const now = new Date();
            const parisTime = now.toLocaleString("fr-FR", {
              timeZone: "Europe/Paris",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // Format 24h
            });

            const [currentHour, currentMinutes] = parisTime
              .split(":")
              .map(Number);

            if (
              (currentHour === 16 && currentMinutes === 20) ||
              (currentHour === 4 && currentMinutes === 20)
            ) {
              if (!userData.achievements?.[11]) {
                unlockAchievement(userData.id, 11); // Succès 420
              }
            }
          } else {
            setUser(null);
          }
          setLoading(false);
        });

        const usersCollectionRef = collection(db, "users");
        const unsubscribeAllUsers = onSnapshot(
          usersCollectionRef,
          (snapshot) => {
            const users = snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })) as User[];
            setAllUsers(users);
          }
        );

        return () => {
          unsubscribeSnapshot();
          unsubscribeAllUsers();
        };
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, [router, toastShown, loadingTags, pathname]);

  const logout = async () => {
    try {
      if (user && !user.achievements?.[14]) {
        await unlockAchievement(user.id, 14); // Succès déconnexion
      }

      await signOut(auth);
      setUser(null);
      setToastShown(false);
      localStorage.removeItem("toastShown");
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      showErrorToast("Ne part pas ! :(");
    }
  };

  return (
    <UserContext.Provider value={{ user, allUsers, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};
