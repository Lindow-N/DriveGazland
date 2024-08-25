"use client";

import React, { useState } from "react";
import Image from "next/image";
import AuthForm from "../../components/auth/AuthForm";
import { showSuccessToast, showErrorToast } from "../../utils/toastConfig";
import { resetPassword } from "../../firebase/auth/authService";
import AuthLayout from "../../layouts/AuthLayout";

export default function ResetPasswordPage() {
  const [showMessage, setShowMessage] = useState(false);

  const resetFields = [{ id: "email", label: "Email", type: "text" }];

  const handleResetPassword = async (formData: { [key: string]: string }) => {
    const { email } = formData;

    if (!email) {
      showErrorToast("L'adresse email est requise.");
      return;
    }

    try {
      await resetPassword(email);
      showSuccessToast(
        "Un email de réinitialisation de mot de passe a été envoyé !"
      );
      setShowMessage(true);
    } catch (error) {
      showErrorToast("Erreur lors de l'envoi de l'email de réinitialisation.");
    }
  };

  return (
    <AuthLayout>
      <AuthForm
        title="Réinitialiser votre mot de passe"
        subtitle="Entrez votre adresse email pour recevoir un lien de réinitialisation"
        fields={resetFields}
        buttonText="Envoyer"
        linkText="Retour"
        linkHref="/"
        linkDescription="Retour à la page de connexion"
        onSubmit={handleResetPassword}
        showMessage={showMessage}
        message="Si une adresse email valide a été fournie, un email de réinitialisation de mot de passe a été envoyé."
      />
    </AuthLayout>
  );
}
