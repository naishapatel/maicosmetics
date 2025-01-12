import { Navbar } from "@/components/Navbar";
import { AboutSection } from "@/components/quiz/AboutSection";
import QuizQuestions from "@/components/quiz/QuizQuestions";
import QuizResults from "@/components/quiz/QuizResults";
import { useQuiz } from "@/hooks/useQuiz";

const Quiz = () => {
  const quiz = useQuiz();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <AboutSection />
        {!quiz.showResults ? (
          <QuizQuestions
            selections={quiz.selections}
            currentTab={quiz.currentTab}
            setCurrentTab={quiz.setCurrentTab}
            handleSelection={quiz.handleSelection}
            getRecommendations={quiz.getRecommendations}
          />
        ) : (
          <QuizResults
            recommendations={quiz.recommendations}
            resetQuiz={quiz.resetQuiz}
          />
        )}
      </main>
    </div>
  );
};

export default Quiz;