import { AppFile } from "./list";

export interface FilePreview {
  id: string;
  file: File; // ici, File est probablement l'interface par défaut de JavaScript
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
  files: AppFile[];
  currentIndex: number;
  onClose: () => void;
}
