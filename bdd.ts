export interface Image {
  id: string;
  url: string;
  title?: string;
  description?: string;
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
