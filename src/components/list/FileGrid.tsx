"use client";

import React, { useRef, useEffect, useState } from "react";
import { File } from "../../interfaces/list";
import MediaModal from "../shared/MediaModal";

interface FileGridProps {
  files: File[];
  isTagView?: boolean; // Pour indiquer si on affiche les tags ou les fichiers
}

const isVideo = (url: string | undefined) => {
  return (
    url?.includes("video") ||
    url?.endsWith(".mp4") ||
    url?.endsWith(".mov") ||
    url?.endsWith(".avi")
  );
};

const FileGrid: React.FC<FileGridProps> = ({ files, isTagView = false }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.currentTime = 0;
        video.pause();
      }
    });
  }, [files]);

  const openModal = (index: number) => {
    if (!isTagView) {
      setSelectedFileIndex(index);
    }
  };

  const closeModal = () => {
    setSelectedFileIndex(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 sm:p-8 md:px-16">
        {files.map((file, index) => (
          <div
            key={file.id}
            className={`bg-dark2 rounded-lg shadow-md p-4 cursor-pointer transition duration-150 ease-in-out ${
              !isTagView ? "hover:bg-dark3" : ""
            }`}
            onClick={() => openModal(index)} // Ouvre la modal uniquement en mode fichier
          >
            {isVideo(file.imageSrc) ? (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className="w-full h-32 md:h-40 object-cover rounded-md mb-4"
                src={file.imageSrc}
                muted
                controls={false}
                onLoadedData={(e) => (e.currentTarget.currentTime = 0)}
              />
            ) : (
              <img
                src={file.imageSrc}
                alt={file.title}
                className="w-full h-32 md:h-40 object-cover rounded-md mb-4"
              />
            )}
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold text-sm md:text-lg">
                {file.title.length > 12
                  ? `${file.title.slice(0, 12)}...`
                  : file.title}
              </h3>

              <span className="bg-gray-700 text-xs text-white rounded-md px-2 py-1">
                {file.totalFiles}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedFileIndex !== null && (
        <MediaModal
          files={files}
          currentIndex={selectedFileIndex}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default FileGrid;
