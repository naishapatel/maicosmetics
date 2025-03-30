
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const NewsletterAdmin = () => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
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

    try {
      const { data, error } = await supabase.functions.invoke('send-newsletter', {
        body: { subject, content },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Newsletter sent!",
        description: data.message || "Your newsletter has been sent to all subscribers.",
      });

      // Reset form after successful submission
      setSubject('');
      setContent('');
    } catch (error: any) {
      console.error('Error sending newsletter:', error);
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
