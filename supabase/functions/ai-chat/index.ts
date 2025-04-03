
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
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful beauty assistant for mai., a company focused on vegan, sustainable beauty products. Your name is Mai Assistant. Keep responses brief, friendly, and focused on beauty advice, especially for skincare. Only recommend vegan and sustainable products. If asked about non-beauty topics, politely redirect the conversation to beauty and skincare. You are an AI assistant created by mai. to help users find skincare products and learn about sustainable beauty practices.' 
          },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI API response received successfully');
    
    if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected OpenAI API response format:', data);
      throw new Error('Unexpected OpenAI API response format');
    }
    
    const generatedMessage = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: generatedMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in AI chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
