
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  // Check if "Mental Health Advocate" is already in the list, if not add it
  const tagsWithMentalHealth = businessTags.includes("Mental Health Advocate") 
    ? businessTags 
    : ["Mental Health Advocate", ...businessTags];

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Business Type:</h3>
      <ScrollArea className="w-full whitespace-nowrap pb-2" type="always">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tagsWithMentalHealth.map((tag) => (
            <Badge
              key={tag}
              variant={selectedBusinessTag === tag ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                selectedBusinessTag === tag 
                  ? "bg-mai-mauve hover:bg-mai-mauveDark" 
                  : "hover:bg-gray-100"
              }`}
              onClick={() => onBusinessTagSelect(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
