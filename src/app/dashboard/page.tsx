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
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const categories: string[] = ["Tous les fichiers", "Favoris"];
  console.log(tagsWithData, "tagsWithData");

  const formattedSearchResults = searchResults.map((file) => ({
    id: file.id,
    imageSrc: file.url,
    title: file.name,
    totalFiles: file.tags?.length || 1,
  }));

  const formattedTags = tagsWithData.map((tag) => ({
    id: tag.id,
    imageSrc: tag.data.lastAddedFileUrl,
    title: tag.data.name,
    totalFiles: tag.data.totalFiles || 1,
  }));

  const filesToDisplay =
    searchResults.length > 0 ? formattedSearchResults : formattedTags;

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
            isTagView={searchResults.length == 0}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default withAuth(DashboardPage);
