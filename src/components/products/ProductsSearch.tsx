
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProductsSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ProductsSearch = ({ searchQuery, setSearchQuery }: ProductsSearchProps) => {
  return (
    <div className="relative max-w-md mx-auto mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        type="search"
        placeholder="Search by product name, description, or ingredients..."
        className="pl-10 py-6 rounded-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
