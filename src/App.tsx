
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider, useSession } from '@supabase/auth-helpers-react';
import { useEffect } from "react";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Products from "./pages/Products";
import Businesses from "./pages/Businesses";
import Community from "./pages/Community";
import About from "./pages/About";
import Sustainability from "./pages/Sustainability";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { supabase } from "./integrations/supabase/client";
import { initAnalytics, updateUserActivity } from "./utils/analytics";
import { ProductDetail } from "./components/products/ProductDetail";
import { ChatWidget } from "./components/chat/ChatWidget";
import { useIsMobile } from "./hooks/use-mobile";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

// Protected route component to check for authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  
  if (!session) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const session = useSession();
  const isMobile = useIsMobile();

  // Initialize analytics and set up activity tracking
  useEffect(() => {
    // Initialize analytics once when the app loads
    initAnalytics().catch(error => {
      console.error("Failed to initialize analytics:", error);
    });
    
    // Update user activity every 5 minutes while the app is open
    const activityInterval = setInterval(() => {
      updateUserActivity().catch(error => {
        console.error("Failed to update user activity:", error);
      });
    }, 5 * 60 * 1000);
    
    // Cleanup on unmount
    return () => clearInterval(activityInterval);
  }, []);

  // Create/update user profile when authenticated
  useEffect(() => {
    if (session?.user) {
      const checkAndUpdateUsername = async () => {
        // Check if user has a custom username already
        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', session.user.id)
          .single();
        
        // If no profile or username is an email, update with a default username
        if (!profile || (profile.username && profile.username.includes('@'))) {
          const defaultUsername = `user_${Math.floor(Math.random() * 10000)}`;
          
          await supabase
            .from('profiles')
            .upsert({ 
              id: session.user.id, 
              username: defaultUsername
            }, { onConflict: 'id' });
        }
      };
      
      checkAndUpdateUsername();
    }
  }, [session]);

  // If not authenticated, only show authentication page
  if (!session) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className={`flex-grow ${isMobile ? 'pt-20 px-2' : 'pt-24'}`}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/businesses" element={<Businesses />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Navigate to="/" replace />} />
          <Route 
            path="/admin" 
            element={
              session?.user?.email && ["naisha.r.patel@gmail.com", "naishapatelofficial@gmail.com"].includes(session.user.email) 
                ? <Admin /> 
                : <Navigate to="/" replace />
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ChatWidget />
    </div>
  );
};

// The main App component
const App = () => {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {/* Moved TooltipProvider inside the component tree */}
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

export default App;
