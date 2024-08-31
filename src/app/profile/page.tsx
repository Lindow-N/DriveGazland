"use client";

import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import DashboardLayout from "../../layouts/DashboardLayout";
import withAuth from "../../utils/withAuth";

const ProfilePage: React.FC = () => {
  // État pour les tags et les succès
  const [tags] = useState(["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"]);
  const [showTags, setShowTags] = useState(false);

  // Liste des fichiers récents (exemple)
  const recentFiles = [
    { id: 1, src: "/images/sample.jpg", alt: "Image 1" },
    { id: 2, src: "/images/sample.jpg", alt: "Image 2" },
    { id: 3, src: "/images/sample.jpg", alt: "Image 3" },
  ];

  // Liste des succès (exemple)
  const achievements = [
    {
      id: 1,
      name: "Succès 1",
      description: "Ajouter votre premier fichier",
      unlocked: true,
    },
    {
      id: 2,
      name: "Succès 2",
      description: "Ajouter 10 fichiers",
      unlocked: false,
    },
    { id: 3, name: "Succès 3", description: "Créer 5 tags", unlocked: false },
  ];

  return (
    <DashboardLayout>
      <div className="bg-dark1 min-h-screen p-8 text-white">
        <h1 className="text-2xl font-bold text-white mb-6 font-title lg:ml-0 ml-6">
          Mon Profil
        </h1>

        {/* Infos du profil */}
        <div className="bg-dark2 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold font-title">Infos du Profil</h2>
          <p className="mt-2 font-body">
            Pseudonyme:{" "}
            <span className="text-greenPrimary">Utilisateur123</span>
          </p>
          <p className="font-body">
            Date de création:{" "}
            <span className="text-greenPrimary">12 Mars 2023</span>
          </p>
          <p className="font-body">
            Total de fichiers ajoutés:{" "}
            <span className="text-greenPrimary">150</span>
          </p>
        </div>

        {/* Fichiers récents */}
        <div className="bg-dark2 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold font-title">
            Fichiers récemment ajoutés
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recentFiles.map((file) => (
              <div
                key={file.id}
                className="bg-dark3 p-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Zoom>
                  <div className="relative pb-[80%] bg-dark3 rounded-md overflow-hidden">
                    <img
                      src={file.src}
                      alt={file.alt}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-md cursor-pointer"
                    />
                  </div>
                </Zoom>
              </div>
            ))}
          </div>
        </div>

        {/* Liste des tags */}
        <div className="bg-dark2 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold font-title">Tags</h2>
          <p className="font-body">
            Nombre de tags:{" "}
            <span className="text-greenPrimary">{tags.length}</span>
          </p>
          <button
            onClick={() => setShowTags(!showTags)}
            className="mt-2 bg-greenPrimary text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Afficher les Tags
          </button>
          {showTags && (
            <div className="mt-4 flex flex-wrap">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-greenPrimary text-white px-2 py-1 rounded-full mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Succès */}
        <div className="bg-dark2 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold font-title text-center">Succès</h2>
          <div className="mt-4 flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-5xl">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="bg-dark3 p-4 rounded-lg shadow-md flex flex-col items-center justify-center transition-shadow duration-300"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={
                        ach.unlocked
                          ? "/images/success/default.jpg"
                          : "/images/success/locked.png"
                      }
                      alt={ach.name}
                      className="object-contain w-full max-h-[150px] rounded-md mb-2"
                    />
                  </div>
                  {ach.description && (
                    <p className="text-xs text-gray-400 font-body text-center">
                      {ach.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(ProfilePage);
