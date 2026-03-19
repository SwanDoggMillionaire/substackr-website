import { researchWriter } from '@/lib/claude'
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

    const profile = await researchWriter(writerName.trim(), isSelf === true)
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
    return Response.json(
      { error: 'Something went wrong. Please try again in a moment.', code: 'API_ERROR', detail: message },
      { status: 500 }
    )
  }
}
