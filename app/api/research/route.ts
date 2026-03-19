import { researchWriter } from '@/lib/claude'
import { NextRequest } from 'next/server'

export const maxDuration = 60

// ─── Substack handle normalisation ────────────────────────────────────────────

function extractHandle(input: string): string | null {
  const cleaned = input.trim().toLowerCase()

  // Full URL: https://lenny.substack.com or https://lenny.substack.com/
  const urlMatch = cleaned.match(/([a-z0-9-]+)\.substack\.com/)
  if (urlMatch) return urlMatch[1]

  // Plain handle: lenny or lenny.substack.com (without https://)
  const plainHandleMatch = cleaned.match(/^([a-z0-9-]+)(\.substack\.com)?$/)
  if (plainHandleMatch) return plainHandleMatch[1]

  return null
}

// ─── Substack API fetch ────────────────────────────────────────────────────────

interface SubstackAbout {
  name?: string
  bio?: string
  publicationUsers?: Array<{ name?: string; bio?: string }>
  heroImage?: string
  language?: string
  founding_plan_name?: string
  free_subscriber_count?: number
  paid_subscriber_count?: number
}

interface SubstackPost {
  title?: string
  subtitle?: string
  publishedBylines?: Array<{ name?: string }>
  post_date?: string
  audience?: string  // 'everyone' | 'only_paid'
  wordcount?: number
  slug?: string
}

async function fetchSubstackData(handle: string): Promise<string | null> {
  const base = `https://${handle}.substack.com`
  const headers = {
    'User-Agent': 'Mozilla/5.0 (compatible; Substackr/1.0)',
    Accept: 'application/json',
  }

  try {
    const [aboutRes, postsRes] = await Promise.all([
      fetch(`${base}/api/v1/about`, { headers, signal: AbortSignal.timeout(8000) }),
      fetch(`${base}/api/v1/posts?limit=12`, { headers, signal: AbortSignal.timeout(8000) }),
    ])

    if (!aboutRes.ok && !postsRes.ok) return null

    const lines: string[] = [`VERIFIED SUBSTACK DATA for: ${handle}.substack.com`]

    if (aboutRes.ok) {
      const about: SubstackAbout = await aboutRes.json()
      if (about.name) lines.push(`Publication name: ${about.name}`)
      if (about.bio) lines.push(`Publication description: ${about.bio}`)
      // Author bio — sometimes nested in publicationUsers
      const authorBio = about.publicationUsers?.[0]?.bio
      if (authorBio) lines.push(`Author bio: ${authorBio}`)
      if (about.free_subscriber_count && about.free_subscriber_count > 0) {
        lines.push(`Free subscribers (approximate): ${about.free_subscriber_count.toLocaleString()}`)
      }
      if (about.founding_plan_name) lines.push(`Paid tier name: ${about.founding_plan_name}`)
    }

    if (postsRes.ok) {
      const posts: SubstackPost[] = await postsRes.json()
      if (posts.length > 0) {
        lines.push(`\nRecent posts (${posts.length} fetched):`)
        posts.forEach((post, i) => {
          const audience = post.audience === 'only_paid' ? '[paid]' : '[free]'
          const wordcount = post.wordcount ? ` ~${post.wordcount} words` : ''
          const subtitle = post.subtitle ? ` — ${post.subtitle}` : ''
          lines.push(`${i + 1}. ${audience} "${post.title}"${subtitle}${wordcount}`)
        })

        const paidCount = posts.filter(p => p.audience === 'only_paid').length
        const freeCount = posts.length - paidCount
        lines.push(`\nContent mix: ${freeCount} free posts, ${paidCount} paid posts in last 12`)
      }
    }

    return lines.join('\n')
  } catch {
    return null
  }
}

// ─── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { writerName, isSelf } = body

    if (!writerName || typeof writerName !== 'string' || writerName.trim().length < 2) {
      return Response.json(
        { error: 'Please enter a writer name (at least 2 characters)', code: 'INVALID_INPUT' },
        { status: 400 }
      )
    }

    // Attempt live Substack data fetch — works when user provides a handle or URL
    const handle = extractHandle(writerName.trim())
    const substackData = handle ? await fetchSubstackData(handle) : null

    const profile = await researchWriter(writerName.trim(), isSelf === true, substackData ?? undefined)
    return Response.json(profile)
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json(
        { error: 'Could not parse the research response. Please try again.', code: 'PARSE_ERROR' },
        { status: 500 }
      )
    }
    const message = error instanceof Error ? error.message : String(error)
    console.error('Research API error:', message)
    const isQuotaError = message.includes('usage limits') || message.includes('quota')
    return Response.json(
      {
        error: isQuotaError
          ? 'The AI service is temporarily unavailable. Please try again shortly.'
          : 'Something went wrong. Please try again in a moment.',
        code: 'API_ERROR',
      },
      { status: 500 }
    )
  }
}
