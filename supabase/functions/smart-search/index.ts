import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'AI not configured', majors: [] }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { query, majorNames } = await req.json() as { query: string; majorNames: string[] };
    if (!query || !Array.isArray(majorNames) || majorNames.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid input', majors: [] }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userPrompt = `A student searched for: "${query}". Based on this list of available majors: ${JSON.stringify(majorNames)}, return the 3 most relevant majors that match their interest, even if the words don't literally match. Respond only with a JSON array of major names, nothing else.`;

    const res = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: 'You are a helpful career-matching assistant. Always respond with only a JSON array of strings, no prose, no markdown.' },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('AI gateway error', res.status, text);
      return new Response(JSON.stringify({ error: 'AI error', majors: [] }), {
        status: res.status === 429 || res.status === 402 ? res.status : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    let content: string = data.choices?.[0]?.message?.content?.trim() ?? '[]';
    // Strip possible code fences
    content = content.replace(/^```(?:json)?\s*/i, '').replace(/```$/,'').trim();
    const match = content.match(/\[[\s\S]*\]/);
    let parsed: string[] = [];
    try {
      parsed = JSON.parse(match ? match[0] : content);
    } catch {
      parsed = [];
    }
    const filtered = parsed.filter((n) => typeof n === 'string' && majorNames.includes(n)).slice(0, 3);

    return new Response(JSON.stringify({ majors: filtered }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('smart-search error:', err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown', majors: [] }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
