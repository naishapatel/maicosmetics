
import { useState, useEffect } from "react";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { categorizedProducts, Product } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

const Products = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(categorizedProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBusinessTag, setSelectedBusinessTag] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Get unique categories and business tags for filtering
  const categories = Array.from(new Set(categorizedProducts.map(p => p.category)));
  const businessTags = Array.from(
    new Set(
      categorizedProducts
        .filter(p => p.business_tags)
        .flatMap(p => p.business_tags || [])
    )
  );
  
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
    // Apply filters based on search query, category and business tag
    let results = categorizedProducts;
    
    // Apply category filter if selected
    if (selectedCategory) {
      results = results.filter(product => 
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Apply business tag filter if selected
    if (selectedBusinessTag) {
      results = results.filter(product => 
        product.business_tags?.includes(selectedBusinessTag)
      );
    }
    
    // Apply search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter(product => 
        product.title?.toLowerCase().includes(query) || 
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        (product.key_ingredients && product.key_ingredients.some(i => i.toLowerCase().includes(query)))
      );
    }
    
    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, selectedBusinessTag]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleBusinessTagSelect = (tag: string) => {
    setSelectedBusinessTag(selectedBusinessTag === tag ? null : tag);
  };

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
          
          <div className="mb-6">
            <h3 className="text-md font-medium text-mai-brown mb-2">Filter by Category:</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Badge 
                  key={index}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer ${selectedCategory === category ? 'bg-mai-mauve hover:bg-mai-mauveDark' : ''}`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {businessTags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-medium text-mai-brown mb-2">Filter by Business Type:</h3>
              <div className="flex flex-wrap gap-2">
                {businessTags.map((tag, index) => (
                  <Badge 
                    key={index}
                    variant={selectedBusinessTag === tag ? "default" : "outline"}
                    className={`cursor-pointer ${selectedBusinessTag === tag ? 'bg-mai-coral hover:bg-mai-darkRed' : ''}`}
                    onClick={() => handleBusinessTagSelect(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
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
