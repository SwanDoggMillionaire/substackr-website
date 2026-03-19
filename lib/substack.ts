// ─── Types ────────────────────────────────────────────────────────────────────

export interface RecentPost {
  title: string
  subtitle?: string
  slug: string
  url: string
  publishedAt: string
  audience: 'free' | 'paid'
  wordcount?: number
}

export interface SubstackFetchResult {
  contextString: string   // injected into Claude prompt
  posts: RecentPost[]     // returned alongside profile for display
}

// ─── Handle normalisation ──────────────────────────────────────────────────────

export function extractHandle(input: string): string | null {
  const cleaned = input.trim().toLowerCase()

  // Full URL: https://lenny.substack.com or https://lenny.substack.com/
  const urlMatch = cleaned.match(/([a-z0-9-]+)\.substack\.com/)
  if (urlMatch) return urlMatch[1]

  // Plain handle with no dots: lenny
  // But not a multi-word name like "lenny rachitsky" — check for spaces
  if (!cleaned.includes(' ') && /^[a-z0-9-]+$/.test(cleaned)) {
    return cleaned
  }

  return null
}

// ─── Substack API interfaces ───────────────────────────────────────────────────

interface SubstackAbout {
  name?: string
  bio?: string
  publicationUsers?: Array<{ name?: string; bio?: string }>
  founding_plan_name?: string
  free_subscriber_count?: number
}

interface SubstackPostRaw {
  title?: string
  subtitle?: string
  slug?: string
  post_date?: string
  audience?: string
  wordcount?: number
}

// ─── Main fetch function ───────────────────────────────────────────────────────

export async function fetchSubstackData(handle: string): Promise<SubstackFetchResult | null> {
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
    const posts: RecentPost[] = []

    if (aboutRes.ok) {
      const about: SubstackAbout = await aboutRes.json()
      if (about.name) lines.push(`Publication name: ${about.name}`)
      if (about.bio) lines.push(`Publication description: ${about.bio}`)
      const authorBio = about.publicationUsers?.[0]?.bio
      if (authorBio) lines.push(`Author bio: ${authorBio}`)
      if (about.free_subscriber_count && about.free_subscriber_count > 0) {
        lines.push(`Free subscribers (approximate): ${about.free_subscriber_count.toLocaleString()}`)
      }
      if (about.founding_plan_name) lines.push(`Paid tier name: ${about.founding_plan_name}`)
    }

    if (postsRes.ok) {
      const rawPosts: SubstackPostRaw[] = await postsRes.json()
      if (rawPosts.length > 0) {
        lines.push(`\nRecent posts (${rawPosts.length} fetched):`)

        rawPosts.forEach((post, i) => {
          if (!post.title || !post.slug) return

          const audience = post.audience === 'only_paid' ? 'paid' : 'free'
          const audienceLabel = audience === 'paid' ? '[paid]' : '[free]'
          const wordcount = post.wordcount ? ` ~${post.wordcount} words` : ''
          const subtitle = post.subtitle ? ` — ${post.subtitle}` : ''
          lines.push(`${i + 1}. ${audienceLabel} "${post.title}"${subtitle}${wordcount}`)

          posts.push({
            title: post.title,
            subtitle: post.subtitle || undefined,
            slug: post.slug,
            url: `${base}/p/${post.slug}`,
            publishedAt: post.post_date || '',
            audience,
            wordcount: post.wordcount || undefined,
          })
        })

        const paidCount = posts.filter(p => p.audience === 'paid').length
        const freeCount = posts.length - paidCount
        lines.push(`\nContent mix: ${freeCount} free posts, ${paidCount} paid posts in last ${posts.length}`)
      }
    }

    return {
      contextString: lines.join('\n'),
      posts,
    }
  } catch {
    return null
  }
}
