
import { Badge } from "@/components/ui/badge";

interface ProductsBusinessTagFilterProps {
  businessTags: string[];
  selectedBusinessTag: string | null;
  onBusinessTagSelect: (tag: string) => void;
}

export const ProductsBusinessTagFilter = ({ 
  businessTags, 
  selectedBusinessTag, 
  onBusinessTagSelect 
}: ProductsBusinessTagFilterProps) => {
  if (businessTags.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-mai-brown mb-2">Filter by Business Type:</h3>
      <div className="flex flex-wrap gap-2">
        {businessTags.map((tag, index) => (
          <Badge 
            key={index}
            variant={selectedBusinessTag === tag ? "default" : "outline"}
            className={`cursor-pointer ${selectedBusinessTag === tag ? 'bg-mai-coral hover:bg-mai-darkRed' : ''}`}
            onClick={() => onBusinessTagSelect(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};
