"use client";

import React, { useRef, useEffect } from "react";
import { File } from "../../interfaces/list";

interface FileGridProps {
  files: File[];
}

const isVideo = (url: string) => {
  return (
    url.includes("video") ||
    url.endsWith(".mp4") ||
    url.endsWith(".mov") ||
    url.endsWith(".avi")
  );
};

const FileGrid: React.FC<FileGridProps> = ({ files }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.currentTime = 0;
        video.pause();
      }
    });
  }, [files]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 sm:p-8 md:px-16">
      {files.map((file, index) => (
        <div
          key={file.id}
          className="bg-dark2 rounded-lg shadow-md p-4 cursor-pointer transition duration-150 ease-in-out hover:bg-dark3"
        >
          {isVideo(file.imageSrc) ? (
            // Utilisation de <video> figée à la première frame
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
              {file.title}
            </h3>
            <span className="bg-gray-700 text-xs text-white rounded-md px-2 py-1">
              {file.totalFiles}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileGrid;
