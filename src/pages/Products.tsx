
import { useState, useEffect } from "react";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { categorizedProducts, Product } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductsSyncStatus } from "@/components/products/ProductsSyncStatus";
import { ProductsFilterContainer } from "@/components/products/ProductsFilterContainer";

const Products = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(categorizedProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBusinessTag, setSelectedBusinessTag] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Get unique categories for filtering
  const categories = Array.from(new Set(categorizedProducts.map(p => p.category)));
  
  // Create empty business tags array since we're not using them
  const businessTags: string[] = [];
  
  useEffect(() => {
    const syncProductsWithSupabase = async () => {
      try {
        setIsSyncing(true);
        setSyncError(null);
        
        const { data: existingProducts, error: fetchError } = await supabase
          .from('products')
          .select('id');
        
        if (fetchError) {
          console.error('Error fetching products:', fetchError);
          setSyncError('Failed to check existing products');
          toast.error('Database connection error');
          return;
        }
        
        if (!existingProducts || existingProducts.length === 0) {
          console.log('Syncing products with Supabase...');
          
          let successCount = 0;
          let errorCount = 0;
          
          for (const product of categorizedProducts) {
            try {
              const { error } = await supabase
                .from('products')
                .insert({
                  title: product.title,
                  description: product.description,
                  price: product.price,
                  category: product.category,
                  link: product.link,
                  url: product.url
                });
                
              if (error) {
                console.error('Error inserting product:', error);
                errorCount++;
              } else {
                successCount++;
              }
            } catch (err) {
              console.error('Exception inserting product:', err);
              errorCount++;
            }
          }
          
          console.log(`Product sync complete! Success: ${successCount}, Errors: ${errorCount}`);
          if (successCount > 0) {
            toast.success(`${successCount} products synced with database`);
          } else if (errorCount > 0) {
            toast.error(`Failed to sync products (${errorCount} errors). You may need to log in first.`);
            setSyncError('Database permissions error');
          }
        }
      } catch (error) {
        console.error('Error in sync process:', error);
        toast.error('Failed to sync products with database');
        setSyncError('Unexpected error during database sync');
      } finally {
        setIsSyncing(false);
      }
    };

    syncProductsWithSupabase();
  }, []);

  useEffect(() => {
    // Apply filters based on search query and category
    let results = categorizedProducts;
    
    // Apply category filter if selected
    if (selectedCategory) {
      results = results.filter(product => 
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Apply search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter(product => 
        (product.title?.toLowerCase().includes(query)) || 
        (product.description?.toLowerCase().includes(query)) ||
        (product.category?.toLowerCase().includes(query))
      );
    }
    
    setFilteredProducts(results);
  }, [searchQuery, selectedCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  // Define this as an empty function since we're not using business tags
  const handleBusinessTagSelect = (tag: string) => {
    setSelectedBusinessTag(selectedBusinessTag === tag ? null : tag);
  };

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
