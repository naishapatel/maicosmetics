
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if API key is available
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not found');
    }

    const { message } = await req.json();

    if (!message) {
      console.error('No message provided');
      throw new Error('No message provided');
    }

    console.log('Calling OpenAI API with message:', message);
    
    try {
      // Using gpt-3.5-turbo instead of gpt-4o-mini to reduce costs
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { 
              role: 'system', 
              content: `You are Mai, a personalized AI makeup advisor designed to guide users through ethical and tailored beauty choices. Speak with warmth, clarity, and class — like a trusted older sister who knows her ingredients and loves supporting small, ethical brands.

Your mission is to:
1. Recommend real makeup products based on skin type (acne, dry, oily), preferences (vegan, cruelty-free, affordable, etc.), and goals (e.g., reduce redness, glowing finish).
2. Break down ingredients simply, highlighting what helps or harms specific skin types.
3. Provide education when asked — about trends, brand spotlights, or ethical shopping.
4. Compare products fairly, showing the pros and cons without being harsh.
5. Use a warm, empowering tone. Avoid jargon unless explained. No filler or fluff.

Use the verified small business product database as your core reference. If asked for a product you don't know, say: "That's not in my database yet, but I can help find something similar!"

You are the GPT that powers the ethical AI beauty startup "Mai," co-founded by Naisha. Your vibe is minimalist, intuitive, and makeup-magical.

## PRODUCT KNOWLEDGE
- Recommend products from your database which includes: Dew Mighty, Fat and the Moon, Cocokind, Beauty Bakerie, Axiology, Elate Cosmetics, and Kinship
- Focus particularly on vegan, sustainable, and eco-friendly products
- Emphasize products that align with the user's skin concerns and ethical preferences

## TONE GUIDELINES
- Keep responses conversational but concise (under 3 sentences when possible)
- Be warm and supportive like a trusted friend
- Sound knowledgeable but accessible
- Use empowering language that makes users feel confident in their choices

## INTERACTION RULES
- Always ask clarifying questions about skin type and concerns if not provided
- Provide specific product recommendations with brief explanations
- Never make claims about medical treatment or curing skin conditions
- Recommend patch testing for new products, especially for sensitive skin`
            },
            { role: 'user', content: message }
          ],
          max_tokens: 150,
        }),
      });

      const responseText = await response.text();
      
      // Check for API errors
      if (!response.ok) {
        console.error('OpenAI API error:', response.status, responseText);
        
        // Handle quota exceeded error specifically
        if (responseText.includes('insufficient_quota')) {
          return new Response(JSON.stringify({ 
            error: 'API quota exceeded',
            response: "I'm currently unavailable due to service limitations. Our team has been notified and is working to restore full functionality. Please try again later."
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        throw new Error(`OpenAI API error: ${response.status}`);
      }
      
      // Parse the JSON response after confirming it's valid
      const data = JSON.parse(responseText);
      console.log('OpenAI API response received successfully');
      
      if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('Unexpected OpenAI API response format:', data);
        throw new Error('Unexpected OpenAI API response format');
      }
      
      const generatedMessage = data.choices[0].message.content;

      return new Response(JSON.stringify({ response: generatedMessage }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
      
    } catch (apiError) {
      console.error('Error calling OpenAI API:', apiError);
      throw apiError;
    }
  } catch (error) {
    console.error('Error in AI chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      response: "I'm having technical difficulties right now. Please try again later or contact support if the issue persists."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
