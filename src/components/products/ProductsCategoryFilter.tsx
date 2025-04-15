
import { Badge } from "@/components/ui/badge";

interface ProductsCategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string) => void;
}

export const ProductsCategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: ProductsCategoryFilterProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-mai-brown mb-2">Filter by Category:</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <Badge 
            key={index}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`cursor-pointer ${selectedCategory === category ? 'bg-mai-mauve hover:bg-mai-mauveDark' : ''}`}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
};
