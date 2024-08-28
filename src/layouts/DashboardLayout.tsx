"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  HomeIcon,
  FolderIcon,
  UsersIcon,
  CogIcon,
  ArrowLeftEndOnRectangleIcon,
  TrophyIcon,
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion :", error);
      });
  };

  // Fonction pour fermer la sidebar
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Empêcher le défilement du body lorsque la sidebar est ouverte
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen]);

  return (
    <div className="flex relative">
      {/* Bouton pour ouvrir le menu burger */}
      {!isSidebarOpen && (
        <button
          className="lg:hidden fixed top-8 left-4 z-50 text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Bars3Icon className="w-8 h-8" />
        </button>
      )}

      {/* Overlay pour capturer les clics à l'extérieur */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={handleCloseSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-[75%] lg:w-[20%] h-screen bg-dark2 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="flex flex-col h-full px-4 py-6">
          {/* Contenu supérieur de la sidebar */}
          <div>
            <div className="flex items-center justify-center mb-8 md:mb-12">
              <Image
                src="/images/GazlandprojetDashboard.png"
                alt="Logo"
                layout="intrinsic"
                width={250}
                height={125}
                className="h-6"
              />
            </div>

            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/dashboard"
                  className="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
                  onClick={handleCloseSidebar}
                >
                  <HomeIcon className="w-6 h-6 text-gray-400 group-hover:text-white" />
                  <span className="ml-3">Accueil</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
                  onClick={handleCloseSidebar}
                >
                  <TrophyIcon className="w-6 h-6 text-gray-400 group-hover:text-white" />
                  <span className="ml-3">Classement</span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
                  onClick={handleCloseSidebar}
                >
                  <UserCircleIcon className="w-6 h-6 text-gray-400 group-hover:text-white" />
                  <span className="ml-3">Mon Profil</span>
                </a>
              </li>
            </ul>

            <div className="mt-8 space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-dark3">
                <span className="flex items-center">
                  <FolderIcon className="w-6 h-6 me-2" />
                  Tous les fichiers
                </span>
                <span className="bg-gray-700 text-xs rounded-md px-2 py-1">
                  48
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-dark3">
                <span className="flex items-center">
                  <FolderIcon className="w-6 h-6 me-2" />
                  Tous les dossiers
                </span>
                <span className="bg-gray-700 text-xs rounded-md px-2 py-1">
                  6
                </span>
              </div>
            </div>

            {/* Bouton de déconnexion juste en dessous */}
            <div className="mt-4">
              <button
                onClick={() => {
                  handleSignOut();
                  handleCloseSidebar();
                }}
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
              >
                <ArrowLeftEndOnRectangleIcon className="w-6 h-6 text-gray-400" />
                <span className="ml-3">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 ml-0 lg:ml-[20%] ">{children}</div>
    </div>
  );
};

export default DashboardLayout;
