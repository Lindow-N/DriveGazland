"use client";

import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import DashboardLayout from "../../layouts/DashboardLayout";
import withAuth from "../../utils/withAuth";
import { useUser } from "../../context/UserContext";
import { Timestamp } from "firebase/firestore";

const ProfilePage: React.FC = () => {
  // État pour les tags et les succès
  const { user, loading } = useUser();

  const [showTags, setShowTags] = useState(false);

  const formatDate = (creationDate: Timestamp | Date) => {
    // Si c'est un Timestamp, on le convertit en Date
    if (creationDate instanceof Timestamp) {
      const date = creationDate.toDate(); // Convertir en objet Date
      return date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else if (creationDate instanceof Date) {
      // Si c'est déjà une Date, on la formate directement
      return creationDate.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else {
      return "Date non disponible"; // Cas où la date n'est pas définie
    }
  };
  // Liste des fichiers récents (exemple)
  const recentFiles = [
    { id: 1, src: "/images/sample.jpg", alt: "Image 1" },
    { id: 2, src: "/images/sample.jpg", alt: "Image 2" },
    { id: 3, src: "/images/sample.jpg", alt: "Image 3" },
  ];

  useEffect(() => {
    if (!loading) {
      console.log("Données utilisateur:", user);
    }
  }, [user, loading]);

  // Liste des succès (exemple)
  const achievements = [
    {
      id: 1,
      name: "1er Upload",
      description: "Ajouter votre premier fichier",
      unlocked: true,
    },
    {
      id: 2,
      name: "2000",
      description: "moi au moins, je suis pas un 2000", // poster un fichier avec le tag 2000
      unlocked: true,
    },

    {
      id: 7,
      name: " J'représente le sept",
      description: "Créer 7 tags",
      unlocked: true,
    },
    {
      id: 8,
      name: "Around 8",
      description: "Ajouter 8 fichiers",
      unlocked: true,
    },
    {
      id: 9,
      name: "Bonne pioche !",
      description: "télécharger un fichier",
      unlocked: true,
    },
    {
      id: 10,
      name: "Ghost 10",
      description: "Créer 10 tags",
      unlocked: true,
    },
    {
      id: 13,
      name: "13",
      description: "Ajouter 13 fichiers",
      unlocked: true,
    },
    {
      id: 21,
      name: "Tu crées une règle.",
      description: "Créer 21 tags",
      unlocked: true,
    },
    {
      id: 69,
      name: "hentai",
      description: "Ajouter 69 fichiers",
      unlocked: true,
    },
    {
      id: 99,
      name: "we are 99",
      description: "Ajouter 99 fichiers",
      unlocked: true,
    },
    {
      id: 420,
      name: "420",
      description: "Célébrer le 420.", // se co a 16h20 ou 4h20
      unlocked: true,
    },
    {
      id: 500,
      name: "Maître des tags",
      description: "Créer 50 tags", // se co a 16h20 ou 4h20
      unlocked: true,
    },
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
          {!loading && user ? (
            <>
              <p className="mt-2 font-body">
                Pseudonyme:{" "}
                <span className="text-greenPrimary">{user?.pseudonym}</span>
              </p>
              <p className="font-body">
                Date de création:{" "}
                <span className="text-greenPrimary">
                  {user?.creationDate instanceof Timestamp
                    ? formatDate(user?.creationDate?.toDate())
                    : user?.creationDate instanceof Date
                    ? formatDate(user?.creationDate)
                    : "Date non disponible"}
                </span>
              </p>
              <p className="font-body">
                Total de fichiers ajoutés:{" "}
                <span className="text-greenPrimary">
                  {user?.totalFileUploads}
                </span>
              </p>
            </>
          ) : (
            <p>Chargement des informations...</p>
          )}
        </div>

        {/* Fichiers récents */}
        {!loading && user?.recentFiles && user.recentFiles.length > 0 && (
          <div className="bg-dark2 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold font-title">
              Fichiers récemment ajoutés
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {user.recentFiles.map((file, index) => (
                <div
                  key={index} // Utilise l'index comme clé puisque ce sont des URL
                  className="bg-dark3 p-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {file.includes("video") || file.includes("mp4") ? ( // Si le nom contient "video" ou "mp4"
                    <video
                      src={file}
                      controls
                      className="w-full h-auto object-contain rounded-md"
                    />
                  ) : (
                    <Zoom>
                      <div className="relative pb-[80%] bg-dark3 rounded-md overflow-hidden">
                        <img
                          src={file}
                          alt={`Fichier récent ${index + 1}`}
                          className="absolute top-0 left-0 w-full h-full object-cover rounded-md cursor-pointer"
                        />
                      </div>
                    </Zoom>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Liste des tags */}
        {!loading && user?.createdTags && user.createdTags.length > 0 && (
          <div className="bg-dark2 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold font-title">Tags</h2>
            <p className="font-body">
              Nombre de tags:{" "}
              <span className="text-greenPrimary">
                {user.createdTags.length}
              </span>
            </p>
            <button
              onClick={() => setShowTags(!showTags)}
              className="mt-2 bg-greenPrimary text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Afficher les Tags
            </button>
            {showTags && (
              <div className="mt-4 flex flex-wrap">
                {user.createdTags
                  .slice()
                  .sort((a, b) => a.localeCompare(b))
                  .map((tag, index) => (
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
        )}

        {/* Si aucun fichier récent ou tag n'est disponible */}
        {!loading && user?.recentFiles?.length === 0 && (
          <div className="bg-dark2 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold font-title">Fichiers récents</h2>
            <p className="font-body">Les connards upload rien</p>
          </div>
        )}

        {!loading && user?.createdTags?.length === 0 && (
          <div className="bg-dark2 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold font-title">Tags</h2>
            <p className="font-body">Aucun tag disponible.</p>
          </div>
        )}

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
                          ? `/images/success/${ach.id}.png`
                          : "/images/success/locked.png"
                      }
                      alt={ach.name}
                      className="object-contain w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 rounded-md mb-2"
                    />
                  </div>
                  {ach.description && (
                    <p className="text-s text-gray-400 font-body text-center">
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
