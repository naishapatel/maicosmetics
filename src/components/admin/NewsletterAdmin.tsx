
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const NewsletterAdmin = () => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !content.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide both subject and content for the newsletter.",
      });
      return;
    }

    setIsSending(true);
    setResponseMessage(null);

    try {
      console.log("Invoking send-newsletter function...");
      const { data, error } = await supabase.functions.invoke('send-newsletter', {
        body: { subject, content },
      });

      if (error) {
        console.error("Error from edge function:", error);
        throw new Error(`Edge function error: ${error.message}`);
      }

      console.log("Newsletter edge function response:", data);
      
      if (data.error) {
        throw new Error(data.error);
      }

      setResponseMessage(data.message || "Newsletter sent successfully");
      toast({
        title: "Newsletter status",
        description: data.message?.includes("No subscribers") 
          ? "There are no subscribers in the database. Try subscribing first via the footer form." 
          : "Your newsletter has been sent to all subscribers.",
      });

      // Reset form after successful submission if there were subscribers
      if (!data.message?.includes("No subscribers")) {
        setSubject('');
        setContent('');
      }
    } catch (error: any) {
      console.error('Error sending newsletter:', error);
      setResponseMessage(`Error: ${error.message || "An unexpected error occurred"}`);
      toast({
        variant: "destructive",
        title: "Failed to send newsletter",
        description: error.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-mai-darkRed">Send Newsletter</CardTitle>
        <CardDescription>
          Compose and send an email to all newsletter subscribers
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSendNewsletter}>
        <CardContent className="space-y-4">
          {responseMessage && (
            <Alert className={responseMessage.includes("Error") ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}>
              <div className="flex items-center">
                {responseMessage.includes("Error") ? (
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                ) : (
                  <Mail className="h-4 w-4 mr-2 text-green-500" />
                )}
                <AlertDescription>{responseMessage}</AlertDescription>
              </div>
            </Alert>
          )}
          
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Newsletter subject"
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your newsletter content here (HTML is supported)"
              required
              className="min-h-[200px] w-full"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-mai-mauve hover:bg-mai-darkRed"
            disabled={isSending}
          >
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Newsletter"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NewsletterAdmin;
