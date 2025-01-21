import { Navbar } from "@/components/Navbar";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categorizedProducts } from "@/data/categorizedProducts";

const Products = () => {
  const categories = [
    "sustainable beauty",
    "eco-friendly beauty",
    "vegan beauty",
    "products for acne",
    "products for college kids"
  ];

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