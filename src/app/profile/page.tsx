"use client";

import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import DashboardLayout from "../../layouts/DashboardLayout";
import withAuth from "../../utils/withAuth";
import { useUser } from "../../context/UserContext";
import { Timestamp } from "firebase/firestore";
import { getDownloadUrlFromStoragePath } from "../../utils/helper";
import { achievementsList } from "../../utils/achievementsList"; // La liste des succès disponibles

const ProfilePage: React.FC = () => {
  // État pour les tags et les succès
  const { user, loading } = useUser();

  const [showTags, setShowTags] = useState(false);
  const [recentFilesWithUrls, setRecentFilesWithUrls] = useState<
    { storagePath: string; url: string | null }[]
  >([]);

  const formatDate = (creationDate: Timestamp | Date) => {
    if (creationDate instanceof Timestamp) {
      const date = creationDate.toDate();
      return date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else if (creationDate instanceof Date) {
      return creationDate.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else {
      return "Date non disponible";
    }
  };

  useEffect(() => {
    const fetchRecentFilesUrls = async () => {
      if (user?.recentFiles && user.recentFiles.length > 0) {
        const filesWithUrls = await Promise.all(
          user.recentFiles.map(async (file) => {
            const downloadUrl = await getDownloadUrlFromStoragePath(file);
            return { storagePath: file, url: downloadUrl };
          })
        );
        setRecentFilesWithUrls(filesWithUrls);
      }
    };

    fetchRecentFilesUrls();
  }, [user]);

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
        {!loading && recentFilesWithUrls.length > 0 && (
          <div className="bg-dark2 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold font-title">
              Fichiers récemment ajoutés
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recentFilesWithUrls.map((file, index) => (
                <div
                  key={index}
                  className="bg-dark3 p-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {file.storagePath.includes("video") ||
                  file.storagePath.includes("mp4") ? (
                    <video
                      src={file.url ?? ""}
                      controls
                      className="w-full h-auto object-contain rounded-md"
                    />
                  ) : (
                    <Zoom>
                      <div className="relative pb-[80%] bg-dark3 rounded-md overflow-hidden">
                        <img
                          src={file.url ?? ""}
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

        {/* Succès */}
        <div className="bg-dark2 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold font-title text-center">Succès</h2>
          <div className="mt-4 flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-5xl">
              {achievementsList.map((ach) => (
                <div
                  key={ach.id}
                  className="bg-dark3 p-4 rounded-lg shadow-md flex flex-col items-center justify-center transition-shadow duration-300"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={
                        Array.isArray(user?.achievements) &&
                        user?.achievements.includes(ach.id)
                          ? `/images/success/${ach.id}.png`
                          : "/images/success/locked.png"
                      }
                      alt={ach.name}
                      className="object-contain w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 rounded-md mb-2"
                    />
                  </div>
                  {ach.description && (
                    <p className="text-s text-gray-400 font-body text-center">
                      {ach.name}
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
