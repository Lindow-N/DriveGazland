export interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export interface File {
  id: string;
  storagePath: string;
  title: string;
  totalFiles: number;
  name: string;
  type: string;
}
