"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { TagContextType } from "../interfaces/context";

const TagContext = createContext<TagContextType | undefined>(undefined);

interface TagProviderProps {
  children: ReactNode;
}

export const TagProvider: React.FC<TagProviderProps> = ({ children }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagsWithData, setTagsWithData] = useState<{ id: string; data: any }[]>(
    []
  );
  const [loadingTags, setLoadingTags] = useState<boolean>(true);
  const [totalTags, setTotalTags] = useState<number>(0); // État pour stocker le nombre total de tags

  useEffect(() => {
    const tagsQuery = query(collection(db, "tags"), orderBy("name", "asc"));

    const unsubscribe = onSnapshot(tagsQuery, (querySnapshot) => {
      const tagList = querySnapshot.docs.map((doc) => doc.id);
      const tagsDataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setTags(tagList);
      setTagsWithData(tagsDataList);
      setTotalTags(querySnapshot.size); // Met à jour le nombre total de tags
      setLoadingTags(false);
    });

    return () => unsubscribe(); // Cleanup l'écoute lorsque le composant est démonté
  }, []);

  return (
    <TagContext.Provider value={{ tags, tagsWithData, loadingTags, totalTags }}>
      {children}
    </TagContext.Provider>
  );
};

export const useTags = (): TagContextType => {
  const context = useContext(TagContext);
  if (context === undefined) {
    throw new Error("useTags must be used within a TagProvider");
  }
  return context;
};
