"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import DashboardLayout from "../../layouts/DashboardLayout";

interface FilePreview {
  id: string;
  file: File;
  preview: string;
  tags: string[];
}

const UploadMediaPage: React.FC = () => {
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const handleAddTag = () => {
    if (newTag.trim() === "") return;
    const updatedFiles = [...files];
    updatedFiles[currentIndex].tags.push(newTag);
    setFiles(updatedFiles);
    setNewTag("");
  };

  const handleRemoveTag = (tag: string) => {
    const updatedFiles = [...files];
    updatedFiles[currentIndex].tags = updatedFiles[currentIndex].tags.filter(
      (t) => t !== tag
    );
    setFiles(updatedFiles);
  };

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: file.name + Date.now(),
      file,
      preview: URL.createObjectURL(file),
      tags: [],
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setIsDragActive(false);
  };

  const handleUpload = () => {
    const updatedFiles = [...files];
    updatedFiles.splice(currentIndex, 1);
    setFiles(updatedFiles);
    setCurrentIndex(currentIndex >= updatedFiles.length ? 0 : currentIndex);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  return (
    <DashboardLayout>
      <div className="bg-dark1 min-h-screen p-8">
        <h1 className="text-2xl font-bold text-white mb-6 font-title lg:ml-0 ml-6">
          Ajouter un Média
        </h1>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-8 rounded-md flex justify-center items-center cursor-pointer transition-colors duration-200 ${
            isDragActive
              ? "border-greenPrimary bg-dark3"
              : "border-gray-500 bg-dark2"
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-400 font-body">
            Glissez et déposez des fichiers ici, ou cliquez pour sélectionner
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-6 max-w-lg mx-auto">
            {/* Compteur d'images en haut */}
            <div className="text-white mb-4 font-bold font-subtitle text-center">
              {currentIndex + 1} sur {files.length}
            </div>

            {/* Image active avec zoom */}
            <div className="bg-dark2 p-4 rounded-lg shadow-md w-full">
              <Zoom>
                <img
                  src={files[currentIndex].preview}
                  alt="Image active"
                  className="w-full h-auto object-contain rounded-md mb-4 cursor-pointer"
                />
              </Zoom>
              <div className="text-white font-bold font-subtitle mb-2 text-center">
                {files[currentIndex].tags.join(" ")}
              </div>
            </div>

            {/* Input pour les tags et bouton */}
            <div className="flex items-center mt-4 w-full">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Ajouter un tag"
                className="bg-dark3 text-white p-2 rounded-md focus:outline-none font-body w-full mr-2"
              />
              <button
                onClick={handleAddTag}
                className="bg-greenPrimary text-white px-3 py-2 rounded-md hover:bg-green-600 font-body"
              >
                Ajouter
              </button>
            </div>
            <div className="flex flex-wrap mt-4">
              {files[currentIndex].tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-700 text-white px-2 py-1 rounded-lg mr-2 mb-2 font-body flex items-center"
                >
                  {tag}{" "}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-redPrimary"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={handleUpload}
                className="bg-greenPrimary text-white px-4 py-2 rounded-md hover:bg-green-600 font-body w-full"
              >
                Upload Fichier
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UploadMediaPage;
