export interface File {
  name: string;
  url: string;
}

export interface SandboxGroup {
  id: string;
  name: string;
  files: File[];
}
