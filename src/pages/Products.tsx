
import { Navbar } from "@/components/Navbar";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categorizedProducts } from "@/data/products";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Products = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  
  const categories = [
    "sustainable beauty",
    "eco-friendly beauty",
    "vegan beauty",
    "products for acne",
    "products for college kids"
  ];

  // Sync local products with Supabase when component loads
  useEffect(() => {
    const syncProductsWithSupabase = async () => {
      try {
        setIsSyncing(true);
        setSyncError(null);
        
        // First check if products already exist in Supabase
        const { data: existingProducts, error: fetchError } = await supabase
          .from('products')
          .select('id');
        
        if (fetchError) {
          console.error('Error fetching products:', fetchError);
          setSyncError('Failed to check existing products');
          toast.error('Database connection error');
          return;
        }
        
        // Only sync if no products exist
        if (!existingProducts || existingProducts.length === 0) {
          console.log('Syncing products with Supabase...');
          
          // Remove the RPC call for RLS policy as it's not available
          // Instead, we'll rely on the default RLS policies set up in Supabase
          
          let successCount = 0;
          let errorCount = 0;
          
          // Insert all categorized products
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
                  url: product.url,
                  images: product.images
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-mai-cream to-white">
      <Navbar />
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
        
        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="w-full flex flex-wrap gap-2 bg-transparent">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-mai-coral data-[state=active]:text-white"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <ProductsGrid
                products={categorizedProducts.filter(p => p.category === category)}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Products;
