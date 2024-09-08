"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/header/DashboardHeader";
import CategoryList from "../../components/list/CategoryList";
import FileGrid from "../../components/list/FileGrid";
import withAuth from "../../utils/withAuth";
import { useUser } from "../../context/UserContext";
import { showSuccessToast } from "../../utils/toastConfig";

const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Tous les fichiers");

  const categories: string[] = [
    "Tous les fichiers",
    "Favoris",
    "Images",
    "Vidéos",
  ];

  const files = [
    {
      id: 1,
      imageSrc: "/images/sample.jpg",
      title: "Gaston crampe le samf putn",
      documentCount: 10,
    },
    {
      id: 2,
      imageSrc: "/images/sample.jpg",
      title: "Dossier 2",
      documentCount: 5,
    },
    {
      id: 3,
      imageSrc: "/images/sample.jpg",
      title: "Dossier 3",
      documentCount: 8,
    },
    {
      id: 4,
      imageSrc: "/images/sample.jpg",
      title: "Dossier 4",
      documentCount: 12,
    },
    {
      id: 5,
      imageSrc: "/images/sample.jpg",
      title: "Dossier 5",
      documentCount: 3,
    },
    {
      id: 6,
      imageSrc: "/images/sample.jpg",
      title: "Dossier 6",
      documentCount: 7,
    },
    {
      id: 7,
      imageSrc: "/images/sample.jpg",
      title: "Dossier 7",
      documentCount: 9,
    },
    {
      id: 8,
      imageSrc: "/images/sample.jpg",
      title: "Dossier 8",
      documentCount: 6,
    },
  ];

  return (
    <DashboardLayout>
      <DashboardHeader greetingText={`Bienvenue, ${user?.pseudonym} !`} />
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      <div className="min-h-screen bg-dark1 ">
        <FileGrid files={files} />
      </div>
    </DashboardLayout>
  );
};

export default withAuth(DashboardPage);
