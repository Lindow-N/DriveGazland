"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import DashboardLayout from "../../layouts/DashboardLayout";
import { FilePreview } from "../../interfaces/media";
import withAuth from "../../utils/withAuth";
import { addUniqueTag } from "../../utils/helper";
import { uploadFile } from "../../firebase/files/filesServices";
import { updateOrCreateTag } from "../../firebase/tags/tagsServices";
import { useUser } from "../../context/UserContext";
import { updateUserFileCount } from "../../firebase/users/usersServices";
import { useTags } from "../../context/TagContext";
import { showSuccessToast, showErrorToast } from "../../utils/toastConfig";
import Tag from "../../components/shared/Tag";

const UploadMediaPage: React.FC = () => {
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user } = useUser();
  const { tags } = useTags();

  const handleAddTag = (tagToAdd: string) => {
    if (tagToAdd.trim() === "") return;
    const updatedFiles = [...files];
    updatedFiles[currentIndex].tags = addUniqueTag(
      updatedFiles[currentIndex].tags,
      tagToAdd
    );
    setFiles(updatedFiles);
    setNewTag("");
    setFilteredTags([]);
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

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase();
    setNewTag(inputValue);

    if (inputValue.length > 0) {
      const filtered = tags.filter((tag) =>
        tag.toLowerCase().startsWith(inputValue)
      );

      setFilteredTags(filtered);
    } else {
      setFilteredTags([]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const handleUploadCurrentFile = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const currentFile = files[currentIndex];

      // Upload du fichier
      const uploadTask = uploadFile(
        currentFile.file,
        currentFile.file.type.startsWith("image") ? "image" : "video",
        currentFile.tags,
        user,
        (progress) => setUploadProgress(progress)
      );

      // On récupère uniquement le storagePath ici
      const storagePath = await uploadTask;

      // Mise à jour des tags en base pour ce fichier avec storagePath
      for (const tag of currentFile.tags) {
        await updateOrCreateTag(tag, storagePath, user); // Envoyer storagePath
      }

      // Mise à jour du nombre de fichiers uploadés par l'utilisateur
      await updateUserFileCount(user?.id, storagePath);

      showSuccessToast();

      // Passer à l'image suivante après l'upload
      if (currentIndex + 1 < files.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Si tous les fichiers ont été uploadés
        setFiles([]);
        setCurrentIndex(0);
      }

      setNewTag(""); // Réinitialiser le champ de tag
      setUploadProgress(100); // Indiquer la fin du processus
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
      showErrorToast("Erreur lors de l'upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-dark1 min-h-screen p-8 pb-32 lg:pb-8 ">
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
            <div className="text-white mb-4 font-bold font-subtitle text-center">
              {currentIndex + 1} sur {files.length}
            </div>

            <div className="bg-dark2 p-4 rounded-lg shadow-md w-full">
              {files[currentIndex].file.type.startsWith("video") ? (
                <video
                  src={files[currentIndex].preview}
                  controls
                  className="w-full max-w-[500px] max-h-[400px] h-auto object-contain rounded-md mb-4"
                />
              ) : (
                <Zoom>
                  <img
                    src={files[currentIndex].preview}
                    alt="Image active"
                    className="w-full max-w-[500px] max-h-[400px] h-auto object-contain rounded-md mb-4 cursor-pointer"
                  />
                </Zoom>
              )}
              <div className="text-white font-bold font-subtitle mb-2 text-center">
                {files[currentIndex].tags.join(" ")}
              </div>
            </div>

            {!isUploading ? (
              <>
                <div className="flex items-center mt-4 w-full relative">
                  <input
                    type="text"
                    value={newTag}
                    onChange={handleTagInputChange}
                    placeholder="Ajouter un tag"
                    className="bg-dark3 text-white p-2 rounded-md focus:outline-none font-body w-full mr-2"
                  />
                  <button
                    onClick={() => handleAddTag(newTag)}
                    className={`bg-greenPrimary text-white px-3 py-2 rounded-md font-body ${
                      newTag.trim() === ""
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-green-600"
                    }`}
                    disabled={newTag.trim() === ""}
                  >
                    Ajouter
                  </button>

                  {filteredTags.length > 0 && (
                    <div className="absolute top-full mt-2 w-full bg-dark3 rounded-md shadow-lg max-h-28 overflow-y-auto z-10">
                      {filteredTags.map((tag) => (
                        <div
                          key={tag}
                          className="p-2 hover:bg-dark2 cursor-pointer text-white"
                          onClick={() => handleAddTag(tag)}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap mt-4">
                  {files[currentIndex].tags.map((tag, index) => (
                    <Tag
                      key={index}
                      text={tag}
                      onRemove={() => handleRemoveTag(tag)}
                    />
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleUploadCurrentFile}
                    className={`bg-greenPrimary text-white px-4 py-2 rounded-md font-body w-full ${
                      files[currentIndex].tags.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-green-600"
                    }`}
                    disabled={files[currentIndex].tags.length === 0}
                  >
                    Upload Fichier
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-6">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-greenPrimary h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-center text-white mt-2 font-body">
                  {uploadProgress}%
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default withAuth(UploadMediaPage);
