export interface FilePreview {
  id: string;
  file: File;
  preview: string;
  tags: string[];
}

export interface Image {
  id: string;
  url: string;
  title?: string;
  description?: string;
}
