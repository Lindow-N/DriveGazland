"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface FilesContextType {
  totalFiles: number;
  loadingFiles: boolean;
  searchFilesByTags: (
    tags: string[],
    onUpdate: (files: any[]) => void
  ) => () => void;
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);

interface FilesProviderProps {
  children: ReactNode;
}

export const FilesProvider: React.FC<FilesProviderProps> = ({ children }) => {
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [loadingFiles, setLoadingFiles] = useState<boolean>(true);
  const [linkedTags, setLinkedTags] = useState<
    { id: string; group: string; tags: string[] }[]
  >([]);

  // Récupérer les linkedTags directement depuis Firestore
  useEffect(() => {
    const linkedTagsQuery = collection(db, "linkedTags");
    const unsubscribeLinkedTags = onSnapshot(linkedTagsQuery, (snapshot) => {
      const linkedTagsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        group: doc.data().group,
        tags: doc.data().tags,
      }));
      setLinkedTags(linkedTagsList);
    });

    return () => unsubscribeLinkedTags();
  }, []);

  // Récupérer en temps réel le nombre total de fichiers
  useEffect(() => {
    const unsubscribeFiles = onSnapshot(
      collection(db, "files"),
      (snapshot) => {
        setTotalFiles(snapshot.size);
        setLoadingFiles(false);
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des fichiers en temps réel :",
          error
        );
      }
    );

    return () => unsubscribeFiles();
  }, []);

  const searchFilesByTags = (
    tags: string[],
    onUpdate: (files: any[]) => void
  ) => {
    if (tags.length === 0) return () => {};

    try {
      const filesCollection = collection(db, "files");

      // Étendre les tags avec ceux qui sont liés
      const extendedTags = tags.reduce((acc, tag) => {
        const group = linkedTags.find((group) => group.tags.includes(tag));

        if (group) {
          const relatedTags = group.tags.filter(
            (relatedTag) => !acc.includes(relatedTag)
          );
          return [...acc, ...relatedTags];
        }
        return acc.includes(tag) ? acc : [...acc, tag];
      }, [] as string[]);

      // Requête pour récupérer les fichiers contenant **au moins un** des tags étendus
      const filesQuery = query(
        filesCollection,
        where("tags", "array-contains-any", extendedTags),
        orderBy("createdAt", "desc")
      );

      // Écouter en temps réel les modifications dans la base de données
      const unsubscribe = onSnapshot(filesQuery, (snapshot) => {
        const files = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as { tags: string[]; createdAt: any }),
        }));

        // Filtrer les fichiers qui contiennent tous les autres tags non liés
        const filteredFiles = files.filter((file) =>
          tags.every((tag) => {
            const group = linkedTags.find((group) => group.tags.includes(tag));
            if (group) {
              return group.tags.some((relatedTag) =>
                file.tags.includes(relatedTag)
              );
            }
            return file.tags.includes(tag);
          })
        );

        // Appeler la fonction de mise à jour avec les fichiers filtrés
        onUpdate(filteredFiles);
      });

      return unsubscribe;
    } catch (error) {
      console.error(
        "Erreur lors de la recherche des fichiers en temps réel :",
        error
      );
      return () => {};
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
