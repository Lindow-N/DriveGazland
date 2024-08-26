export interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}
