import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

function getRatelimiter() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(10, '1 h'),
    analytics: false,
  })
}

const ratelimit = getRatelimiter()

export async function middleware(request: NextRequest) {
  // Fail open if Redis is not configured
  if (!ratelimit) return NextResponse.next()

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'anonymous'

  try {
    const { success, limit, remaining, reset } = await ratelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        {
          error:
            'You have run too many analyses in the past hour. The limit is 10 per hour - please try again later.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': String(remaining),
            'X-RateLimit-Reset': String(reset),
            'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
          },
        }
      )
    }
  } catch {
    // Fail open on Redis errors - better to allow than to block everyone
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/research', '/api/essay-ideas'],
}
