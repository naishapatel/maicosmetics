import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import QuizQuestions from "@/components/quiz/QuizQuestions";
import QuizResults from "@/components/quiz/QuizResults";
import { ProductRecommendation, QuizSelections } from "@/types/quiz";

const Quiz = () => {
  const { toast } = useToast();
  const [selections, setSelections] = useState<QuizSelections>({
    skinType: [],
    concerns: [],
    preferences: [],
  });
  const [showResults, setShowResults] = useState(false);
  const [currentTab, setCurrentTab] = useState("type");
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);

  const handleSelection = (category: keyof QuizSelections, item: string) => {
    setSelections(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }));
  };

  const getRecommendations = () => {
    if (!selections.skinType.length || !selections.concerns.length) {
      toast({
        title: "Please complete the quiz",
        description: "Make sure to select at least one skin type and concern.",
        variant: "destructive",
      });
      return;
    }

    let newRecommendations: ProductRecommendation[] = [];
    
    if (selections.skinType.includes("Dry")) {
      newRecommendations.push({
        name: "CeraVe Moisturizing Cream",
        brand: "CeraVe",
        price: "$19.99",
        description: "Rich moisturizer with 3 essential ceramides and hyaluronic acid",
        link: "https://www.ulta.com/p/moisturizing-cream-xlsImpprod5140064"
      });
    }

    if (selections.concerns.includes("Sensitive")) {
      newRecommendations.push({
        name: "La Roche-Posay Toleriane Gentle Cleanser",
        brand: "La Roche-Posay",
        price: "$24.99",
        description: "Gentle face wash for sensitive skin with niacinamide",
        link: "https://www.laroche-posay.us/our-products/face/face-wash/toleriane-hydrating-gentle-facial-cleanser-3337875545778.html"
      });
    }

    if (selections.concerns.includes("Redness")) {
      newRecommendations.push({
        name: "Dr. Jart+ Cicapair Tiger Grass Color Correcting Treatment",
        brand: "Dr. Jart+",
        price: "$52.00",
        description: "Color-correcting treatment that reduces redness and calms sensitive skin",
        link: "https://www.sephora.com/product/cicapair-tiger-grass-color-correcting-treatment-spf-30-P411540"
      });
    }

    setRecommendations(newRecommendations);
    setShowResults(true);
    toast({
      title: "Quiz completed!",
      description: "Here are your personalized recommendations.",
    });
  };

  const resetQuiz = () => {
    setShowResults(false);
    setSelections({
      skinType: [],
      concerns: [],
      preferences: [],
    });
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen bg-mai-cream">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-mai-brown mb-4">Skin Quiz</h1>
          <p className="text-gray-600">Let's find the perfect products for your skin</p>
        </motion.div>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-mai-brown">Tell us about your skin</CardTitle>
          </CardHeader>
          <CardContent>
            {!showResults ? (
              <QuizQuestions
                selections={selections}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                handleSelection={handleSelection}
                getRecommendations={getRecommendations}
              />
            ) : (
              <QuizResults
                recommendations={recommendations}
                resetQuiz={resetQuiz}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;