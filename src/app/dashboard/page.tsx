"use client";

import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/header/DashboardHeader";
import CategoryList from "../../components/list/CategoryList";

const DashboardPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Tous les fichiers");

  const categories: string[] = [
    "Tous les fichiers",
    "Favoris",
    "Images",
    "Vidéos",
  ];

  return (
    <DashboardLayout>
      {/* Contenu principal */}
      <DashboardHeader greetingText="Bienvenue sur votre tableau de bord !" />

      {/* Utilisation du composant CategoryList */}
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Contenu principal */}
      <div className="min-h-screen flex items-center justify-center bg-dark1">
        <h1 className="text-3xl font-bold">
          Bienvenue sur votre tableau de bord !
        </h1>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
