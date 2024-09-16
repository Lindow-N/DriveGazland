"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface FilesContextType {
  totalFiles: number;
  loadingFiles: boolean;
  searchFilesByTags: (tags: string[]) => Promise<any[]>;
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);

interface FilesProviderProps {
  children: ReactNode;
}

export const FilesProvider: React.FC<FilesProviderProps> = ({ children }) => {
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [loadingFiles, setLoadingFiles] = useState<boolean>(true);

  useEffect(() => {
    const fetchTotalFiles = async () => {
      try {
        const filesSnapshot = await getDocs(collection(db, "files"));
        setTotalFiles(filesSnapshot.size);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du nombre total de fichiers :",
          error
        );
      } finally {
        setLoadingFiles(false);
      }
    };

    fetchTotalFiles();
  }, []);

  // Fonction pour rechercher des fichiers en fonction des tags
  const searchFilesByTags = async (tags: string[]) => {
    if (tags.length === 0) return [];

    try {
      const filesCollection = collection(db, "files");

      // Récupérer tous les fichiers qui contiennent **au moins un** des tags
      const filesQuery = query(
        filesCollection,
        where("tags", "array-contains-any", tags)
      );

      const querySnapshot = await getDocs(filesQuery);
      const files = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as { tags: string[] }),
      }));

      // Filtrer côté client pour garder uniquement les fichiers qui contiennent tous les tags
      const filteredFiles = files.filter((file) =>
        tags.every((tag) => file.tags.includes(tag))
      );

      return filteredFiles;
    } catch (error) {
      console.error("Erreur lors de la recherche des fichiers :", error);
      return [];
    }
  };

  return (
    <FilesContext.Provider
      value={{ totalFiles, loadingFiles, searchFilesByTags }}
    >
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
