import Anthropic from '@anthropic-ai/sdk'
import { WriterProfile } from './types'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `You are a competitive intelligence researcher specialising in Substack creators. Your job is to research ONE Substack writer and return a structured profile in JSON format.

You will be given a writer's name. Work from your training knowledge to produce the most accurate and useful profile possible. If you have limited knowledge of this writer, say so clearly rather than fabricating details.

Return ONLY valid JSON (no markdown, no code fences) matching this exact structure:

{
  "writerName": "The writer's name as given",
  "researchProfile": {
    "title": "Research Profile",
    "content": "One paragraph overview: who they are, what they write, why they matter on Substack."
  },
  "nicheAndTopicFocus": {
    "title": "Niche & Topic Focus",
    "content": "What is their specific niche? How tightly do they own it? What topics recur most often?",
    "bullets": ["Key topic 1", "Key topic 2", "Key topic 3"]
  },
  "audienceResonance": {
    "title": "Audience Resonance",
    "content": "What do readers visibly respond to? Who is their audience — what kind of person reads them and why?"
  },
  "positioning": {
    "title": "Positioning",
    "content": "How do they frame their story and identity? Aspirational or personal? Expert or fellow traveller? What makes their positioning distinctive or generic?"
  },
  "monetisationStrategy": {
    "title": "Monetisation Strategy",
    "content": "Do they have a paid tier? At what price point? What does it offer? What is their apparent revenue model and how mature is it?"
  },
  "contentPatterns": {
    "title": "Content Patterns",
    "content": "What formats dominate (essays, lists, letters, interviews)? Typical post length? Publishing cadence? What content types appear to perform best?"
  },
  "strategicSummary": {
    "title": "Strategic Summary",
    "insights": [
      "Insight 1: Something concrete a Substack writer can adopt or adapt from this person's approach",
      "Insight 2: A gap or weakness in this writer's approach that represents an opportunity",
      "Insight 3: What distinguishes this writer most and whether that distinction is replicable"
    ]
  },
  "generatedAt": "ISO timestamp here"
}

Rules:
- Never invent subscriber counts, engagement metrics, or specific essay titles you are not confident about
- If you genuinely don't know much about this writer, be honest in each section — short content is better than fabricated content
- The strategicSummary.insights array must contain EXACTLY 3 strings
- The nicheAndTopicFocus.bullets array should contain 3-5 key topics
- Set generatedAt to the current ISO timestamp
- Return ONLY the JSON object — no preamble, no explanation, no markdown`

function extractJSON(text: string): string {
  // Strip markdown code fences if present
  const match = text.match(/```(?:json)?\n?([\s\S]*?)\n?```/)
  return match ? match[1].trim() : text.trim()
}

export async function researchWriter(writerName: string): Promise<WriterProfile> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    temperature: 0.3,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Research the Substack writer: ${writerName}`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  const jsonText = extractJSON(content.text)
  const profile = JSON.parse(jsonText) as WriterProfile

  // Ensure generatedAt is set
  if (!profile.generatedAt) {
    profile.generatedAt = new Date().toISOString()
  }

  return profile
}
