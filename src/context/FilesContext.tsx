"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"; // Assure-toi que ton fichier firebaseConfig est correctement configuré

interface FilesContextType {
  totalFiles: number;
  loadingFiles: boolean;
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);

interface FilesProviderProps {
  children: ReactNode;
}

export const FilesProvider: React.FC<FilesProviderProps> = ({ children }) => {
  const [totalFiles, setTotalFiles] = useState<number>(0); // Stocke le nombre total de fichiers
  const [loadingFiles, setLoadingFiles] = useState<boolean>(true); // Indique si les fichiers sont en cours de chargement

  useEffect(() => {
    const fetchTotalFiles = async () => {
      try {
        const filesSnapshot = await getDocs(collection(db, "files")); // Récupère tous les fichiers de la collection "files"
        setTotalFiles(filesSnapshot.size); // Stocke le nombre total de fichiers
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre total de fichiers :",
          error
        );
      } finally {
        setLoadingFiles(false); // Indique que le chargement est terminé
      }
    };

    fetchTotalFiles();
  }, []);

  return (
    <FilesContext.Provider value={{ totalFiles, loadingFiles }}>
      {children}
    </FilesContext.Provider>
  );
};

export const useFiles = (): FilesContextType => {
  const context = useContext(FilesContext);
  if (context === undefined) {
    throw new Error("useFiles must be used within a FilesProvider");
  }
  return context;
};
