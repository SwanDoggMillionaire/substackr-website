import { generateEssayIdeas } from '@/lib/claude'
import { extractHandle, fetchSubstackData } from '@/lib/substack'
import { WriterProfile } from '@/lib/types'
import { NextRequest } from 'next/server'

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { profile, userNiche, userHandle } = body as {
      profile: WriterProfile
      userNiche?: string
      userHandle?: string
    }

    if (!profile || !profile.writerName) {
      return Response.json(
        { error: 'A writer profile is required.', code: 'INVALID_INPUT' },
        { status: 400 }
      )
    }

    // Fetch the user's own Substack data if a handle was provided
    // This is distinct from the inspiration writer's data - it describes the USER's newsletter
    let userData: string | undefined
    if (userHandle && typeof userHandle === 'string') {
      const handle = extractHandle(userHandle.trim())
      if (handle) {
        const result = await fetchSubstackData(handle)
        userData = result?.contextString ?? undefined
      }
    }

    // Niche fallback: use typed niche if no live user data available
    const effectiveNiche = userNiche?.trim() || profile.writerName

    const result = await generateEssayIdeas(profile, effectiveNiche, userData)
    return Response.json(result)
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json(
        { error: 'Could not parse the response. Please try again.', code: 'PARSE_ERROR' },
        { status: 500 }
      )
    }
    console.error('Essay ideas API error:', error)
    return Response.json(
      { error: 'Something went wrong. Please try again in a moment.', code: 'API_ERROR' },
      { status: 500 }
    )
  }
}
