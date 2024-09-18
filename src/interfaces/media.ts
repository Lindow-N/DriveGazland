export interface FilePreview {
  id: string;
  file: File;
  preview: string;
  tags: string[];
}

export interface Image {
  id: string;
  storagePath: string;
  title?: string;
  description?: string;
}
