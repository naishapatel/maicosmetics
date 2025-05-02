
import { useState, useEffect } from "react";
import { categorizedProducts, Product } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { validateProductLinks } from "@/utils/linkValidator";

export const useProducts = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(categorizedProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBusinessTag, setSelectedBusinessTag] = useState<string | null>(null);
  const [isValidatingLinks, setIsValidatingLinks] = useState(false);
  const [validatedProductsMap, setValidatedProductsMap] = useState<Map<string, Product>>(new Map());
  
  // Get unique categories for filtering - ensure no empty categories
  const categories = Array.from(new Set(
    categorizedProducts
      .filter(p => p.category && p.category.trim() !== '')
      .map(p => p.category)
  ));
  
  // Create business tags array from products that have them
  const businessTags = Array.from(
    new Set(
      categorizedProducts
        .filter(p => p.business_tags && p.business_tags.length > 0)
        .flatMap(p => p.business_tags || [])
        .filter(tag => tag && tag.trim() !== '')
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
    
    // Validate product links on initial load
    const validateLinks = async () => {
      setIsValidatingLinks(true);
      try {
        const validatedProducts = await validateProductLinks(categorizedProducts, 
          (completed, total) => {
            console.log(`Validated ${completed}/${total} product links`);
          }
        );
        
        // Create a map of validated products for quick lookup
        const productMap = new Map(validatedProducts.map(p => [p.id, p]));
        setValidatedProductsMap(productMap);
        
        // Update filtered products with validation results
        setFilteredProducts(prevProducts => {
          if (selectedCategory || searchQuery || selectedBusinessTag) {
            // If filters are applied, only update the validated products that match the current filters
            return prevProducts.map(p => productMap.get(p.id) || p);
          }
          return validatedProducts.filter(p => p.link_status !== 'broken');
        });
        
        console.log('Link validation complete');
      } catch (error) {
        console.error('Error validating links:', error);
      } finally {
        setIsValidatingLinks(false);
      }
    };
    
    validateLinks();
  }, []);

  useEffect(() => {
    // Apply filters based on search query, category, and business tag
    let results = [...categorizedProducts];
    
    // First filter out products with broken links
    results = results.filter(product => {
      const validatedProduct = validatedProductsMap.get(product.id);
      return !validatedProduct || validatedProduct.link_status !== 'broken';
    });
    
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
        (product.title?.toLowerCase().includes(query)) || 
        (product.description?.toLowerCase().includes(query)) ||
        (product.category?.toLowerCase().includes(query)) ||
        (product.brand?.toLowerCase().includes(query))
      );
    }
    
    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, selectedBusinessTag, validatedProductsMap]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleBusinessTagSelect = (tag: string) => {
    setSelectedBusinessTag(selectedBusinessTag === tag ? null : tag);
  };

  return {
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
    handleBusinessTagSelect,
    isValidatingLinks
  };
};
