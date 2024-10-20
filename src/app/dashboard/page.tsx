"use client";

import React, { useState, useEffect, use } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/header/DashboardHeader";
import CategoryList from "../../components/list/CategoryList";
import FileGrid from "../../components/list/FileGrid";
import MediaModal from "../../components/shared/MediaModal";
import withAuth from "../../utils/withAuth";
import { useUser } from "../../context/UserContext";
import { useTags } from "../../context/TagContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { fetchAllFiles } from "../../firebase/files/filesServices";

const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const { tagsWithData, loadingTags } = useTags();
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Tous les tags");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [favoriteFiles, setFavoriteFiles] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
    null
  );

  const fetchFavorites = async () => {
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.id);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.favorites) {
            setFavoriteFiles(userData.favorites);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
      }
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  useEffect(() => {
    const fetchFiles = async () => {
      if (selectedCategory === "Tous les fichiers") {
        const allFiles = await fetchAllFiles(); // Appel de la fonction pour récupérer tous les fichiers
        setSearchResults(allFiles);
      } else if (selectedCategory === "Tous les tags") {
        // Réinitialiser les résultats de recherche quand on passe à "Tous les tags"
        setSearchResults([]);
      }
    };

    fetchFiles();
  }, [selectedCategory]);

  const categories: string[] = [
    "Tous les tags",
    "Tous les fichiers",
    "Fichiers favoris",
  ];

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
    totalFiles: file.tags?.length || 1,
    type: file.storagePath.startsWith("videos/") ? "video" : "image",
    addBy: file.addBy,
    tags: file.tags,
  }));

  let filesToDisplay;
  if (selectedCategory === "Fichiers favoris") {
    filesToDisplay = formattedFavorites;
  } else if (selectedCategory === "Tous les fichiers") {
    filesToDisplay = formattedSearchResults; // Les résultats seront tous les fichiers
  } else if (searchResults.length > 0) {
    filesToDisplay = formattedSearchResults;
  } else {
    filesToDisplay = formattedTags;
  }

  const handleFileChange = (index: number) => {
    const updatedFiles = filesToDisplay.filter((_, i) => i !== index);
    if (updatedFiles.length === 0) {
      setSelectedFileIndex(null); // Fermer la modal s'il n'y a plus de fichiers
    } else {
      setSelectedFileIndex((prev) => (prev ? prev - 1 : null)); // Recalcule l'index correctement
    }
  };

  return (
    <DashboardLayout>
      <DashboardHeader
        greetingText={`Bienvenue, ${user?.pseudonym} !`}
        onSearchResults={setSearchResults}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      {selectedTags.length === 0 && (
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      )}

      <div className="min-h-screen bg-dark1">
        {searchResults.length === 0 && selectedTags.length > 0 ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-white text-lg">
              Aucun fichier trouvé pour les tags sélectionnés
            </p>
          </div>
        ) : (
          <FileGrid
            key={selectedCategory + searchResults.length}
            files={filesToDisplay}
            isTagView={
              selectedCategory === "Tous les tags" &&
              searchResults.length === 0 &&
              selectedTags.length === 0
            }
            onTagClick={(tag) => setSelectedTags([tag])}
            onFileClick={(index) => setSelectedFileIndex(index)} // Ouvre MediaModal avec l'index
          />
        )}
      </div>

      {selectedFileIndex !== null && (
        <MediaModal
          files={filesToDisplay}
          currentIndex={selectedFileIndex}
          onClose={() => setSelectedFileIndex(null)} // Fermer la modal
          onFileChange={handleFileChange} // Gérer la mise à jour des fichiers lors des suppressions
        />
      )}
    </DashboardLayout>
  );
};

export default withAuth(DashboardPage);
