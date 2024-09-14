"use client";

import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/header/DashboardHeader";
import CategoryList from "../../components/list/CategoryList";
import FileGrid from "../../components/list/FileGrid";
import withAuth from "../../utils/withAuth";
import { useUser } from "../../context/UserContext";
import { useTags } from "../../context/TagContext";

const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const { tagsWithData, loadingTags } = useTags();
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Tous les fichiers");
  const [searchResults, setSearchResults] = useState<any[]>([]); // Garde en mémoire les résultats de recherche

  const categories: string[] = ["Tous les fichiers", "Favoris"];
  console.log(tagsWithData, "tagsWithData");

  // Reformater les fichiers de la recherche pour avoir la bonne structure
  const formattedSearchResults = searchResults.map((file) => ({
    id: file.id,
    imageSrc: file.url, // Le champ `url` est utilisé pour les fichiers recherchés
    title: file.name, // Le champ `name` est utilisé pour les fichiers recherchés
    totalFiles: file.tags?.length || 1, // Nombre de tags ou valeur par défaut
  }));

  // Reformater les tags pour avoir une structure homogène
  const formattedTags = tagsWithData.map((tag) => ({
    id: tag.id,
    imageSrc: tag.data.lastAddedFileUrl, // Utilisation de l'image du tag
    title: tag.data.name, // Utilisation du nom du tag
    totalFiles: tag.data.totalFiles || 1, // Valeur par défaut pour totalFiles
  }));

  // Si des résultats de recherche sont présents, afficher ces fichiers, sinon afficher les tags par défaut
  const filesToDisplay =
    searchResults.length > 0 ? formattedSearchResults : formattedTags;

  console.log(filesToDisplay, "filesToDisplay");

  return (
    <DashboardLayout>
      <DashboardHeader
        greetingText={`Bienvenue, ${user?.pseudonym} !`}
        onSearchResults={setSearchResults} // Prop pour remonter les résultats de la recherche
      />

      {/* Cacher la liste des catégories quand une recherche est active */}
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
          <FileGrid files={filesToDisplay} /> // Affichage des fichiers recherchés ou des tags par défaut
        )}
      </div>
    </DashboardLayout>
  );
};

export default withAuth(DashboardPage);
