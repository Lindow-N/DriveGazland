"use client";

import React from "react";
import { CategoryListProps } from "../../interfaces/list";

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="bg-dark1 p-4 sm:p-8 md:p-16">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4">
        {selectedCategory}
      </h2>

      <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-md md:text-lg transition duration-150 ease-in-out ${
              selectedCategory === category
                ? "bg-dark3 text-white"
                : "bg-transparent text-gray-400 opacity-80"
            } hover:bg-dark2 hover:text-white`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
