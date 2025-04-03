
import { Card, CardContent } from "@/components/ui/card";
import { ProductRecommendation } from "@/types/quiz";
import { useNavigate } from "react-router-dom";

interface SimilarProductsProps {
  products: ProductRecommendation[];
}

export const SimilarProducts = ({ products }: SimilarProductsProps) => {
  const navigate = useNavigate();
  
  if (products.length === 0) return null;
  
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-mai-brown mb-4">Similar Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((item) => (
          <Card 
            key={item.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/products/${item.id}`)}
          >
            <CardContent className="p-4">
              <h3 className="font-semibold text-mai-brown">{item.product_name}</h3>
              <p className="text-sm text-gray-500">{item.brand}</p>
              <p className="text-mai-mauve mt-1">{item.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
