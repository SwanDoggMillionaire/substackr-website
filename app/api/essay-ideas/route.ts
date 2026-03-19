import { generateEssayIdeas } from '@/lib/claude'
import { WriterProfile } from '@/lib/types'
import { NextRequest } from 'next/server'

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { profile, userNiche } = body as { profile: WriterProfile; userNiche: string }

    if (!profile || !profile.writerName) {
      return Response.json(
        { error: 'A writer profile is required.', code: 'INVALID_INPUT' },
        { status: 400 }
      )
    }

    if (!userNiche || typeof userNiche !== 'string' || userNiche.trim().length < 3) {
      return Response.json(
        { error: 'Please describe your newsletter niche (at least 3 characters).', code: 'INVALID_INPUT' },
        { status: 400 }
      )
    }

    const result = await generateEssayIdeas(profile, userNiche.trim())
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
