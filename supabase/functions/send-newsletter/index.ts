
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with the API key
const resendApiKey = Deno.env.get("RESEND_API_KEY");
if (!resendApiKey) {
  console.error("RESEND_API_KEY is not set");
}
const resend = new Resend(resendApiKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  subject: string;
  content: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { subject, content }: NewsletterRequest = await req.json();
    console.log("Newsletter request:", { subject, content });

    if (!subject || !content) {
      return new Response(
        JSON.stringify({ error: "Subject and content are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Attempting to fetch subscribers...");
    
    // Get all subscribers from the database with detailed error handling
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase credentials:", { supabaseUrl: !!supabaseUrl, supabaseKey: !!supabaseKey });
      throw new Error("Server configuration error - Missing Supabase credentials");
    }
    
    // Get all subscribers from the database
    console.log(`Making request to: ${supabaseUrl}/rest/v1/newsletter_subscribers?select=email`);
    const subscribersResponse = await fetch(
      `${supabaseUrl}/rest/v1/newsletter_subscribers?select=email`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "X-Client-Info": "supabase-edge-function"
        },
      }
    );
    
    if (!subscribersResponse.ok) {
      const errorText = await subscribersResponse.text();
      console.error(`Failed to fetch subscribers: ${subscribersResponse.status} - ${errorText}`);
      throw new Error(`Failed to fetch subscribers: ${subscribersResponse.status} - ${errorText}`);
    }
    
    const subscribers = await subscribersResponse.json();
    console.log(`Fetched subscribers count: ${subscribers.length}`);
    console.log(`Subscribers data: ${JSON.stringify(subscribers.slice(0, 2))}...`); // Log only first 2 for privacy

    if (!subscribers || subscribers.length === 0) {
      console.log("No subscribers found in database");
      return new Response(
        JSON.stringify({ message: "No subscribers found" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Extract subscriber emails
    const emails = subscribers.map((subscriber: { email: string }) => subscriber.email);
    console.log(`Sending newsletter to ${emails.length} subscribers`);

    if (emails.length === 0) {
      return new Response(
        JSON.stringify({ message: "No subscriber emails found" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email to all subscribers (using BCC for privacy)
    console.log("Sending email with Resend...");
    const emailResponse = await resend.emails.send({
      from: "mai. <hello@resend.dev>", // Using approved sender domain
      bcc: emails,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="color: #8B5A5F; text-align: center; margin-bottom: 20px;">mai.</h1>
          <div style="background-color: #FFF1F0; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            ${content}
          </div>
          <div style="text-align: center; font-size: 12px; color: #888; margin-top: 20px;">
            <p>You received this email because you subscribed to the mai. newsletter.</p>
            <p>© ${new Date().getFullYear()} mai. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log("Email sending response:", JSON.stringify(emailResponse));

    return new Response(
      JSON.stringify({ 
        message: `Newsletter sent to ${emails.length} subscribers`,
        response: emailResponse
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-newsletter function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
