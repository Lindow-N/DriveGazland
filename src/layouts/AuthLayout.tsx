"use client";

import React from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div
      style={{ backgroundColor: "#111828" }}
      className="min-h-screen flex flex-col items-center justify-center pt-12 md:pt-20 pb-6 px-2 md:px-0 font-body"
    >
      <header className="max-w-lg mx-auto mb-4 mt-2 md:mt-12">
        <Image
          src="/images/GazlandProjet.png"
          alt="Drive Gazland Logo"
          layout="intrinsic"
          width={400}
          height={200}
          className="mx-auto"
        />
      </header>
      <div className="w-full max-w-lg mx-auto flex-grow">{children}</div>
    </div>
  );
};

export default AuthLayout;
