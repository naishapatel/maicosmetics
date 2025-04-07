
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { AboutSection } from "@/components/quiz/AboutSection";
import QuizQuestions from "@/components/quiz/QuizQuestions";
import QuizResults from "@/components/quiz/QuizResults";
import { useQuiz } from "@/hooks/useQuiz";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@supabase/auth-helpers-react";

const Quiz = () => {
  const quiz = useQuiz();
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  const session = useSession();

  // Check if the user is already subscribed to the newsletter
  useEffect(() => {
    const checkSubscription = async () => {
      if (session?.user?.email) {
        const { data, error } = await supabase
          .from('newsletter_subscribers')
          .select('*')
          .eq('email', session.user.email)
          .single();

        if (data && !error) {
          setIsSubscribed(true);
        }
      }
    };

    checkSubscription();
  }, [session]);

  const handleGetResults = async () => {
    if (isSubscribed) {
      // Already subscribed, show results directly
      quiz.getRecommendations();
    } else {
      // Show newsletter signup modal
      setShowNewsletterModal(true);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use user's email from session if available, otherwise use the email from the input
      const emailToUse = session?.user?.email || email;
      
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: emailToUse }]);

      if (error) {
        if (error.message.includes('duplicate key value')) {
          // User is already subscribed, just continue
          setIsSubscribed(true);
          setShowNewsletterModal(false);
          quiz.getRecommendations();
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for joining our newsletter!",
        });
        setIsSubscribed(true);
        setShowNewsletterModal(false);
        quiz.getRecommendations();
      }
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            getRecommendations={handleGetResults} // Use our custom handler instead
          />
        ) : (
          <QuizResults
            recommendations={quiz.recommendations}
            resetQuiz={quiz.resetQuiz}
          />
        )}

        {/* Newsletter Subscription Modal */}
        <Dialog open={showNewsletterModal} onOpenChange={setShowNewsletterModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl text-mai-darkRed">Join Our Newsletter</DialogTitle>
              <DialogDescription className="text-center">
                Subscribe to get your personalized recommendations, beauty tips, and exclusive offers.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubscribe} className="space-y-4 pt-4">
              {!session?.user?.email && (
                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-mai-mauve/30 focus:border-mai-mauve focus:ring-mai-mauve"
                  />
                </div>
              )}
              <div className="flex justify-center gap-3">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-mai-mauve hover:bg-mai-darkRed text-white"
                >
                  {isLoading ? "Subscribing..." : "Subscribe & View Results"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Quiz;
