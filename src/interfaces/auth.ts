import { Image } from "./media";

export interface Field {
  id: string;
  label: string;
  type: string;
}

export interface AuthFormProps {
  title: string;
  subtitle?: string;
  fields: Field[];
  buttonText: string;
  linkText?: string;
  linkHref?: string;
  linkDescription?: string;
  onSubmit: (formData: { [key: string]: string }) => void;
  ForgotPassword?: boolean;
  showMessage?: boolean;
  message?: string;
}

export interface User {
  id: string;
  pseudonym: string;
  isValidated: boolean;
  totalFileUploads: number;
  creationDate: Date;
  recentFiles: string[];
  achievements: { [key: string]: boolean };
  tags: string[];
  favorites: Image[];
}
