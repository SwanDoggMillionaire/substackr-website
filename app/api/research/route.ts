import { researchWriter } from '@/lib/claude'
import { extractHandle, fetchSubstackData } from '@/lib/substack'
import { NextRequest } from 'next/server'

export const maxDuration = 60

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

    // Attempt live Substack data fetch - works when user provides a handle or URL
    const handle = extractHandle(writerName.trim())
    const substackResult = handle ? await fetchSubstackData(handle) : null

    const profile = await researchWriter(
      writerName.trim(),
      isSelf === true,
      substackResult?.contextString ?? undefined
    )

    // Attach live posts to the profile for display (not from Claude - from Substack API directly)
    if (substackResult?.posts?.length) {
      profile.recentPosts = substackResult.posts
    }

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
