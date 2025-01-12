import { Button } from "@/components/ui/button";
import { ProductRecommendation } from "@/types/quiz";
import { motion } from "framer-motion";

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
            key={product.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h4 className="text-lg font-semibold text-mai-brown">{product.name}</h4>
            <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
            <p className="text-mai-coral font-semibold mb-2">{product.price}</p>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-mai-coral hover:bg-mai-brown text-white px-4 py-2 rounded transition-colors"
            >
              Shop Now
            </a>
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