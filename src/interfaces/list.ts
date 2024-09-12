export interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export interface File {
  id: string;
  imageSrc: string;
  title: string;
  totalFiles: number;
}
