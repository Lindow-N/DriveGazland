import { User } from "./auth";

export interface TagContextType {
  tags: string[];
  tagsWithData: { id: string; data: any }[];
  loadingTags: boolean;
  totalTags: number;
}

export interface UserContextType {
  user: User | null;
  allUsers: User[] | null;
  loading: boolean;
  logout: () => Promise<void>;
}
