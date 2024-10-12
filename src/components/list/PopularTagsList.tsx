import React from "react";

interface PopularTagsListProps {
  tagsWithData: { id: string; data: { name: string; totalFiles: number } }[];
  onTagClick: (tag: string) => void;
}

const PopularTagsList: React.FC<PopularTagsListProps> = ({
  tagsWithData,
  onTagClick,
}) => {
  // Trier les tags par ordre décroissant du totalFiles
  const sortedTags = tagsWithData.sort(
    (a, b) => b.data.totalFiles - a.data.totalFiles
  );

  return (
    <div className="mt-6">
      <h3 className="text-white font-bold font-subtitle mb-4">
        Tags populaires :
      </h3>
      <div className="flex flex-wrap">
        {sortedTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onTagClick(tag.data.name)}
            className="bg-greenPrimary text-white px-4 py-2 rounded-lg mr-3 mb-3 font-body hover:bg-green-600"
          >
            {tag.data.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularTagsList;
