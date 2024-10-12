"use client";
import React, { useState } from "react";
import Tag from "../../components/shared/Tag";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useTags } from "../../context/TagContext";
import {
  createLinkedTagGroup,
  addTagToGroup,
  removeTagFromGroup,
  deleteLinkedTagGroup,
} from "../../firebase/tags/linkedTagsServices";

const LinkedTagsPage: React.FC = () => {
  const [newGroup, setNewGroup] = useState<string[]>([]);
  const { linkedTags, tags, loadingTags, setLinkedTags } = useTags();

  const isTagInAnyGroup = (tag: string) => {
    return linkedTags.some(
      (groupItem) => groupItem?.group === tag || groupItem?.tags?.includes(tag)
    );
  };

  const handleRemoveTag = async (groupId: string, tagToRemove: string) => {
    try {
      if (!groupId) {
        console.error("groupId is undefined or null");
        return;
      }

      if (tagToRemove === groupId) {
        // Supprimer tout le groupe si le premier tag est supprimé
        const updatedLinkedTags = linkedTags.filter(
          (groupItem) => groupItem.id !== groupId
        );
        setLinkedTags(updatedLinkedTags);
        await deleteLinkedTagGroup(groupId);
      } else {
        const updatedLinks = linkedTags.map((groupItem) => {
          if (groupItem.id === groupId) {
            const updatedTags = groupItem.tags.filter(
              (tag) => tag !== tagToRemove
            );
            return { ...groupItem, tags: updatedTags };
          }
          return groupItem;
        });
        setLinkedTags(updatedLinks);
        await removeTagFromGroup(groupId, tagToRemove);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du tag :", error);
    }
  };

  const handleAddTag = async (groupId: string, newTag: string) => {
    try {
      const updatedLinks = linkedTags.map((groupItem) => {
        if (groupItem.id === groupId) {
          return { ...groupItem, tags: [...groupItem.tags, newTag] };
        }
        return groupItem;
      });
      setLinkedTags(updatedLinks);
      await addTagToGroup(groupId, newTag);
    } catch (error) {
      console.error("Erreur lors de l'ajout du tag :", error);
    }
  };

  const handleCreateNewGroup = async () => {
    if (newGroup.length > 0) {
      try {
        const groupId = await createLinkedTagGroup(newGroup[0], newGroup);

        setLinkedTags([
          ...linkedTags,
          { group: newGroup[0], tags: newGroup, id: groupId },
        ]);

        setNewGroup([]);
      } catch (error) {
        console.error("Erreur lors de la création du groupe :", error);
      }
    }
  };

  const handleAddToNewGroup = (tag: string) => {
    if (!newGroup.includes(tag) && !isTagInAnyGroup(tag)) {
      setNewGroup([...newGroup, tag]);
    } else {
      alert(`Le tag "${tag}" est déjà dans un autre groupe.`);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-dark1 p-8">
        <h1 className="text-2xl font-bold text-white mb-6 font-title lg:ml-0 ml-6">
          Gestion des Tags Liés
        </h1>

        {loadingTags ? (
          <p className="text-white text-lg">Chargement des tags liés...</p>
        ) : (
          <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
            {linkedTags.length === 0 ? (
              <p className="text-white">
                Aucun groupe de tags lié n'est disponible.
              </p>
            ) : (
              linkedTags.map((groupItem) => (
                <div
                  key={groupItem.id}
                  className="bg-dark2 p-4 rounded-lg border-2 border-gray-600 w-64 flex flex-col justify-center items-center shadow-lg mx-auto"
                >
                  <h2 className="text-greenPrimary font-subtitle text-xl mb-4 font-bold">
                    Groupe : {groupItem.group}
                  </h2>
                  <div className="flex flex-wrap justify-center">
                    {groupItem?.tags?.map((tag) => (
                      <Tag
                        key={tag}
                        text={tag}
                        onRemove={() => handleRemoveTag(groupItem.id, tag)}
                      />
                    ))}
                  </div>
                  <select
                    className="mt-4 bg-dark3 text-white px-4 py-2 rounded-lg w-full"
                    onChange={(e) => handleAddTag(groupItem.id, e.target.value)}
                    value=""
                  >
                    <option value="" disabled>
                      Ajouter un tag
                    </option>
                    {tags
                      .filter(
                        (tag) =>
                          !groupItem?.tags?.includes(tag) &&
                          !isTagInAnyGroup(tag)
                      )
                      .map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                  </select>
                </div>
              ))
            )}

            <div className="bg-dark2 p-4 rounded-lg border-2 border-gray-600 w-64 flex flex-col justify-center items-center shadow-lg mx-auto">
              <h2 className="text-greenPrimary font-subtitle text-xl mb-4">
                Nouveau Groupe
              </h2>
              <div className="flex flex-wrap justify-center">
                {newGroup.map((tag) => (
                  <Tag
                    key={tag}
                    text={tag}
                    onRemove={() =>
                      setNewGroup(newGroup.filter((t) => t !== tag))
                    }
                  />
                ))}
              </div>
              <select
                className="mt-4 bg-dark3 text-white px-4 py-2 rounded-lg w-full"
                onChange={(e) => handleAddToNewGroup(e.target.value)}
                value=""
              >
                <option value="" disabled>
                  {newGroup.length === 0
                    ? "Créer un groupe"
                    : "Ajouter des tags"}
                </option>
                {tags
                  .filter(
                    (tag) => !newGroup.includes(tag) && !isTagInAnyGroup(tag)
                  )
                  .map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
              </select>
              <button
                onClick={handleCreateNewGroup}
                className="mt-4 bg-greenPrimary text-white px-4 py-2 rounded-lg w-full"
                disabled={newGroup.length === 0}
              >
                Créer le groupe
              </button>
            </div>
          </div>
        )}
        {/* Encadré explicatif en bas */}
        <div className="mt-12 p-6 bg-dark2 border-2 border-gray-600 rounded-lg text-white">
          <h2 className="text-xl font-bold text-greenPrimary mb-4">
            À quoi sert cette page Bot Casi ?
          </h2>
          <p className="text-base mb-2">
            Cette page vous permet de lier des tags entre eux pour simplifier la
            recherche. Lorsque des tags sont associés dans un groupe, rechercher
            n'importe lequel de ces tags renverra également les résultats des
            autres tags liés.
          </p>
          <p className="text-base mb-2">
            Par exemple, si vous liez les tags <strong>2000</strong>,{" "}
            <strong>Proplay</strong>, et <strong>LeFréreDeThéa</strong>,
            rechercher <strong>2000</strong> affichera également les fichiers
            avec les tags <strong>Proplay</strong> et{" "}
            <strong>LeFréreDeThéa</strong>. De la même manière, rechercher{" "}
            <strong>Proplay</strong> ou <strong>LeFréreDeThéa</strong> renverra
            aussi les résultats des autres tags liés.
          </p>
          <p className="text-base">
            Vous pouvez créer un nouveau groupe en sélectionnant des tags et les
            supprimer en retirant le premier tag du groupe.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LinkedTagsPage;
