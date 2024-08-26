"use client";

import React, { useState } from "react";
import Image from "next/image";
import AuthForm from "../../components/form/AuthForm";
import {
  showSuccessToast,
  showErrorToast,
  showMockToast,
} from "../../utils/toastConfig";
import { resetPassword } from "../../firebase/auth/authService";
import AuthLayout from "../../layouts/AuthLayout";

export default function ResetPasswordPage() {
  const [showMessage, setShowMessage] = useState(false);

  const resetFields = [{ id: "email", label: "Email", type: "text" }];

  const handleResetPassword = async (formData: { [key: string]: string }) => {
    const { email } = formData;

    if (!email) {
      showMockToast("Le mec ne sait pas écrire un email.");
      return;
    }

    try {
      await resetPassword(email);
      showSuccessToast(
        "Un email de réinitialisation de mot de passe a été envoyé !"
      );
      setShowMessage(true);
    } catch (error) {
      showErrorToast("Saint-Jose dès le matin, je me sens pas bien.");
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
