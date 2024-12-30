"use client";

import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";

import { SandboxListProps } from "../../interfaces/list";

const SandboxList: React.FC<SandboxListProps> = ({
  groups,
  currentlyPlaying,
  onPlayPauseAudio,
  onAddAudioToGroup,
  selectedGroup,
  setSelectedGroup,
  audioFile,
  audioName,
  setAudioFile,
  setAudioName,
}) => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const toggleExpandGroup = (groupId: string) => {
    setExpandedGroup(expandedGroup === groupId ? null : groupId);
    if (expandedGroup !== groupId) {
      setSelectedGroup(null);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {groups.map((group) => (
        <div
          key={group.id}
          className="bg-dark2 p-4 rounded-lg shadow-md text-sm sm:text-base"
        >
          {/* Titre avec flèche */}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleExpandGroup(group.id)}
          >
            <h3 className="text-base sm:text-lg font-bold text-greenPrimary truncate">
              {group.name}
            </h3>
            {expandedGroup === group.id ? (
              <ChevronDownIcon className="h-5 w-5 text-greenPrimary" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 text-greenPrimary" />
            )}
          </div>

          {/* Contenu dépliant */}
          {expandedGroup === group.id && (
            <div className="mt-4">
              {/* Liste des audios */}
              <div className="flex flex-wrap gap-2 mb-4">
                {group.files.map((file, index) => (
                  <div key={index} className="flex items-center gap-4">
                    {/* Bouton lecture/pause */}
                    <button
                      onClick={() => onPlayPauseAudio(file.url, file.name)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                        currentlyPlaying === file.name
                          ? "bg-green-600 text-white"
                          : "bg-greenPrimary text-white hover:bg-green-600"
                      }`}
                    >
                      {currentlyPlaying === file.name ? (
                        <PauseIcon className="h-4 w-4" />
                      ) : (
                        <PlayIcon className="h-4 w-4" />
                      )}
                      {file.name}
                    </button>

                    {/* Séparateur */}
                    <span className="text-gray-400">|</span>

                    {/* Icône de téléchargement */}
                    <a
                      href={file.url}
                      download={file.name}
                      className="text-greenPrimary hover:text-green-600 flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
                        />
                      </svg>
                      Télécharger
                    </a>
                  </div>
                ))}
              </div>

              {/* Champs ajout d'audio visibles uniquement quand sélectionné */}
              {selectedGroup === group.id && (
                <div className="mt-4">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) =>
                      setAudioFile(e.target.files ? e.target.files[0] : null)
                    }
                    className="text-white mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Nom de l'audio"
                    value={audioName}
                    onChange={(e) => setAudioName(e.target.value)}
                    className="w-full px-4 py-2 bg-dark3 text-white rounded-md focus:outline-none mb-2"
                  />
                </div>
              )}

              {/* Bouton principal */}
              <button
                onClick={() =>
                  selectedGroup === group.id
                    ? onAddAudioToGroup()
                    : setSelectedGroup(group.id)
                }
                disabled={
                  selectedGroup === group.id &&
                  (!audioFile || !audioName.trim())
                }
                className={`w-full sm:w-auto mt-4 px-3 py-2 rounded-md ${
                  selectedGroup === group.id &&
                  (!audioFile || !audioName.trim())
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-greenPrimary text-white hover:bg-green-600"
                }`}
              >
                {selectedGroup === group.id
                  ? "Valider l'audio"
                  : `Ajouter un audio à ${group.name}`}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SandboxList;
