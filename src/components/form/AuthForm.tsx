"use client";

import React, { useState } from "react";
import { AuthFormProps, Field } from "../../interfaces/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  subtitle,
  fields,
  buttonText,
  linkText,
  linkHref,
  linkDescription,
  onSubmit,
  ForgotPassword,
  showMessage,
  message,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <main className="bg-dark3 max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
      <section>
        <h3 className="font-bold text-2xl text-white font-subtitle">{title}</h3>
        <p className="text-gray-300 pt-2">{subtitle}</p>
      </section>

      {showMessage ? (
        <div className="bg-green-500 p-4 rounded text-white text-center mt-6">
          {message}
        </div>
      ) : (
        <section className="mt-10">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {fields.map((field, index) => (
              <div key={index} className="mb-6 pt-3 rounded bg-dark2 relative">
                <label
                  className="block text-gray-300 text-sm font-bold mb-2 ml-3 font-subtitle"
                  htmlFor={field.id}
                >
                  {field.label}
                </label>
                <input
                  type={
                    field.type === "password" && showPassword
                      ? "text"
                      : field.type
                  }
                  id={field.id}
                  value={formData[field.id] || ""}
                  onChange={handleInputChange}
                  className="bg-dark2 rounded w-full text-white focus:outline-none border-b-4 border-dark1 focus:border-greenPrimary transition duration-500 px-3 pb-3"
                />
                {field.type === "password" && (
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                )}
              </div>
            ))}
            {ForgotPassword && (
              <div className="flex justify-end">
                <a
                  href="/reset-password"
                  className="text-sm text-greenPrimary hover:text-greenPrimary hover:underline mb-6"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            )}
            <button
              className="bg-greenPrimary hover:bg-green-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
            >
              {buttonText}
            </button>
          </form>
        </section>
      )}

      {linkText && (
        <div className="max-w-lg mx-auto text-center mt-12 mb-6">
          <p className="text-white">
            {linkDescription}{" "}
            <a
              href={linkHref}
              className="font-bold text-greenPrimary hover:underline"
            >
              {linkText}
            </a>
            .
          </p>
        </div>
      )}
    </main>
  );
};

export default AuthForm;
