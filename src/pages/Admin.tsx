
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSession } from '@supabase/auth-helpers-react';
import NewsletterAdmin from '@/components/admin/NewsletterAdmin';
import BlogPostAdmin from '@/components/admin/BlogPostAdmin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

// List of admin email addresses - make sure these emails match exactly with the authenticated user emails
const ADMIN_EMAILS = ["naisha.r.patel@gmail.com", "naishapatelofficial@gmail.com"];

const Admin = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if the current user is an admin
  const isAdmin = session?.user?.email && ADMIN_EMAILS.includes(session.user.email);

  // Enhanced logging for debugging admin access
  useEffect(() => {
    if (session?.user) {
      console.log("Admin check details:");
      console.log("Current user email:", session.user.email);
      console.log("Admin emails list:", ADMIN_EMAILS);
      console.log("Is admin?", isAdmin);
      console.log("Email match check:", session.user.email && ADMIN_EMAILS.map(email => 
        `${email} === ${session.user.email}: ${email === session.user.email}`
      ));
    } else {
      console.log("No session found - user not authenticated");
    }
  }, [session, isAdmin]);

  // Add effect to set permissions for admin pages
  useEffect(() => {
    const setupAdminPermissions = async () => {
      if (session?.user?.email && ADMIN_EMAILS.includes(session.user.email)) {
        console.log("Setting up admin permissions for user:", session.user.email);
        
        try {
          // This will help debug any RLS policy issues
          const { data: approvals, error: approvalsError } = await supabase
            .from('blog_post_approvals')
            .select('count')
            .limit(1);
            
          if (approvalsError) {
            console.error("Admin permission check failed:", approvalsError);
          } else {
            console.log("Admin can access approvals table:", !!approvals);
          }
        } catch (error) {
          console.error("Error checking admin permissions:", error);
        }
      }
    };
    
    if (session) {
      setupAdminPermissions();
    }
  }, [session]);

  // Redirect non-admin users
  useEffect(() => {
    if (session && !isAdmin) {
      console.log("Access denied - Current user email:", session.user?.email);
      console.log("Not in admin list:", ADMIN_EMAILS);
      
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
    console.log("No session, redirecting to auth");
    return <Navigate to="/auth" replace />;
  }

  // Redirect unauthorized users
  if (!isAdmin) {
    console.log("Not an admin, redirecting to home");
    return <Navigate to="/" replace />;
  }

  console.log("Rendering admin dashboard for:", session.user.email);
  
  return (
    <div className="container max-w-6xl py-12">
      <h1 className="text-3xl font-bold text-mai-darkRed mb-6 text-center">
        Admin Dashboard
      </h1>
      
      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertTitle>Admin Access</AlertTitle>
        <AlertDescription>
          You're logged in as {session.user.email}. Admin access is granted.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="blog-posts">
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
