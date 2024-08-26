"use client";

import React from "react";
import {
  PlusCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface HeaderProps {
  greetingText: string;
}

const DashboardHeader: React.FC<HeaderProps> = ({ greetingText }) => {
  return (
    <header className="bg-dark2 px-10 py-6 flex justify-between items-center">
      {/* Salutation */}
      <h2 className="text-white text-lg md:text-3xl ml-6 hidden sm:block">
        {greetingText}
      </h2>

      {/* Container pour la barre de recherche et le bouton */}
      <div className="flex items-center ml-4 w-full sm:w-2/3 lg:w-1/2">
        {/* Barre de recherche */}
        <div className="flex items-center bg-dark3 rounded-lg w-full mr-4">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full px-2 py-2 bg-dark3 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-greenPrimary"
          />
        </div>

        {/* Bouton d'ajout de média */}
        <button className="flex items-center bg-greenPrimary text-white px-2 py-2 rounded-lg hover:bg-green-600 transition duration-150 ease-in-out md:px-3 md:py-1">
          <PlusCircleIcon className="w-7 h-7 mr-0 md:mr-2" />
          <span className="hidden md:inline">Ajouter un média</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
