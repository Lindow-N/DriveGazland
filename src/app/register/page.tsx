"use client";

import React, { useState } from "react";
import AuthForm from "../../components/form/AuthForm";
import { registerUser } from "../../firebase/auth/authService";
import { showMockToast, showErrorToast } from "../../utils/toastConfig";
import { firebaseErrors } from "../../utils/firebaseErrors";
import AuthLayout from "../../layouts/AuthLayout";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const registerFields = [
    { id: "username", label: "Pseudo", type: "text" },
    { id: "email", label: "Email", type: "text" },
    { id: "password", label: "Mot de passe", type: "password" },
  ];

  const handleRegister = async (formData: { [key: string]: string }) => {
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      showMockToast("Faut remplir les champs, dozo.");
      return;
    }

    if (!email.includes("@")) {
      showMockToast("Le mec ne sait pas écrire un email.");
      return;
    }

    if (password.length < 8) {
      showErrorToast("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    try {
      await registerUser(email, password, username);
      router.push("/dashboard");
    } catch (error) {
      if (error.code && firebaseErrors(error.code)) {
        const errorMessage = firebaseErrors(error.code);
        showErrorToast(errorMessage);
      } else {
        showErrorToast("Une erreur inconnue s'est produite.");
      }
    }
  };

  return (
    <AuthLayout>
      <AuthForm
        title="Bienvenue!"
        subtitle="Inscris-toi pour commencer"
        fields={registerFields}
        buttonText="S'inscrire"
        linkText="Se connecter"
        linkHref="/"
        linkDescription="Déjà un compte ?"
        onSubmit={handleRegister}
      />
    </AuthLayout>
  );
}
