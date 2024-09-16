"use client";

import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { File } from "../../interfaces/list";
import {
  ArrowDownTrayIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"; // Import des icônes pour mobile
import { useSwipeable } from "react-swipeable";
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
  const [currentFileIndex, setCurrentFileIndex] = useState(currentIndex);

  const currentFile = files[currentFileIndex];

  const isVideo = (url: string) => {
    return (
      url.includes("video") ||
      url.endsWith(".mp4") ||
      url.endsWith(".mov") ||
      url.endsWith(".avi")
    );
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

  // Gestion des événements de swipe
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventScrollOnSwipe: true, // Utilise cette option à la place de preventDefaultTouchmoveEvent
    trackMouse: true, // Permet de swiper aussi avec la souris sur PC
  });

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[85vh] bg-dark3 rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant sur la modal elle-même
        {...handlers} // Applique les événements de swipe à la modal
      >
        {/* Header avec le nom de l'image */}
        <div className="bg-dark2 py-2 px-4 flex justify-between items-center">
          <span className="text-white text-lg truncate w-full">
            {currentFile.title}
          </span>
          <button onClick={onClose} className="text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Contenu du média */}
        <div className="flex items-center justify-center w-full h-full max-h-[70vh] p-4 overflow-hidden">
          {isVideo(currentFile.imageSrc) ? (
            <video
              src={currentFile.imageSrc}
              className="max-w-full max-h-full object-contain"
              controls
              autoPlay
            />
          ) : (
            <img
              src={currentFile.imageSrc}
              alt={currentFile.title}
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
          <button className="bg-greenPrimary text-white px-4 py-2 rounded-md flex items-center justify-center md:inline-block">
            <ArrowDownTrayIcon className="w-5 h-5 md:hidden" />
            <span className="hidden md:inline">Télécharger</span>
          </button>

          {/* Bouton Favoris */}
          <button className="bg-greenPrimary text-white px-4 py-2 rounded-md flex items-center justify-center md:inline-block">
            <HeartIcon className="w-5 h-5 md:hidden" />
            <span className="hidden md:inline">Favoris</span>
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
