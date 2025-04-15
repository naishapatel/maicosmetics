
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductsSearch } from "./ProductsSearch";
import { ProductsCategoryFilter } from "./ProductsCategoryFilter";
import { ProductsBusinessTagFilter } from "./ProductsBusinessTagFilter";
import { ProductsFilterResults } from "./ProductsFilterResults";

interface ProductsFilterContainerProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: string[];
  selectedCategory: string | null;
  handleCategorySelect: (category: string) => void;
  businessTags: string[];
  selectedBusinessTag: string | null;
  handleBusinessTagSelect: (tag: string) => void;
  filteredProductsCount: number;
  children?: ReactNode;
}

export const ProductsFilterContainer = ({
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  handleCategorySelect,
  businessTags,
  selectedBusinessTag,
  handleBusinessTagSelect,
  filteredProductsCount,
  children
}: ProductsFilterContainerProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
      <h2 className={`font-serif text-mai-brown ${isMobile ? 'text-2xl' : 'text-3xl'} mb-4`}>
        Find Your Perfect Products
      </h2>
      <p className="text-gray-600 mb-6">
        Search through our curated collection of ethical and sustainable beauty products.
      </p>
      
      <ProductsSearch 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <ProductsCategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onCategorySelect={handleCategorySelect} 
      />

      <ProductsBusinessTagFilter 
        businessTags={businessTags} 
        selectedBusinessTag={selectedBusinessTag} 
        onBusinessTagSelect={handleBusinessTagSelect} 
      />
      
      {children}
      
      <ProductsFilterResults count={filteredProductsCount} />
    </div>
  );
};
