
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm Mai Assistant. How can I help you with your beauty and skincare questions today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      console.log("Sending message to AI chat function:", input);
      
      // Call Supabase Edge Function to get AI response
      const { data, error } = await supabase.functions.invoke("ai-chat", {
        body: { message: input },
      });
      
      if (error) {
        console.error("Error from Edge Function:", error);
        throw new Error(`Edge Function error: ${error.message}`);
      }
      
      console.log("Received response from AI chat function:", data);
      
      // If we have a response, use it (even if there's an API quota error)
      if (data && data.response) {
        const aiResponse: Message = {
          id: crypto.randomUUID(),
          content: data.response,
          isUser: false,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, aiResponse]);
        
        // If there was an API quota error specifically, show a toast
        if (data.error === 'API quota exceeded') {
          toast({
            title: "Service Limitation",
            description: "Our AI assistant is temporarily unavailable due to high demand. We're working to restore service.",
            variant: "destructive",
          });
        }
      } else {
        // Only throw an error if we didn't get any response
        console.error("Invalid response format from Edge Function:", data);
        throw new Error("Invalid response from assistant");
      }
    } catch (error) {
      console.error("Error calling AI service:", error);
      
      toast({
        title: "Chat Error",
        description: "We're having trouble connecting to our assistant. Please try again later.",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: "Sorry, I'm having technical difficulties. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            className="rounded-full h-14 w-14 shadow-lg bg-mai-coral hover:bg-mai-coral/90"
            onClick={() => setIsOpen(true)}
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-[400px] p-0 flex flex-col h-[600px] max-h-[80vh]">
          <SheetHeader className="px-4 py-3 border-b">
            <div className="flex justify-between items-center">
              <SheetTitle className="text-mai-brown">Chat Support</SheetTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? "bg-mai-coral text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t flex items-center space-x-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="bg-mai-coral hover:bg-mai-coral/90"
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};
