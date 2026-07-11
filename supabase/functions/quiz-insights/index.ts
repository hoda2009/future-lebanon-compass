import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

interface RequestBody {
  personalityType: string;
  matchPercentage: number;
  traits: string[];
  breakdown: Record<string, number>;
  topMajor: { name: string; jobGrowth?: string; category: string };
  alternatives: { name: string; category: string; score: number }[];
}

const SYSTEM_PROMPT = `You are a warm, encouraging career counselor helping a student in Lebanon. Based on their quiz results, write a personalized 3-4 sentence explanation of why their top recommended major fits them specifically. Reference their actual key traits and Lebanon's 2026 job market. End with one concrete, actionable next step. Keep the tone motivating and specific, not generic.`;

const NARRATIVE_PROMPT = `You are a vivid storyteller helping a student in Lebanon imagine their future. Write ONE short paragraph (3-4 sentences) in second person ("you") describing what their life could look like in 3 years working in their matched major in Lebanon. Be sensory, specific to Lebanon (mention places, atmosphere), and inspiring. No preamble, just the paragraph.`;

const ALT_PROMPT = `You are a career counselor. In ONE encouraging sentence (max 25 words), explain why this alternative major scored lower for a student compared to their top match. Reference the trait mismatch subtly. No preamble.`;

async function callAI(system: string, user: string, apiKey: string): Promise<string> {
  const res = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'google/gemini-3-flash-preview',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI gateway ${res.status}: ${text}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? '';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'AI not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = (await req.json()) as RequestBody;
    const {
      personalityType,
      matchPercentage,
      traits,
      breakdown,
      topMajor,
      alternatives,
    } = body;

    const userContext = `Student profile:
- Personality type: ${personalityType}
- Match strength: ${matchPercentage}%
- Key traits: ${traits.join(', ')}
- Category breakdown scores: ${Object.entries(breakdown).map(([k, v]) => `${k}=${v}`).join(', ')}
- Top recommended major: ${topMajor.name} (${topMajor.category})${topMajor.jobGrowth ? `, Lebanon 2026 job growth: ${topMajor.jobGrowth}` : ''}`;

    // Run all 3 AI calls in parallel
    const [personalized, narrative, ...altReasons] = await Promise.all([
      callAI(SYSTEM_PROMPT, userContext, apiKey),
      callAI(NARRATIVE_PROMPT, userContext, apiKey),
      ...alternatives.slice(0, 2).map((alt) =>
        callAI(
          ALT_PROMPT,
          `Student key traits: ${traits.join(', ')}.
Top match: ${topMajor.name}.
Alternative major: ${alt.name} (${alt.category}), scored ${alt.score} vs top match.
Why is this a lower fit for THIS student?`,
          apiKey,
        ),
      ),
    ]);

    return new Response(
      JSON.stringify({
        personalized,
        narrative,
        alternativeReasons: altReasons,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('quiz-insights error:', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
