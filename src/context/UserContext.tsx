"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, onSnapshot, collection } from "firebase/firestore";
import {
  onAuthStateChanged,
  User as FirebaseUser,
  signOut,
} from "firebase/auth";
import { User } from "../interfaces/auth";

interface UserContextType {
  user: User | null;
  allUsers: User[] | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (currentUser: FirebaseUser | null) => {
        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.uid);

          const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
              const userData = { ...doc.data(), id: currentUser.uid } as User;
              setUser(userData);

              if (!userData.isValidated) {
                router.push("/account-validation");
              }
            } else {
              setUser(null);
            }
            setLoading(false);
          });

          // Écoute en temps réel pour tous les utilisateurs
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
      }
    );

    return () => unsubscribeAuth();
  }, [router]);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, allUsers, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
