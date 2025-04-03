
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
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { initAnalytics, updateUserActivity } from "./utils/analytics";
import { ProductDetail } from "./components/products/ProductDetail";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const session = useSession();

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24"> {/* Increased padding-top from 16 to 24 */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/businesses" element={<Businesses />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route 
            path="/community" 
            element={session ? <Community /> : <Navigate to="/auth" replace />} 
          />
          <Route path="/about" element={<About />} />
          <Route 
            path="/auth" 
            element={!session ? <Auth /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/admin" 
            element={session ? <Admin /> : <Navigate to="/auth" replace />} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
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
