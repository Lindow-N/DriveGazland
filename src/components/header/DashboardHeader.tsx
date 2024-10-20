"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  PlusCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useTags } from "../../context/TagContext";
import { useFiles } from "../../context/FilesContext"; // Import du contexte pour la recherche de fichiers
import Tag from "../../components/shared/Tag";

interface HeaderProps {
  greetingText: string;
  onSearchResults: (files: any[]) => void;
  selectedTags: string[]; // Tableau de chaînes de caractères
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>; // Setter pour les tags sélectionnés
}

const DashboardHeader: React.FC<HeaderProps> = ({
  greetingText,
  onSearchResults,
  selectedTags, // Tags sélectionnés
  setSelectedTags, // Setter des tags sélectionnés
}) => {
  const router = useRouter();
  const { tags } = useTags();
  const { searchFilesByTags } = useFiles();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTags, setFilteredTags] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const suggestions = tags
        .filter((tag) => tag.toLowerCase().startsWith(searchTerm.toLowerCase()))
        .slice(0, 5);
      setFilteredTags(suggestions);
    } else {
      setFilteredTags([]);
    }
  }, [searchTerm, tags]);

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prevTags: string[]) => [...prevTags, tag]); // Assure-toi que prevTags est bien typé en string[]
    }
    setSearchTerm(""); // Efface la barre de recherche après ajout
    setFilteredTags([]); // Efface les suggestions
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(
      (prevTags: string[]) => prevTags.filter((tag) => tag !== tagToRemove) // Filtre les tags correctement
    );
  };

  const handleAddMediaClick = () => {
    router.push("/uploadMedia");
  };

  useEffect(() => {
    let unsubscribe = () => {}; // Fonction d'annulation par défaut

    if (selectedTags.length > 0) {
      // Passer `onSearchResults` comme callback pour `onUpdate`
      unsubscribe = searchFilesByTags(selectedTags, (files) => {
        onSearchResults(files);
      });
    } else {
      onSearchResults([]); // Réinitialiser les résultats quand aucun tag n'est sélectionné
    }

    // Nettoyage lors du démontage du composant ou des changements dans les tags
    return () => {
      unsubscribe();
    };
  }, [selectedTags, searchFilesByTags, onSearchResults]);

  console.log("tags", tags);
  return (
    <>
      <header className="bg-dark2 px-8 py-7 flex justify-between items-center">
        <h2 className="text-white text-lg md:text-3xl ml-6 hidden lg:block">
          {greetingText}
        </h2>

        <div className="flex items-center w-full lg:w-2/3 ml-6 justify-between">
          <div className="relative flex items-center bg-dark3 rounded-lg w-full lg:w-3/4 mr-4">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 ml-2" />
            <input
              type="text"
              placeholder="Rechercher des tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-2 bg-dark3 text-white placeholder-gray-400 rounded-lg focus:outline-none"
            />
            {filteredTags.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-dark3 rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
                {filteredTags.map((tag) => (
                  <div
                    key={tag}
                    className="p-2 hover:bg-dark2 cursor-pointer text-white"
                    onClick={() => handleAddTag(tag)} // Ajouter le tag à la recherche
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleAddMediaClick}
            className="flex items-center bg-greenPrimary text-white px-2 py-2 rounded-lg hover:bg-green-600 transition duration-150 ease-in-out whitespace-nowrap"
          >
            <PlusCircleIcon className="w-7 h-7 mr-0 md:mr-2" />
            <span className="hidden md:inline">Ajouter un média</span>
          </button>
        </div>
      </header>

      {selectedTags.length > 0 && (
        <div className="bg-dark1 py-4 px-8">
          <div className="flex flex-wrap justify-center">
            {selectedTags.map((tag, index) => (
              <Tag
                key={index}
                text={tag}
                onRemove={() => handleRemoveTag(tag)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHeader;
