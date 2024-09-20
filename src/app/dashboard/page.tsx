"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/header/DashboardHeader";
import CategoryList from "../../components/list/CategoryList";
import FileGrid from "../../components/list/FileGrid";
import withAuth from "../../utils/withAuth";
import { useUser } from "../../context/UserContext";
import { useTags } from "../../context/TagContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // Assurez-vous d'importer Firebase correctement

const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const { tagsWithData, loadingTags } = useTags();
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Tous les tags"); // Renommé
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [favoriteFiles, setFavoriteFiles] = useState<any[]>([]); // Pour stocker les favoris

  // Fonction pour récupérer les favoris de l'utilisateur
  const fetchFavorites = async () => {
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.id);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.favorites) {
            setFavoriteFiles(userData.favorites); // Stocker les favoris dans l'état
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
      }
    }
  };

  // Utiliser useEffect pour récupérer les favoris à chaque fois que l'utilisateur change
  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const categories: string[] = ["Tous les tags", "Fichiers favoris"]; // Renommé

  const formattedSearchResults = searchResults.map((file) => ({
    id: file.id,
    storagePath: file.storagePath,
    name: file.name,
    totalFiles: file.tags?.length || 1,
    type: file.storagePath.startsWith("videos/") ? "video" : "image",
    addBy: file.addBy,
    tags: file.tags,
  }));

  const formattedTags = tagsWithData.map((tag) => ({
    id: tag.id,
    storagePath: tag.data.lastAddedFileStoragePath,
    name: tag.data.name,
    totalFiles: tag.data.totalFiles || 1,
    createdBy: tag.data.createdBy,
    type: tag.data.lastAddedFileStoragePath.startsWith("videos/")
      ? "video"
      : "image",
  }));

  const formattedFavorites = favoriteFiles.map((file) => ({
    id: file.id,
    storagePath: file.storagePath,
    name: file.name,
    totalFiles: file.tags?.length || 1, // Nombre de tags, ou 1 s'il n'y en a pas
    type: file.storagePath.startsWith("videos/") ? "video" : "image", // Type (vidéo ou image)
    addBy: file.addBy,
    tags: file.tags, // Inclure les tags
  }));

  // Choisir quel type de fichiers afficher en fonction de la catégorie sélectionnée
  let filesToDisplay;
  if (selectedCategory === "Fichiers favoris") {
    filesToDisplay = formattedFavorites; // Afficher les favoris formatés
  } else if (searchResults.length > 0) {
    filesToDisplay = formattedSearchResults;
  } else {
    filesToDisplay = formattedTags; // Par défaut, afficher les tags formatés
  }

  console.log(filesToDisplay, "filesToDisplay");

  return (
    <DashboardLayout>
      <DashboardHeader
        greetingText={`Bienvenue, ${user?.pseudonym} !`}
        onSearchResults={setSearchResults}
      />

      {searchResults.length === 0 && (
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      )}

      <div className="min-h-screen bg-dark1">
        {loadingTags ? (
          <p>Chargement des tags...</p>
        ) : (
          <FileGrid
            files={filesToDisplay}
            isTagView={
              selectedCategory === "Tous les tags" && searchResults.length === 0
            } // Si c'est la vue des tags
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default withAuth(DashboardPage);
