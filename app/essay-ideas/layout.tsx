import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Substack Essay Ideas — AI-Powered by Writers You Admire',
  description:
    'Pick a Substack writer you admire, enter your niche, and get 5 AI-generated essay ideas shaped around your newsletter. Free, no sign-up required.',
  keywords: [
    'substack essay ideas',
    'newsletter content ideas',
    'what to write on substack',
    'substack writing ideas',
    'essay ideas generator',
    'substack content ideas',
  ],
  alternates: {
    canonical: 'https://substackr.com/essay-ideas',
  },
  openGraph: {
    title: 'Get Substack Essay Ideas — AI-Powered by Writers You Admire',
    description:
      'Enter a writer you admire and your niche. Get 5 essay ideas tailored to your newsletter — free, no sign-up.',
    type: 'website',
    url: 'https://substackr.com/essay-ideas',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Substackr — Essay Ideas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Substack Essay Ideas — AI-Powered',
    description: 'Enter a writer you admire. Get 5 essay ideas for your newsletter. Free, no sign-up.',
    images: ['/og.png'],
  },
}

export default function EssayIdeasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
