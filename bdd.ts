export interface Image {
  id: string;
  storagePath: string;
  name?: string;
  description?: string;
  addBy: string;
  createdAt: Date;
  tags: string[];
  type: "image" | "video";
}

export interface Tag {
  createdAt: Date;
  createdBy: string;
  lastAddedFileStoragePath: string;
  name: string;
  totalFiles: number;
}

export interface User {
  id: string;
  pseudonym: string;
  isValidated: boolean;
  totalFiles: number;
  creationDate: Date;
  recentFiles: string[];
  achievements: { [key: string]: boolean };
  tags: string[];
  favorites: Image[];
  createdTags: Tag[];
  storagePath: string;
}
