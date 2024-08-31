"use client";

import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import CategoryList from "../../components/list/CategoryList";
import withAuth from "../../utils/withAuth";

const RankingPage: React.FC = () => {
  const categories = ["Nombre d'uploads", "Nombre de partages", "Succès"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Exemple de liste d'utilisateurs avec des données fictives
  const users = [
    { id: 1, name: "Utilisateur 1", value: 120 },
    { id: 2, name: "Utilisateur 2", value: 110 },
    { id: 3, name: "Utilisateur 3", value: 105 },
    { id: 4, name: "Utilisateur 4", value: 100 },
  ];

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

        {/* Liste des utilisateurs */}
        <div className="bg-dark2 p-4 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold font-title mb-4">
            {selectedCategory}
          </h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center bg-dark3 p-4 rounded-md shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-white">{user.name}</h3>
                </div>
                <span className="text-greenPrimary font-bold">
                  {user.value}
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
