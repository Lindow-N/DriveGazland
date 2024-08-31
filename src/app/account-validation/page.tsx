"use client";

import React from "react";

const AccountValidationPage: React.FC = () => {
  return (
    <div className="bg-dark1 min-h-screen flex flex-col items-center justify-center p-8">
      <div className="bg-dark3 text-white text-lg font-title text-center px-6 py-4 rounded-md mb-8 max-w-xl">
        Votre compte est en attente de validation.
      </div>

      <div className="w-full max-w-2xl mt-8">
        <img
          src="/images/account-validation/Dora1.png"
          alt="Validation en cours"
          className="w-full h-auto object-contain rounded-md"
        />
      </div>
    </div>
  );
};

export default AccountValidationPage;
