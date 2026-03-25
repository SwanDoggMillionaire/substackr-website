import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Substack Newsletter Audit — Full Strategic Analysis, Free',
  description:
    'Get a full strategic audit of your Substack newsletter. AI analyses your niche, positioning, content patterns, and About page using your live posts. Free during beta, no sign-up.',
  keywords: [
    'substack audit',
    'substack newsletter audit',
    'newsletter audit tool',
    'substack review',
    'how to audit my substack',
    'substack newsletter analysis',
    'substack growth analysis',
    'free substack audit',
  ],
  alternates: {
    canonical: 'https://substackr.com/audit',
  },
  openGraph: {
    title: 'Substack Newsletter Audit — Full Strategic Analysis, Free',
    description:
      'Enter your Substack handle. Get a full strategic audit — niche, positioning, content patterns, About page tips, and recent posts reviewed. Free during beta.',
    type: 'website',
    url: 'https://substackr.com/audit',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Substackr — Newsletter Audit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Substack Newsletter Audit — Free Strategic Analysis',
    description: 'Enter your handle. Get a full audit of your niche, positioning, and content. Free, no sign-up.',
    images: ['/og.png'],
  },
}

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
