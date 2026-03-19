'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-display font-bold text-xl text-gray-900 group-hover:text-brand-orange transition-colors">
            Substackr
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/#how-it-works"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block"
          >
            How it works
          </Link>
          <Link
            href="/research?mode=self"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block"
          >
            Analyse your Substack
          </Link>
          <Link
            href="/research"
            className="text-sm font-semibold bg-brand-orange text-white px-4 py-2 rounded-full hover:bg-brand-orange-dark transition-colors"
          >
            Get ideas
          </Link>
        </nav>
      </div>
    </header>
  )
}
