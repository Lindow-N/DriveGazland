import { SandboxGroup } from "./sandbox";

// Renommer l'interface `File` pour éviter les conflits avec le type natif `File`
export interface AppFile {
  id: string;
  storagePath: string;
  name: string;
  totalFiles: number;
  type: string;
  addBy?: string; // Facultatif si nécessaire
  tags?: string[]; // Facultatif si nécessaire
  createdAt?: Date; // Facultatif si nécessaire
}

export interface FilePreview {
  id: string;
  file: File; // Ici, `File` fait référence au type natif de JavaScript
  preview: string;
  tags: string[];
}

export interface Image {
  id: string;
  storagePath: string;
  name?: string;
  description?: string;
}

export interface MediaModalProps {
  files: AppFile[]; // Utilisation de `AppFile` au lieu de `File`
  currentIndex: number;
  onClose: () => void;
}

export interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export interface SandboxListProps {
  groups: SandboxGroup[];
  currentlyPlaying: string | null;
  onPlayPauseAudio: (fileUrl: string, fileId: string) => void;
  onAddAudioToGroup: () => void;
  selectedGroup: string | null;
  setSelectedGroup: (groupId: string | null) => void;
  audioFile: File | null;
  audioName: string;
  setAudioFile: (file: File | null) => void;
  setAudioName: (name: string) => void;
}
