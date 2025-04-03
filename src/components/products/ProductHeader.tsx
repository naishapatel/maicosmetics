
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ProductRecommendation } from "@/types/quiz";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface ProductHeaderProps {
  product: ProductRecommendation;
  isSaved: boolean;
  onSave: () => void;
}

export const ProductHeader = ({ product, isSaved, onSave }: ProductHeaderProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-mai-brown">{product.product_name}</h1>
            <p className="text-gray-500">{product.brand}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSave}
            className="flex items-center gap-2"
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="h-4 w-4 text-mai-mauve" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};
