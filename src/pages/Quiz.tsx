import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuizQuestions from "@/components/quiz/QuizQuestions";
import QuizResults from "@/components/quiz/QuizResults";
import { useQuiz } from "@/hooks/useQuiz";

const Quiz = () => {
  const {
    selections,
    showResults,
    currentTab,
    recommendations,
    setCurrentTab,
    handleSelection,
    getRecommendations,
    resetQuiz,
  } = useQuiz();

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
          <h1 className="text-3xl font-bold text-mai-brown mb-4">Makeup Quiz</h1>
          <p className="text-gray-600">Discover personalized makeup products from small businesses</p>
        </motion.div>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-mai-brown">Tell us about your preferences</CardTitle>
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