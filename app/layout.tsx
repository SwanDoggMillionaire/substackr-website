import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://substackr.com'),
  title: {
    default: 'Substackr — Free Essay Ideas & Newsletter Audit for Substack Writers',
    template: '%s | Substackr',
  },
  description:
    'Get AI-powered essay ideas inspired by top Substack writers. Audit your own newsletter with a full strategic analysis — niche, positioning, content patterns. Free, no sign-up.',
  keywords: [
    'substack essay ideas',
    'substack audit',
    'newsletter audit tool',
    'substack writer research',
    'newsletter content ideas',
    'substack content strategy',
    'essay ideas generator',
    'substack newsletter tips',
    'free substack tools',
  ],
  authors: [{ name: 'Substackr' }],
  creator: 'Substackr',
  openGraph: {
    title: 'Substackr — Free Essay Ideas & Newsletter Audit for Substack Writers',
    description:
      'Get AI-powered essay ideas inspired by top Substack writers. Audit your own newsletter with a full strategic analysis. Free, no sign-up.',
    type: 'website',
    url: 'https://substackr.com',
    siteName: 'Substackr',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Substackr — Essay Ideas & Newsletter Audit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Substackr — Free Essay Ideas & Newsletter Audit',
    description:
      'AI-powered essay ideas inspired by writers you admire. Full newsletter audit with live data. Free, no sign-up.',
    images: ['/og.png'],
  },
  alternates: {
    canonical: 'https://substackr.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://substackr.com/#organization',
      name: 'Substackr',
      url: 'https://substackr.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://substackr.com/logo.png',
      },
      description: 'AI-powered tools for Substack writers — essay ideas and newsletter audits.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://substackr.com/#website',
      url: 'https://substackr.com',
      name: 'Substackr',
      publisher: { '@id': 'https://substackr.com/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://substackr.com/essay-ideas?niche={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://substackr.com/#webapplication',
      name: 'Substackr',
      url: 'https://substackr.com',
      description:
        'Get AI-powered essay ideas inspired by top Substack writers. Audit your own newsletter with a full strategic analysis — niche, positioning, content patterns, and About page tips.',
      applicationCategory: 'WritingApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: 'Free — no sign-up required',
      },
      featureList: [
        'AI essay ideas inspired by top Substack writers',
        'Full newsletter audit with live Substack data',
        'Niche and positioning analysis',
        'About page improvement tips',
        'Content pattern analysis',
        'Strategic summary with actionable insights',
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans bg-surface text-foreground min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
