import Anthropic from '@anthropic-ai/sdk'
import { WriterProfile, EssayIdeasResult } from './types'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// ─── Writer Research Prompt ───────────────────────────────────────────────────

const RESEARCH_SYSTEM_PROMPT = `You are a competitive intelligence researcher specialising in Substack creators. Your job is to research ONE Substack writer and return a structured profile in JSON format.

You will be given a writer's name (or Substack URL/handle). When a "VERIFIED SUBSTACK DATA" block is provided, treat it as authoritative ground truth — it is live data fetched directly from Substack's API. Prioritise this data over anything in your training knowledge. Do not contradict it. Use it to anchor every section of the profile. When no verified data is provided, work from your training knowledge.

Return ONLY valid JSON (no markdown, no code fences) matching this exact structure:

{
  "writerName": "The writer's full name or publication name as given",
  "confidenceLevel": "HIGH",
  "oneLiner": "One punchy, specific sentence capturing who this writer is and what makes them distinctive. Not generic — make it quotable.",
  "researchProfile": {
    "title": "Research Profile",
    "content": "One paragraph overview: who they are, what they write, why they matter on Substack."
  },
  "nicheAndTopicFocus": {
    "title": "Niche & Topic Focus",
    "content": "What is their specific niche? How tightly do they own it? Is the breadth of their focus a strength or a weakness?",
    "bullets": ["Key topic 1", "Key topic 2", "Key topic 3"]
  },
  "audienceResonance": {
    "title": "Audience Resonance",
    "content": "What do readers visibly respond to? Who is their audience — what kind of person reads them and why? What keeps people subscribed?"
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
    "content": "What formats dominate (essays, lists, letters, interviews)? Typical post length? Publishing cadence? What content types perform best?"
  },
  "strategicSummary": {
    "title": "Strategic Summary",
    "insights": [
      "Insight 1: Something concrete a Substack writer can adopt or adapt from this person's approach",
      "Insight 2: A specific weakness or limitation in this writer's current approach",
      "Insight 3: What makes this writer most distinctive and whether it is replicable"
    ],
    "theGap": "What adjacent territory is this writer NOT covering? What audience segment are they leaving underserved? This is the opportunity for someone positioning against them."
  },
  "similarWriters": ["Writer Name 1", "Writer Name 2", "Writer Name 3"],
  "generatedAt": "ISO timestamp"
}

Rules for confidenceLevel:
- "HIGH": verified live data was provided, OR you have strong specific training knowledge of this writer
- "MEDIUM": you know who they are but details are limited or potentially outdated
- "LOW": you have minimal knowledge and no live data was provided — be honest that this profile is limited

Rules for oneLiner:
- Specific, not generic. Bad: "A writer covering productivity and mindset." Good: "Anne-Laure Le Cunff turned her neuroscience PhD into the most rigorous self-improvement newsletter on the internet."
- Should be quotable and shareable

Rules for theGap:
- Specific and actionable. Name the actual territory, not a vague description.
- Bad: "There's opportunity in the premium content space." Good: "Lenny covers product strategy but never touches the emotional/psychological side of being a PM — imposter syndrome, managing up, founder conflict. That territory is wide open."

Rules for similarWriters:
- 2–3 names. Writers who share audience, topic, or style overlap.
- Only include writers you're reasonably confident exist on Substack.

Rules for strategicSummary.insights:
- EXACTLY 3 strings. Each must be specific and actionable, not vague.
- Never invent subscriber counts, engagement metrics, or specific essay titles you're not confident about.

Set generatedAt to the current ISO timestamp.
Return ONLY the JSON object — no preamble, no explanation, no markdown.`

const SELF_ANALYSIS_ADDITION = `

IMPORTANT: The user is analysing their OWN Substack newsletter. Adjust your tone accordingly:
- Write in second person where it feels natural ("Your niche is..." rather than "Their niche is...")
- Be diplomatically honest — this is meant to surface blind spots the writer cannot see themselves
- The theGap field should focus on opportunities for THIS WRITER to expand or pivot
- The strategicSummary insights should be personal development advice, not general observations
- confidenceLevel should reflect how well-known their newsletter is — LOW is fine and expected for smaller writers`

// ─── Essay Ideas Prompt ───────────────────────────────────────────────────────

const ESSAY_IDEAS_SYSTEM_PROMPT = `You are a creative writing strategist for Substack writers. You have been given a structured profile of a writer the user admires. Your job is to generate 5 essay ideas inspired by that writer's approach, adapted for the user's own newsletter.

Return ONLY valid JSON (no markdown, no code fences) matching this exact structure:

{
  "writerName": "the analysed writer's name",
  "userNiche": "the user's stated niche",
  "ideas": [
    {
      "title": "A working title for the essay — specific and compelling, not vague",
      "coreTension": "The central question or conflict this essay would explore. What makes it interesting?",
      "whyItWorksForThem": "Why this angle or format works specifically for the writer being studied",
      "howToAdaptForYou": "How the user should make this their own — what to keep, what to change, what to add based on their niche"
    }
  ]
}

Rules:
- Generate EXACTLY 5 ideas
- Each title should be specific enough to actually write — not "A piece about productivity" but "The productivity advice I followed for a year that made me less productive"
- coreTension should be a question or conflict, not a description
- howToAdaptForYou must reference the user's specific niche — not generic advice
- Mix formats: essay, list, personal story, interview angle, contrarian take
- Return ONLY the JSON object`

// ─── Functions ────────────────────────────────────────────────────────────────

function extractJSON(text: string): string {
  const match = text.match(/```(?:json)?\n?([\s\S]*?)\n?```/)
  return match ? match[1].trim() : text.trim()
}

export async function researchWriter(
  writerName: string,
  isSelf: boolean = false,
  substackData?: string
): Promise<WriterProfile> {
  const systemPrompt = isSelf
    ? RESEARCH_SYSTEM_PROMPT + SELF_ANALYSIS_ADDITION
    : RESEARCH_SYSTEM_PROMPT

  const basePrompt = isSelf
    ? `Analyse my own Substack newsletter: ${writerName}`
    : `Research the Substack writer: ${writerName}`

  const userContent = substackData
    ? `${substackData}\n\n---\n\n${basePrompt}`
    : basePrompt

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2500,
    temperature: 0.3,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userContent,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  const jsonText = extractJSON(content.text)
  const profile = JSON.parse(jsonText) as WriterProfile

  if (!profile.generatedAt) {
    profile.generatedAt = new Date().toISOString()
  }

  if (isSelf) {
    profile.isAnalysingSelf = true
  }

  profile.dataSource = substackData ? 'live' : 'training'

  // Ensure arrays are initialised
  if (!profile.similarWriters) profile.similarWriters = []
  if (!profile.strategicSummary.insights) profile.strategicSummary.insights = []

  return profile
}

export async function generateEssayIdeas(
  profile: WriterProfile,
  userNiche: string
): Promise<EssayIdeasResult> {
  const profileSummary = `
Writer: ${profile.writerName}
One-liner: ${profile.oneLiner}
Niche: ${profile.nicheAndTopicFocus.content}
Topics: ${profile.nicheAndTopicFocus.bullets?.join(', ') || 'not specified'}
Positioning: ${profile.positioning.content}
Content patterns: ${profile.contentPatterns.content}
Strategic gap: ${profile.strategicSummary.theGap}
`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    temperature: 0.7,
    system: ESSAY_IDEAS_SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Writer profile:\n${profileSummary}\n\nUser's newsletter niche: ${userNiche}\n\nGenerate 5 essay ideas.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  const jsonText = extractJSON(content.text)
  return JSON.parse(jsonText) as EssayIdeasResult
}
