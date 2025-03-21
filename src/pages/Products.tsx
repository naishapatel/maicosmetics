
import { Navbar } from "@/components/Navbar";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categorizedProducts } from "@/data/products";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Products = () => {
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
        // First check if products already exist in Supabase
        const { data: existingProducts } = await supabase
          .from('products')
          .select('id');
        
        // Only sync if no products exist
        if (!existingProducts || existingProducts.length === 0) {
          console.log('Syncing products with Supabase...');
          
          // Insert all categorized products
          for (const product of categorizedProducts) {
            await supabase
              .from('products')
              .upsert({
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                category: product.category,
                link: product.link,
                url: product.url,
                images: product.images
              });
          }
          console.log('Product sync complete!');
        }
      } catch (error) {
        console.error('Error syncing products:', error);
      }
    };

    syncProductsWithSupabase();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-mai-cream to-white">
      <Navbar />
      <ProductsHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
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
