"use client";

import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useSwipeable } from "react-swipeable";
import { toggleFavorite } from "../../firebase/files/filesServices";
import { useUser } from "../../context/UserContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { getDownloadUrlFromStoragePath } from "../../utils/helper";
import { fetchAddedByUser } from "../../firebase/users/usersServices";
import { downloadFile, deleteFile } from "../../firebase/files/filesServices";
import { MediaModalProps } from "../../interfaces/media";
import { showSuccessToast } from "../../utils/toastConfig";
import { unlockAchievement } from "../../firebase/users/successService";
import { showErrorToast } from "../../utils/toastConfig";

// Utiliser la fonction isVideo comme dans FileGrid
const isVideo = (storagePath: string | undefined) => {
  return storagePath ? storagePath.startsWith("videos/") : false;
};

const MediaModal: React.FC<MediaModalProps> = ({
  files,
  currentIndex,
  onClose,
}) => {
  const { user } = useUser();
  const [currentFileIndex, setCurrentFileIndex] = useState(currentIndex);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [addedByUser, setAddedByUser] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const currentFile = files[currentFileIndex];

  useEffect(() => {
    const isFileFavorite = user?.favorites.some(
      (favorite: { storagePath: string }) =>
        favorite?.storagePath === currentFile?.storagePath
    );
    setIsFavorite(isFileFavorite ?? false);

    // Récupérer l'URL de l'image/vidéo
    const fetchImageUrl = async () => {
      try {
        const downloadURL = await getDownloadUrlFromStoragePath(
          currentFile?.storagePath
        );
        if (downloadURL) {
          setImageUrl(downloadURL);
        }
      } catch (error) {
        showErrorToast();
      }
    };

    fetchImageUrl();
    fetchAddedByUser();
    fetchUserData();
  }, [currentFile, user]);

  useEffect(() => {
    if (user && currentFile) {
      const userDocRef = doc(db, "users", user.id);

      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const isFileFavorite = userData?.favorites?.some(
            (favorite: { storagePath: string }) =>
              favorite?.storagePath === currentFile?.storagePath
          );
          setIsFavorite(isFileFavorite ?? false);
        }
      });

      return () => unsubscribe();
    }
  }, [user, currentFile]);

  const fetchUserData = async () => {
    const userName = await fetchAddedByUser(currentFile?.addBy);
    setAddedByUser(userName);
  };

  const handleNext = () => {
    setCurrentFileIndex((prevIndex) =>
      prevIndex === files.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentFileIndex((prevIndex) =>
      prevIndex === 0 ? files.length - 1 : prevIndex - 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleDownload = async () => {
    if (!user) {
      console.error("L'utilisateur n'est pas authentifié.");
      return;
    }

    try {
      await downloadFile(currentFile?.storagePath, currentFile?.name);

      const hasAchievement5 =
        Array.isArray(user.achievements) && user.achievements.includes(5);

      if (user && !hasAchievement5) {
        await unlockAchievement(user.id, 5);
      }
    } catch (error) {
      console.error("Erreur lors du téléchargement :", error);
    }
  };

  const handleToggleFavorite = async () => {
    const addedToFavorites = await toggleFavorite(user, currentFile);
    setIsFavorite(addedToFavorites);

    if (!addedToFavorites) {
      if (files.length > 1) {
        handleNext();
      } else {
        onClose();
      }
    }
  };

  const handleDelete = async () => {
    if (!currentFile || !user) {
      console.error("Le fichier ou l'utilisateur est manquant.");
      return;
    }

    try {
      const result = await deleteFile(
        currentFile.id,
        currentFile.storagePath,
        currentFile.tags,
        user.id
      );

      if (result.success) {
        showSuccessToast("Dégage grosse pute !");

        // Si plusieurs fichiers, on passe à l'image suivante ou on ferme la modal
        if (files.length > 1) {
          handleNext();
        } else {
          onClose();
        }
      } else {
        console.error(result.message);
      }
    } catch (error) {
      showErrorToast();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl md:max-h-screen bg-dark3 rounded-lg shadow-lg overflow-auto max-h-[80vh] md:max-h-full md:max-w-[90%] mx-auto"
        onClick={(e) => e.stopPropagation()}
        {...handlers}
      >
        {/* Header avec le nom de l'image et ajouté par */}
        <div className="bg-dark2 py-2 px-4 flex flex-col relative">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-white text-lg truncate">
                {currentFile?.name}
              </span>
              <span className="text-gray-400 text-sm">
                Ajouté par : {addedByUser}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-white md:text-lg text-base flex items-center"
            >
              <XMarkIcon className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Contenu du média */}
        <div className="flex items-center justify-center w-full h-full p-4 overflow-hidden">
          {isVideo(currentFile?.storagePath) ? (
            <>
              {isVideoLoading && (
                <div className="loader w-16 h-16 border-t-4 border-greenPrimary border-solid rounded-full animate-spin"></div> // Ajout du loader pendant le chargement
              )}
              <video
                src={imageUrl}
                className={`max-w-full max-h-[50vh] md:max-h-[70vh] object-contain ${
                  isVideoLoading ? "hidden" : ""
                }`} // Masquer la vidéo pendant le chargement
                controls
                autoPlay
                onLoadedData={() => setIsVideoLoading(false)} // Lorsque la vidéo est prête, désactiver le loader
                onPlay={() => setIsVideoLoading(false)} // En cas de lecture forcée
                onPause={() => setIsVideoLoading(false)} // En cas de pause forcée
              />
            </>
          ) : (
            <img
              src={imageUrl}
              alt={currentFile?.name}
              className="max-w-full max-h-[50vh] md:max-h-[70vh] object-contain"
            />
          )}
        </div>

        {/* Boutons de navigation (en plus du swipe) */}
        {files.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl md:text-5xl p-2"
            >
              &#8249;
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl md:text-5xl p-2"
            >
              &#8250;
            </button>
          </>
        )}

        {/* Footer avec les boutons */}
        <div className="bg-dark2 py-3 px-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:justify-between md:items-center">
          {/* Groupe des deux premiers boutons */}
          <div className="flex space-x-4 justify-center md:justify-start w-full md:w-auto">
            {/* Bouton Télécharger */}
            <button
              className="bg-greenPrimary text-white px-4 py-2 rounded-md flex items-center justify-center w-full md:w-auto"
              onClick={handleDownload}
            >
              <ArrowDownTrayIcon className="w-5 h-5 md:hidden" />
              <span className="hidden md:inline">Télécharger</span>
            </button>

            {/* Bouton Favoris */}
            <button
              className="bg-greenPrimary text-white px-4 py-2 rounded-md flex items-center justify-center w-full md:w-auto"
              onClick={handleToggleFavorite}
            >
              {isFavorite ? (
                <HeartIcon className="w-5 h-5 fill-current text-red-500 md:hidden" />
              ) : (
                <HeartIcon className="w-5 h-5 md:hidden" />
              )}
              <span className="hidden md:inline">
                {isFavorite ? "Retirer des Favoris" : "Ajouter aux Favoris"}
              </span>
            </button>
          </div>

          {/* Bouton Supprimer */}
          <button
            className="bg-redPrimary text-white px-4 py-2 rounded-md flex items-center justify-center w-full md:w-auto md:self-end"
            onClick={handleDelete}
          >
            <TrashIcon className="w-5 h-5 md:hidden" />
            <span className="hidden md:inline">Supprimer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;
