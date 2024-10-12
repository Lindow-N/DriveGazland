import React, { useEffect, useState } from "react";
import { AppFile } from "../../interfaces/list";
import MediaModal from "../shared/MediaModal";
import {
  getDownloadUrlFromStoragePath,
  calculateFilesToShow,
} from "../../utils/helper";

interface FileGridProps {
  files: AppFile[];
  isTagView?: boolean;
  onTagClick?: (tagName: string) => void;
  onFileClick?: (index: number) => void;
}

// Utiliser la fonction pour déterminer si un fichier est une vidéo
const isVideo = (storagePath: string) => {
  return storagePath.startsWith("videos/");
};

const FileGrid: React.FC<FileGridProps> = ({
  files,
  isTagView = false,
  onTagClick,
}) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
    null
  );
  const [fileUrls, setFileUrls] = useState<(string | null)[]>([]);
  const [visibleFiles, setVisibleFiles] = useState<AppFile[]>([]);
  const [filesToShow, setFilesToShow] = useState<number>(
    calculateFilesToShow(files, isTagView, 35) // On passe `isTagView` ici
  );
  const [showButton, setShowButton] = useState<boolean>(false);
  const [loadingVideos, setLoadingVideos] = useState<boolean[]>([]);

  // Charger les URLs des fichiers
  useEffect(() => {
    const fetchUrls = async () => {
      const urls = await Promise.all(
        files.map(async (file) => {
          const url = await getDownloadUrlFromStoragePath(file.storagePath);
          return url;
        })
      );
      setFileUrls(urls);
    };

    fetchUrls();
  }, [files]);

  // Retarder l'affichage du bouton "Voir plus" après 1 seconde
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mettre à jour la liste des fichiers visibles
  useEffect(() => {
    setVisibleFiles(files.slice(0, filesToShow));
    setLoadingVideos(new Array(files.length).fill(true)); // Initialise le chargement pour toutes les vidéos
  }, [files, filesToShow, isTagView]);

  const openModal = (index: number) => {
    if (!isTagView) {
      setSelectedFileIndex(index);
    } else {
      const tagName = files[index]?.name;
      if (tagName && onTagClick) {
        onTagClick(tagName);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const closeModal = () => {
    setSelectedFileIndex(null);
  };

  const handleShowMore = () => {
    setFilesToShow((prevCount) => prevCount + 50);
  };

  // Gestion de l'état de chargement des vidéos
  const handleVideoLoaded = (index: number) => {
    const updatedLoading = [...loadingVideos];
    updatedLoading[index] = false; // Vidéo chargée, on désactive le loader pour cet index
    setLoadingVideos(updatedLoading);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 sm:p-8 md:px-16">
        {visibleFiles.map((file, index) => (
          <div
            key={file.id}
            className="bg-dark2 rounded-lg shadow-md p-4 cursor-pointer transition duration-150 ease-in-out hover:bg-dark3"
            onClick={() => openModal(index)}
          >
            {isVideo(file.storagePath) ? (
              <>
                <video
                  className={`w-full h-32 md:h-40 object-cover rounded-md mb-4`}
                  src={fileUrls[index] || ""}
                  onLoadedData={() => handleVideoLoaded(index)} // Vidéo chargée, désactiver le loader
                  onLoadedMetadata={(e) => {
                    const video = e.currentTarget;
                    video.currentTime = 1; // Afficher une partie de la vidéo à 1 seconde
                    video.pause(); // Pause pour ne pas charger plus
                  }}
                  muted
                  controls={false}
                />
              </>
            ) : (
              <img
                src={fileUrls[index] || ""}
                alt={file.name}
                className="w-full h-32 md:h-40 object-cover rounded-md mb-4"
                loading="lazy"
              />
            )}

            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold text-sm md:text-lg">
                {file.name.length > 10
                  ? `${file.name.slice(0, 10)}...`
                  : file.name}
              </h3>

              <span className="bg-gray-700 text-xs text-white rounded-md px-2 py-1">
                {file.totalFiles}
              </span>
            </div>
          </div>
        ))}

        {showButton && visibleFiles.length < files.length && (
          <div
            className="bg-dark2 rounded-lg shadow-md p-4 w-full text-white font-bold text-lg cursor-pointer flex justify-center items-center hover:bg-dark3 transition h-52 sm:h-52 md:h-56 lg:h-64"
            onClick={handleShowMore}
          >
            Voir plus
          </div>
        )}
      </div>

      {selectedFileIndex !== null && (
        <MediaModal
          files={files}
          currentIndex={selectedFileIndex}
          onClose={closeModal}
          onFileChange={setSelectedFileIndex}
        />
      )}
    </>
  );
};

export default FileGrid;
