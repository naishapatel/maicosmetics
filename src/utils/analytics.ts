
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
    // Use the Raw API to insert/update data to user_analytics
    const { error } = await supabase.rpc('upsert_user_analytics', {
      p_session_id: sessionId,
      p_last_seen: new Date().toISOString(),
      p_user_agent: navigator.userAgent,
      p_referrer: document.referrer || null,
      p_path: window.location.pathname
    });
    
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
    // Use the Raw API to insert data to page_views
    const { error } = await supabase.rpc('insert_page_view', {
      p_session_id: sessionId,
      p_path: path
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
    // Use the Raw API to update the last_seen timestamp
    await supabase.rpc('update_user_activity', {
      p_session_id: sessionId,
      p_last_seen: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating user activity:', error);
  }
};
