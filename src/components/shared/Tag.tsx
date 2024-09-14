import React from "react";

interface TagProps {
  text: string;
  onRemove: () => void;
}

const Tag: React.FC<TagProps> = ({ text, onRemove }) => {
  return (
    <span className="bg-greenPrimary text-white px-4 py-2 rounded-lg mr-2 mb-2 font-body flex items-center">
      {text}
      <button
        onClick={onRemove}
        className="ml-4 text-black hover:text-red-500 text-2xl font-bold focus:outline-none"
      >
        &times;
      </button>
    </span>
  );
};

export default Tag;
