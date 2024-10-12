"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AuthForm from "../components/form/AuthForm";
import { loginUser, isUserValidated } from "../firebase/auth/authService"; // Import depuis le fichier service
import {
  showMockToast,
  showErrorToast,
  showSuccessToast,
} from "../utils/toastConfig";
import { firebaseErrors } from "../utils/firebaseErrors";
import AuthLayout from "../layouts/AuthLayout";

export default function LoginPage() {
  const router = useRouter();

  const loginFields = [
    { id: "email", label: "Email", type: "text" },
    { id: "password", label: "Mot de passe", type: "password" },
  ];

  const handleLogin = async (formData: { [key: string]: string }) => {
    const { email, password } = formData;

    if (!email || !password) {
      showMockToast("Faut remplir les champs, dozo.");
      return;
    }

    if (password.length < 8) {
      showErrorToast("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    try {
      // Connexion de l'utilisateur via le service
      const user = await loginUser(email, password);

      // Vérification de l'état de validation via le service
      const isValidated = await isUserValidated(user.uid);

      if (isValidated) {
        router.push("/dashboard"); // Redirection vers le dashboard si validé
      } else {
        showErrorToast("Votre compte n'est pas encore validé.");
        router.push("/account-validation"); // Redirection vers la page de validation
      }
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
