
import { Card, CardContent } from "@/components/ui/card";
import { ProductRecommendation } from "@/types/quiz";

interface ProductInfoProps {
  product: ProductRecommendation;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="space-y-6 pt-6">
        <div>
          <p className="text-xl font-medium text-mai-mauve">{product.price}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Category</h3>
          <p className="inline-block px-3 py-1 bg-mai-sand rounded-full text-sm">
            {product.category}
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Ethical Values</h3>
          <div className="flex flex-wrap gap-2">
            {product.ethical_values && product.ethical_values.map((value, i) => (
              <span 
                key={i}
                className="px-3 py-1 bg-mai-mauve/10 text-mai-mauve rounded-full text-sm"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
