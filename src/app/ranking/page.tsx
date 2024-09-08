"use client";

import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import CategoryList from "../../components/list/CategoryList";
import withAuth from "../../utils/withAuth";
import { useUser } from "../../context/UserContext";

const RankingPage: React.FC = () => {
  const categories = ["Nombre d'uploads", "Nombre de tags créés"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const { allUsers } = useUser();

  // Fonction pour trier les utilisateurs en fonction de la catégorie sélectionnée
  const sortedUsers = (allUsers || []).sort((a, b) => {
    if (selectedCategory === "Nombre d'uploads") {
      return (b.totalFileUploads || 0) - (a.totalFileUploads || 0);
    } else if (selectedCategory === "Nombre de tags créés") {
      return (b.createdTags?.length || 0) - (a.createdTags?.length || 0);
    }
    return 0;
  });

  return (
    <DashboardLayout>
      <div className="bg-dark1 min-h-screen p-8 text-white">
        <h1 className="text-2xl font-bold text-white mb-6 font-title lg:ml-0 ml-6">
          Classement
        </h1>

        {/* Liste des catégories pour trier le classement */}
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Liste des utilisateurs triés */}
        <div className="bg-dark2 p-4 rounded-lg shadow-md mt-6">
          <div className="space-y-4">
            {sortedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center bg-dark3 p-4 rounded-md shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-white">{user.pseudonym}</h3>
                </div>
                <span className="text-greenPrimary font-bold">
                  {selectedCategory === "Nombre d'uploads"
                    ? user.totalFileUploads
                    : user?.createdTags?.length || 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(RankingPage);
