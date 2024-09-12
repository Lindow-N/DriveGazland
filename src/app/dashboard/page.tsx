"use client";

import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/header/DashboardHeader";
import CategoryList from "../../components/list/CategoryList";
import FileGrid from "../../components/list/FileGrid";
import withAuth from "../../utils/withAuth";
import { useUser } from "../../context/UserContext";
import { useTags } from "../../context/TagContext";
import { showSuccessToast } from "../../utils/toastConfig";

const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const { tagsWithData, loadingTags } = useTags();
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Tous les fichiers");

  const categories: string[] = ["Tous les fichiers", "Favoris"];

  const files = tagsWithData.map((tag) => ({
    id: tag.id,
    imageSrc: tag.data.lastAddedFileUrl || "/images/default.jpg",
    title: tag.data.name,
    totalFiles: tag.data.totalFiles,
  }));

  return (
    <DashboardLayout>
      <DashboardHeader greetingText={`Bienvenue, ${user?.pseudonym} !`} />
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <div className="min-h-screen bg-dark1">
        {loadingTags ? (
          <p>Chargement des tags...</p>
        ) : (
          <FileGrid files={files} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default withAuth(DashboardPage);
