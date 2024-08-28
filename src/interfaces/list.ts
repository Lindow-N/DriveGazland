export interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export interface File {
  id: number;
  imageSrc: string;
  title: string;
  documentCount: number;
}
