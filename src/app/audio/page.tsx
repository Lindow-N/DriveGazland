"use client";

import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  createAudioGroup,
  addAudioToGroup,
  getAudioGroups,
} from "../../firebase/sandboxAudio/sandboxAudioServices";
import { useUser } from "../../context/UserContext";
import SandboxList from "../../components/list/SandboxList";

const AudioPage: React.FC = () => {
  const { user } = useUser();
  const [sandboxGroups, setSandboxGroups] = useState<
    {
      id: string;
      name: string;
      type: string;
      files: { name: string; url: string }[];
    }[]
  >([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioName, setAudioName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null); // ID de l'audio en cours
  const audioRef = useRef<HTMLAudioElement | null>(null); // Référence audio

  useEffect(() => {
    const fetchAudioData = async () => {
      try {
        const audioGroups = await getAudioGroups();
        setSandboxGroups(audioGroups);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des groupes audio :",
          error
        );
      }
    };

    fetchAudioData();
  }, []);

  const handlePlayPauseAudio = (fileUrl: string, fileId: string) => {
    if (audioRef.current) {
      if (currentlyPlaying === fileId) {
        // Si le fichier est déjà en cours, on met en pause
        audioRef.current.pause();
        setCurrentlyPlaying(null);
      } else {
        // Sinon, on joue le nouveau fichier
        audioRef.current.src = fileUrl;
        audioRef.current.play();
        setCurrentlyPlaying(fileId);
      }
    } else {
      // Crée un nouvel élément audio si aucun n'existe
      const newAudio = new Audio(fileUrl);
      newAudio.play();
      audioRef.current = newAudio;
      setCurrentlyPlaying(fileId);

      newAudio.onended = () => {
        setCurrentlyPlaying(null);
      };
    }
  };

  const handleAddAudioToGroup = async () => {
    if (!selectedGroup || !audioFile || !audioName.trim() || !user) {
      console.error("Données manquantes :", {
        selectedGroup,
        audioFile,
        audioName,
        user,
      });
      return;
    }

    try {
      const audioElement = document.createElement("audio");
      audioElement.src = URL.createObjectURL(audioFile);

      audioElement.onloadedmetadata = async () => {
        const duration = Math.floor(audioElement.duration);

        await addAudioToGroup(selectedGroup, audioFile, {
          uploadedBy: user.pseudonym,
          duration,
          name: audioName.trim(),
        });

        const updatedGroups = sandboxGroups.map((group) =>
          group.id === selectedGroup
            ? {
                ...group,
                files: [
                  ...group.files,
                  {
                    name: audioName.trim(),
                    url: URL.createObjectURL(audioFile),
                  },
                ],
              }
            : group
        );

        setSandboxGroups(updatedGroups);
        setAudioFile(null);
        setAudioName("");
        setSelectedGroup(null);
      };

      audioElement.onerror = () => {
        console.error("Erreur lors du chargement des métadonnées audio");
      };
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'audio :", error);
    }
  };

  const handleCreateAudioGroup = async () => {
    if (!newGroupName.trim() || !user) return;

    try {
      const groupId = await createAudioGroup(newGroupName, user.id, "sandbox");

      setSandboxGroups([
        ...sandboxGroups,
        { id: groupId, name: newGroupName, type: "sandbox", files: [] },
      ]);
      setNewGroupName("");
    } catch (error) {
      console.error("Erreur lors de la création du groupe :", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-dark1 min-h-screen p-8 text-white">
        <h1 className="text-2xl font-bold text-white mb-6 font-title lg:ml-0 ml-6">
          Sandbox Audio
        </h1>

        {/* Liste des Sandbox */}
        <SandboxList
          groups={sandboxGroups}
          currentlyPlaying={currentlyPlaying}
          onPlayPauseAudio={handlePlayPauseAudio}
          onAddAudioToGroup={handleAddAudioToGroup}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          audioFile={audioFile}
          audioName={audioName}
          setAudioFile={setAudioFile}
          setAudioName={setAudioName}
        />

        {/* Création de Sandbox */}
        <div className="mb-8 mt-8 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <input
            type="text"
            placeholder="Nom du sandbox"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-dark3 text-white rounded-md focus:outline-none"
          />
          <button
            onClick={handleCreateAudioGroup}
            className="w-full sm:w-auto bg-greenPrimary text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Créer
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AudioPage;
