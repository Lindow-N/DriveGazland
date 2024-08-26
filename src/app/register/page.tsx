"use client";

import React, { useState } from "react";
import Image from "next/image";
import AuthForm from "../../components/form/AuthForm";
import { registerUser } from "../../firebase/auth/authService";
import { showMockToast, showErrorToast } from "../../utils/toastConfig";
import { firebaseErrors } from "../../utils/firebaseErrors";
import AuthLayout from "../../layouts/AuthLayout";
import router from "next/router";

export default function RegisterPage() {
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
      await registerUser(email, password);
      router.push("/dashboard");
    } catch (error) {
      const errorMessage = firebaseErrors(error.code);
      showErrorToast(errorMessage);
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
