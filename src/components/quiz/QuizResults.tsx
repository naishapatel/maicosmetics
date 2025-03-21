
import { Button } from "@/components/ui/button";
import { ProductRecommendation } from "@/types/quiz";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface QuizResultsProps {
  recommendations: ProductRecommendation[];
  resetQuiz: () => void;
}

const QuizResults = ({ recommendations, resetQuiz }: QuizResultsProps) => {
  const [sortBy, setSortBy] = useState<"match" | "price">("match");

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    if (sortBy === "price") {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
      return priceA - priceB;
    }
    return 0; // Default to original order for "match"
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-mai-brown">Your Recommended Products</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Sort by: {sortBy === "match" ? "Best Match" : "Price"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem onClick={() => setSortBy("match")}>
              Best Match
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("price")}>
              Price (Low to High)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedRecommendations.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
              <div className="p-4">
                <h4 className="text-lg font-semibold text-mai-brown">{product.name}</h4>
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                <p className="text-mai-mauve font-semibold mb-2">{product.price}</p>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.ethical_values.map((value, i) => (
                    <span
                      key={i}
                      className="text-xs bg-mai-mauveLight/40 text-mai-mauveDark px-2 py-1 rounded-full"
                    >
                      {value}
                    </span>
                  ))}
                </div>
                {product.business_tags && product.business_tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.business_tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-mai-mauve/10 text-mai-mauve px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <Button
        onClick={resetQuiz}
        className="mt-6 bg-mai-mauve hover:bg-mai-mauveDark text-white transition-colors"
      >
        Retake Quiz
      </Button>
    </motion.div>
  );
};

export default QuizResults;
