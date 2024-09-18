"use client";

import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { File } from "../../interfaces/list";
import {
  ArrowDownTrayIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useSwipeable } from "react-swipeable";
import { toggleFavorite } from "../../firebase/files/filesServices";
import { useUser } from "../../context/UserContext";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig";

// Utiliser la fonction isVideo comme dans FileGrid
const isVideo = (storagePath: string) => {
  return storagePath.startsWith("videos/");
};

interface MediaModalProps {
  files: File[];
  currentIndex: number;
  onClose: () => void;
}

const MediaModal: React.FC<MediaModalProps> = ({
  files,
  currentIndex,
  onClose,
}) => {
  const { user } = useUser();
  const [currentFileIndex, setCurrentFileIndex] = useState(currentIndex);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // Utiliser pour l'affichage

  const currentFile = files[currentFileIndex];

  useEffect(() => {
    const isFileFavorite = user?.favorites.some(
      (favorite: { url: string }) => favorite.url === currentFile.storagePath
    );
    setIsFavorite(isFileFavorite ?? false);

    const fetchImageUrl = async () => {
      try {
        const downloadURL = await getDownloadURL(
          ref(storage, currentFile.storagePath)
        );
        setImageUrl(downloadURL); // Définit l'URL de l'image/vidéo
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'URL de l'image :",
          error
        );
      }
    };

    fetchImageUrl();
  }, [currentFile, user]);

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
      const downloadURL = await getDownloadURL(
        ref(storage, currentFile.storagePath)
      );
      console.log("URL de téléchargement :", downloadURL);

      const response = await fetch(downloadURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Erreur lors du téléchargement : ${response.status} ${response.statusText}`
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", currentFile.name);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors du téléchargement :", error);
    }
  };

  const handleToggleFavorite = async () => {
    const addedToFavorites = await toggleFavorite(user, currentFile);
    setIsFavorite(addedToFavorites);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[85vh] bg-dark3 rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        {...handlers}
      >
        {/* Header avec le nom de l'image */}
        <div className="bg-dark2 py-2 px-4 flex justify-between items-center">
          <span className="text-white text-lg truncate w-full">
            {currentFile.name}
          </span>
          <button onClick={onClose} className="text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Contenu du média */}
        <div className="flex items-center justify-center w-full h-full max-h-[70vh] p-4 overflow-hidden">
          {isVideo(currentFile.storagePath) ? (
            <video
              src={imageUrl}
              className="max-w-full max-h-full object-contain"
              controls
              autoPlay
            />
          ) : (
            <img
              src={imageUrl}
              alt={currentFile.name}
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: "calc(70vh - 4rem)", maxWidth: "100%" }}
            />
          )}
        </div>

        {/* Boutons de navigation (en plus du swipe) */}
        <button
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-5xl md:text-6xl lg:text-7xl p-2"
        >
          &#8249;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-5xl md:text-6xl lg:text-7xl p-2"
        >
          &#8250;
        </button>

        {/* Footer avec les boutons */}
        <div className="bg-dark2 py-3 px-4 flex flex-col md:flex-row justify-around space-y-4 md:space-y-0 md:space-x-4">
          {/* Bouton Télécharger */}
          <button
            className="bg-greenPrimary text-white px-4 py-2 rounded-md flex items-center justify-center md:inline-block"
            onClick={handleDownload}
          >
            <ArrowDownTrayIcon className="w-5 h-5 md:hidden" />
            <span className="hidden md:inline">Télécharger</span>
          </button>

          {/* Bouton Favoris */}
          <button
            className="bg-greenPrimary text-white px-4 py-2 rounded-md flex items-center justify-center md:inline-block"
            onClick={handleToggleFavorite}
          >
            <HeartIcon className="w-5 h-5 md:hidden" />
            <span className="hidden md:inline">
              {isFavorite ? "Retirer des Favoris" : "Ajouter aux Favoris"}
            </span>
          </button>

          {/* Bouton Supprimer */}
          <button className="bg-redPrimary text-white px-4 py-2 rounded-md flex items-center justify-center md:inline-block">
            <TrashIcon className="w-5 h-5 md:hidden" />
            <span className="hidden md:inline">Supprimer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;
