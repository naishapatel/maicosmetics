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
    
    // Database of real small business makeup products
    const productDatabase = {
      dry: [
        {
          name: "Hydrating Face Oil",
          brand: "Beneath Your Mask",
          price: "$60",
          description: "Organic, small-batch face oil perfect for dry and sensitive skin",
          link: "https://beneathyourmask.com/products/heal-nourishing-face-oil"
        },
        {
          name: "Moisture Lock Foundation",
          brand: "Range Beauty",
          price: "$27",
          description: "Clean beauty foundation with botanical extracts for dry skin",
          link: "https://www.rangebeauty.com/products/true-intentions-hydrating-foundation"
        }
      ],
      sensitive: [
        {
          name: "Gentle Cleansing Oil",
          brand: "Klur",
          price: "$32",
          description: "Gentle, non-irritating cleansing oil for sensitive skin",
          link: "https://klur.co/products/gentle-matter"
        },
        {
          name: "Calming Face Mist",
          brand: "Base Butter",
          price: "$25",
          description: "Soothing aloe vera and rose water face mist",
          link: "https://basebutter.com/products/so-soothing-facial-mist"
        }
      ],
      acne: [
        {
          name: "Clarifying Serum",
          brand: "Hyper Skin",
          price: "$36",
          description: "Vitamin C serum that targets dark spots and prevents breakouts",
          link: "https://gethyperskin.com/products/hyper-clear"
        },
        {
          name: "Purifying Clay Mask",
          brand: "Undefined Beauty",
          price: "$28",
          description: "Detoxifying clay mask with CBD for acne-prone skin",
          link: "https://undefinedbeauty.com/products/r-r-sun-mask"
        }
      ],
      redness: [
        {
          name: "Calming Face Oil",
          brand: "Absolute JOI",
          price: "$35",
          description: "Skin-calming face oil with natural anti-inflammatory ingredients",
          link: "https://absolutejoi.com/products/daily-hydrating-moisturizing-oil"
        },
        {
          name: "Green Color Corrector",
          brand: "Laws of Nature Cosmetics",
          price: "$22",
          description: "Natural green color corrector to neutralize redness",
          link: "https://lawsofnaturecosmetics.com/products/color-corrector"
        }
      ],
      natural: [
        {
          name: "Multi-Use Color Balm",
          brand: "Āether Beauty",
          price: "$24",
          description: "Clean, sustainable multi-use color for cheeks and lips",
          link: "https://aetherbeautyco.com/collections/multi-use"
        },
        {
          name: "Mineral Foundation",
          brand: "Mented Cosmetics",
          price: "$30",
          description: "Clean, vegan mineral foundation for all skin tones",
          link: "https://www.mentedcosmetics.com/products/skin-by-mented-foundation"
        }
      ]
    };

    // Match products based on skin type
    if (selections.skinType.includes("Dry")) {
      newRecommendations.push(...productDatabase.dry);
    }

    // Match products based on concerns
    if (selections.concerns.includes("Sensitive")) {
      newRecommendations.push(...productDatabase.sensitive);
    }
    if (selections.concerns.includes("Acne")) {
      newRecommendations.push(...productDatabase.acne);
    }
    if (selections.concerns.includes("Redness")) {
      newRecommendations.push(...productDatabase.redness);
    }

    // Match products based on preferences
    if (selections.preferences.includes("Natural ingredients")) {
      newRecommendations.push(...productDatabase.natural);
    }

    // Limit to maximum 4 recommendations to avoid overwhelming the user
    newRecommendations = newRecommendations.slice(0, 4);

    setRecommendations(newRecommendations);
    setShowResults(true);
    toast({
      title: "Quiz completed!",
      description: "Here are your personalized recommendations from small businesses.",
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
          <p className="text-gray-600">Discover personalized products from small businesses</p>
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