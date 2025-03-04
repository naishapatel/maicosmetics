
import { supabase } from "@/integrations/supabase/client";

let isTracking = false;

/**
 * Initializes user analytics tracking
 * This tracks unique user sessions without storing any personally identifiable information
 */
export const initAnalytics = async () => {
  // Prevent duplicate initialization
  if (isTracking) return;
  
  try {
    // Generate a session ID if one doesn't exist
    let sessionId = localStorage.getItem('mai_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('mai_session_id', sessionId);
    }
    
    // Track this session
    await trackUserSession(sessionId);
    isTracking = true;
    console.log('Analytics initialized');
  } catch (error) {
    console.error('Failed to initialize analytics:', error);
  }
};

/**
 * Records a user session in the database
 */
const trackUserSession = async (sessionId: string) => {
  try {
    const { error } = await supabase
      .from('user_analytics')
      .upsert(
        { 
          session_id: sessionId,
          last_seen: new Date().toISOString(),
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
          path: window.location.pathname
        },
        { onConflict: 'session_id' }
      );
    
    if (error) throw error;
    
    // Also track page views
    trackPageView(sessionId);
  } catch (error) {
    console.error('Error tracking user session:', error);
  }
};

/**
 * Tracks page views as the user navigates
 */
const trackPageView = (sessionId: string) => {
  // Track initial page view
  recordPageView(sessionId, window.location.pathname);
  
  // Set up history change listener to track navigation
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(this, arguments as any);
    recordPageView(sessionId, window.location.pathname);
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(this, arguments as any);
    recordPageView(sessionId, window.location.pathname);
  };
  
  // Track when user navigates with back/forward buttons
  window.addEventListener('popstate', () => {
    recordPageView(sessionId, window.location.pathname);
  });
};

/**
 * Records a page view in the database
 */
const recordPageView = async (sessionId: string, path: string) => {
  try {
    const { error } = await supabase
      .from('page_views')
      .insert({
        session_id: sessionId,
        path,
        view_time: new Date().toISOString()
      });
    
    if (error) throw error;
  } catch (error) {
    console.error('Error recording page view:', error);
  }
};

/**
 * Updates the user's last seen timestamp
 * Call this periodically to track active users
 */
export const updateUserActivity = async () => {
  const sessionId = localStorage.getItem('mai_session_id');
  if (!sessionId) return;
  
  try {
    await supabase
      .from('user_analytics')
      .update({ last_seen: new Date().toISOString() })
      .eq('session_id', sessionId);
  } catch (error) {
    console.error('Error updating user activity:', error);
  }
};
