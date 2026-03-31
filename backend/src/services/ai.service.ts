import OpenAI from 'openai';

export interface AISuggestionInput {
  projectName: string;
  description: string;
  score: number;
  costEstimate: number;
  issuesCount: number;
}

export interface AISuggestion {
  title: string;
  description: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  impact: string;
}

const client = new OpenAI({ apiKey: process.env.AI_API_KEY });

export async function generateAISuggestions(input: AISuggestionInput): Promise<AISuggestion[]> {
  try {
    const prompt = `Project: ${input.projectName}
Description: ${input.description}
Score: ${input.score}, Cost: $${input.costEstimate}, Issues: ${input.issuesCount}

Return a JSON array of max 3 suggestions. Each object must have: title, description, severity (HIGH|MEDIUM|LOW), impact. Short text only. No extra fields.`;

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 100,
      temperature: 0.4,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.choices[0]?.message?.content ?? '';
    const json = content.match(/\[[\s\S]*\]/)?.[0];
    if (!json) return [];

    return JSON.parse(json) as AISuggestion[];
  } catch {
    return [];
  }
}
