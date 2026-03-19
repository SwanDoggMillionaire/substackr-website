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
  title: 'Substackr - Turn the writers you admire into essay ideas',
  description:
    'Enter a writer you admire and your newsletter niche. Get 5 essay ideas - inspired by their approach, adapted for your voice. Free, no sign-up required.',
  openGraph: {
    title: 'Substackr - Turn the writers you admire into essay ideas',
    description:
      'Enter a writer you admire and your newsletter niche. Get 5 essay ideas - inspired by their approach, adapted for your voice. Free, no sign-up required.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="antialiased font-sans bg-surface text-foreground min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
