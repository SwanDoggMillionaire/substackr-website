import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Guides for Substack Writers',
  description:
    'Practical guides on auditing your Substack newsletter, finding essay ideas, growing your audience, and building a writing habit that lasts.',
  keywords: ['substack tips', 'substack guides', 'newsletter writing', 'substack growth', 'essay writing tips'],
  alternates: {
    canonical: 'https://substackr.com/blog',
  },
  openGraph: {
    title: 'Blog — Guides for Substack Writers | Substackr',
    description:
      'Practical guides on auditing your Substack, finding essay ideas, and growing your newsletter.',
    type: 'website',
    url: 'https://substackr.com/blog',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Substackr Blog' }],
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
