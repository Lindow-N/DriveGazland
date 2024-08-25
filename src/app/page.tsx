"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Utilise useRouter de next/navigation
import AuthForm from "../components/auth/AuthForm";
import { loginUser } from "../firebase/auth/authService";
import { showSuccessToast, showErrorToast } from "../utils/toastConfig";
import { firebaseErrors } from "../utils/firebaseErrors";
import AuthLayout from "../layouts/AuthLayout";

export default function LoginPage() {
  const router = useRouter(); // Déclaration du hook useRouter

  const loginFields = [
    { id: "email", label: "Email", type: "text" },
    { id: "password", label: "Mot de passe", type: "password" },
  ];

  const handleLogin = async (formData: { [key: string]: string }) => {
    const { email, password } = formData;

    if (!email || !password) {
      showErrorToast("Tous les champs sont requis.");
      return;
    }

    if (password.length < 8) {
      showErrorToast("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    try {
      await loginUser(email, password);
      showSuccessToast("Connexion réussie !");
      router.push("/dashboard"); // Rediriger vers le tableau de bord après la connexion
    } catch (error) {
      const errorMessage = firebaseErrors(error.code);
      showErrorToast(errorMessage);
    }
  };

  return (
    <AuthLayout>
      <AuthForm
        title="Wow le gars"
        subtitle="Connecte-toi pelo"
        fields={loginFields}
        buttonText="Se connecter"
        linkText="S'inscrire"
        linkHref="/register"
        linkDescription="Pas de compte ?"
        onSubmit={handleLogin}
        ForgotPassword
      />
    </AuthLayout>
  );
}
