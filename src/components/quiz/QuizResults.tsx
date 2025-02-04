import { Button } from "@/components/ui/button";
import { ProductRecommendation } from "@/types/quiz";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";

interface QuizResultsProps {
  recommendations: ProductRecommendation[];
  resetQuiz: () => void;
}

const QuizResults = ({ recommendations, resetQuiz }: QuizResultsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-semibold text-mai-brown mb-4">Your Recommended Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
              <div className="p-4">
                {product.imageUrl && (
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <AspectRatio ratio={4/3} className="bg-mai-cream">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                    </AspectRatio>
                  </div>
                )}
                <h4 className="text-lg font-semibold text-mai-brown">{product.name}</h4>
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                <p className="text-mai-coral font-semibold mb-2">{product.price}</p>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex flex-wrap gap-2">
                  {product.ethical_values.map((value, i) => (
                    <span
                      key={i}
                      className="text-xs bg-mai-cream text-mai-brown px-2 py-1 rounded-full"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <Button
        onClick={resetQuiz}
        className="mt-6 bg-mai-coral hover:bg-mai-brown text-white transition-colors"
      >
        Retake Quiz
      </Button>
    </motion.div>
  );
};

export default QuizResults;