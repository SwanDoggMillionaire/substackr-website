import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Audit Your Substack — Substackr',
  description:
    'Enter your Substack handle. Get a full strategic audit — niche, positioning, content patterns, About page tips, and your recent posts reviewed. Free, no sign-up.',
  openGraph: {
    title: 'Audit Your Substack — Substackr',
    description:
      'Enter your Substack handle. Get a full strategic audit — niche, positioning, content patterns, About page tips, and your recent posts reviewed. Free, no sign-up.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Substackr' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og.png'],
  },
}

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
