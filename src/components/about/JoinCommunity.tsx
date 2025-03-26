
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const JoinCommunity = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) throw error;

      toast({
        title: "Successfully subscribed!",
        description: "Thank you for joining the mai. community!",
      });
      setEmail("");
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: error.message === "duplicate key value violates unique constraint \"newsletter_subscribers_email_key\""
          ? "This email is already subscribed!"
          : "There was an error subscribing to the newsletter.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.section 
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="bg-mai-blushPink rounded-3xl p-12 text-center border border-mai-mauve/20"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          whileHover={{ 
            boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.3 }
          }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-mai-darkRed mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join Our Community
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Be part of a movement that's reshaping the beauty industry. Share your experiences, 
            discover new products, and connect with like-minded beauty enthusiasts.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button 
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 bg-mai-mauve text-white px-8 py-4 rounded-full font-medium hover:bg-mai-darkRed transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(86, 12, 12, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={18} />
              Join mai. Today
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-mai-darkRed">Join Our Newsletter</DialogTitle>
            <DialogDescription className="text-center">
              Subscribe to get the latest updates, beauty tips, and exclusive offers.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubscribe} className="space-y-4 pt-4">
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
            <div className="flex justify-center">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-mai-mauve hover:bg-mai-darkRed text-white"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JoinCommunity;
