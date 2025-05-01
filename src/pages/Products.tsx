
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { useProducts } from "@/hooks/useProducts";
import { ProductsSyncStatus } from "@/components/products/ProductsSyncStatus";
import { ProductsFilterContainer } from "@/components/products/ProductsFilterContainer";

const Products = () => {
  const {
    isSyncing,
    syncError,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    selectedCategory,
    selectedBusinessTag,
    categories,
    businessTags,
    handleCategorySelect,
    handleBusinessTagSelect
  } = useProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-mai-cream to-white">
      <ProductsHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductsSyncStatus 
          isSyncing={isSyncing} 
          syncError={syncError} 
        />
        
        <ProductsFilterContainer
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategorySelect={handleCategorySelect}
          filteredProductsCount={filteredProducts.length}
          businessTags={businessTags}
          selectedBusinessTag={selectedBusinessTag}
          handleBusinessTagSelect={handleBusinessTagSelect}
        />
        
        <ProductsGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default Products;
