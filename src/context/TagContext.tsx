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
  const [linkedTags, setLinkedTags] = useState<
    { id: string; group: string; tags: string[] }[]
  >([]); // Ajout de setLinkedTags
  const [loadingTags, setLoadingTags] = useState<boolean>(true);
  const [totalTags, setTotalTags] = useState<number>(0);

  useEffect(() => {
    const tagsQuery = query(collection(db, "tags"), orderBy("name", "asc"));

    const unsubscribeTags = onSnapshot(tagsQuery, (querySnapshot) => {
      const tagList = querySnapshot.docs.map((doc) => doc.id);
      const tagsDataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setTags(tagList);
      setTagsWithData(tagsDataList);
      setTotalTags(querySnapshot.size);
      setLoadingTags(false);
    });

    // Ajout de la logique pour récupérer les linkedTags
    const linkedTagsQuery = collection(db, "linkedTags");
    const unsubscribeLinkedTags = onSnapshot(
      linkedTagsQuery,
      (querySnapshot) => {
        const linkedTagsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          group: doc.data().group,
          tags: doc.data().tags,
        }));
        setLinkedTags(linkedTagsList);
      }
    );

    return () => {
      unsubscribeTags();
      unsubscribeLinkedTags();
    };
  }, []);

  return (
    <TagContext.Provider
      value={{
        tags,
        tagsWithData,
        linkedTags,
        setLinkedTags,
        loadingTags,
        totalTags,
      }}
    >
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
