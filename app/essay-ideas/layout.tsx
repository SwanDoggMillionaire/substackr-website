import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Essay Ideas — Substackr',
  description:
    'Pick a Substack writer you admire. Get 5 essay ideas shaped around your niche — free, no sign-up required.',
  openGraph: {
    title: 'Get Essay Ideas — Substackr',
    description:
      'Pick a Substack writer you admire. Get 5 essay ideas shaped around your niche — free, no sign-up required.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Substackr' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og.png'],
  },
}

export default function EssayIdeasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
