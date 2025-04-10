
import { useState, useEffect } from "react";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { categorizedProducts } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Products = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(categorizedProducts);
  const isMobile = useIsMobile();
  
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
    if (searchQuery.trim() === "") {
      setFilteredProducts(categorizedProducts);
    } else {
      const query = searchQuery.toLowerCase();
      const results = categorizedProducts.filter(product => 
        product.title?.toLowerCase().includes(query) || 
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
      setFilteredProducts(results);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-mai-cream to-white">
      <ProductsHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {syncError && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
            {syncError === 'Database permissions error' ? 
              'Unable to sync products with database. You may need to log in first.' : 
              syncError}
          </div>
        )}
        
        {isSyncing && (
          <div className="bg-blue-50 text-blue-700 p-3 rounded-md mb-6 animate-pulse">
            Syncing products with database...
          </div>
        )}
        
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h2 className={`font-serif text-mai-brown ${isMobile ? 'text-2xl' : 'text-3xl'} mb-4`}>
            Find Your Perfect Products
          </h2>
          <p className="text-gray-600 mb-6">
            Search through our curated collection of ethical and sustainable beauty products.
          </p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search by product name, description, or category..."
              className="pl-10 py-6 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="mt-4 text-sm text-gray-500 text-center">
            {filteredProducts.length === 0 ? 
              "No products found. Try a different search term." : 
              `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`
            }
          </div>
        </div>
        
        <ProductsGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default Products;
