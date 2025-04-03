
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSession } from '@supabase/auth-helpers-react';
import NewsletterAdmin from '@/components/admin/NewsletterAdmin';
import BlogPostAdmin from '@/components/admin/BlogPostAdmin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';

// List of admin email addresses
const ADMIN_EMAILS = ["naisha.r.patel@gmail.com", "naishapatelofficial@gmail.com"];

const Admin = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if the current user is an admin
  const isAdmin = session?.user?.email && ADMIN_EMAILS.includes(session.user.email);

  // Redirect non-admin users
  useEffect(() => {
    if (session && !isAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
      });
      navigate("/");
    }
  }, [session, isAdmin, navigate, toast]);

  // Redirect to login if not authenticated
  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect unauthorized users
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container max-w-6xl py-12">
      <h1 className="text-3xl font-bold text-mai-darkRed mb-10 text-center">
        Admin Dashboard
      </h1>
      
      <Tabs defaultValue="newsletter">
        <TabsList className="mb-8">
          <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          <TabsTrigger value="blog-posts">Blog Posts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="newsletter">
          <NewsletterAdmin />
        </TabsContent>
        
        <TabsContent value="blog-posts">
          <BlogPostAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
