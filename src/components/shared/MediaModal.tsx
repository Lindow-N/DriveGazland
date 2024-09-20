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
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { getDownloadUrlFromStoragePath } from "../../utils/helper";
import { fetchAddedByUser } from "../../firebase/users/usersServices";
import { downloadFile } from "../../firebase/files/filesServices";
import { MediaModalProps } from "../../interfaces/media";
import { json } from "stream/consumers";

// Utiliser la fonction isVideo comme dans FileGrid
const isVideo = (storagePath: string) => {
  return storagePath.startsWith("videos/");
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
          currentFile.storagePath
        );
        if (downloadURL) {
          setImageUrl(downloadURL);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'URL de l'image :",
          error
        );
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

      // Nettoyage pour éviter les fuites de mémoire
      return () => unsubscribe();
    }
  }, [user, currentFile]);

  // Récupérer les informations de l'utilisateur qui a ajouté l'image/vidéo
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
      await downloadFile(currentFile.storagePath, currentFile.name);
    } catch (error) {
      console.error("Erreur lors du téléchargement :", error);
    }
  };

  const handleToggleFavorite = async () => {
    const addedToFavorites = await toggleFavorite(user, currentFile);
    setIsFavorite(addedToFavorites);

    if (!addedToFavorites) {
      // Si le fichier est retiré des favoris, passer à l'image suivante ou fermer la modal
      if (files.length > 1) {
        handleNext(); // Passer à l'image suivante
      } else {
        onClose(); // Fermer la modal s'il n'y a plus de fichiers
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/deleteFile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileId: currentFile.id,
          storagePath: currentFile.storagePath,
          tags: currentFile.tags,
          userId: user?.id,
        }),
      });
      console.log(
        "body",
        JSON.stringify({
          fileId: currentFile.id,
          storagePath: currentFile.storagePath,
          tags: currentFile.tags,
          userId: user?.id,
        })
      );
      const data = await response.json();
      console.log("Fichier supprimé :", data);
    } catch (error) {
      console.error("Erreur lors de la suppression du fichier :", error);
    }
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
        {/* Header avec le nom de l'image et ajouté par */}
        <div className="bg-dark2 py-2 px-4 flex flex-col">
          <span className="text-white text-lg truncate">
            {currentFile?.name}
          </span>
          <span className="text-gray-400 text-sm">
            Ajouté par : {addedByUser}
          </span>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Contenu du média */}
        <div className="flex items-center justify-center w-full h-full max-h-[70vh] p-4 overflow-hidden">
          {isVideo(currentFile?.storagePath) ? (
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
            {/* Sur mobile, change l'icône selon l'état isFavorite */}
            {isFavorite ? (
              <HeartIcon className="w-5 h-5 fill-current text-red-500 md:hidden" />
            ) : (
              <HeartIcon className="w-5 h-5 md:hidden" />
            )}

            {/* Afficher le texte sur les écrans plus grands */}
            <span className="hidden md:inline">
              {isFavorite ? "Retirer des Favoris" : "Ajouter aux Favoris"}
            </span>
          </button>

          {/* Bouton Supprimer */}
          <button
            className="bg-redPrimary text-white px-4 py-2 rounded-md flex items-center justify-center md:inline-block"
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
