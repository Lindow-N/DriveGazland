import { User } from "./auth";

export interface TagContextType {
  tags: string[];
  tagsWithData: { id: string; data: any }[];
  loadingTags: boolean;
  totalTags: number;
  linkedTags: { group: string; tags: string[]; id: string }[];
  setLinkedTags: React.Dispatch<
    React.SetStateAction<{ group: string; tags: string[]; id: string }[]>
  >;
}

export interface UserContextType {
  user: User | null;
  allUsers: User[] | null;
  loading: boolean;
  logout: () => Promise<void>;
}
