
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

    if (!subject || !content) {
      return new Response(
        JSON.stringify({ error: "Subject and content are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Get all subscribers from the database
    const { data: subscribers, error: subscribersError } = await fetch(
      `${Deno.env.get("SUPABASE_URL")}/rest/v1/newsletter_subscribers?select=email`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        },
      }
    ).then(res => res.json());

    if (subscribersError) {
      console.error("Error fetching subscribers:", subscribersError);
      throw new Error("Failed to fetch subscribers");
    }

    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ message: "No subscribers found" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Sending email to ${subscribers.length} subscribers`);

    // Extract subscriber emails
    const emails = subscribers.map((subscriber: { email: string }) => subscriber.email);

    // Send email to all subscribers (using BCC for privacy)
    const emailResponse = await resend.emails.send({
      from: "mai. <onboarding@resend.dev>",
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

    console.log("Email sending response:", emailResponse);

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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
