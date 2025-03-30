
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '@supabase/auth-helpers-react';
import NewsletterAdmin from '@/components/admin/NewsletterAdmin';
import BlogPostAdmin from '@/components/admin/BlogPostAdmin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const session = useSession();

  // Redirect to login if not authenticated
  if (!session) {
    return <Navigate to="/auth" replace />;
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
