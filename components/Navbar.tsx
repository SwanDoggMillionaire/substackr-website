'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const showWhiteBg = !isHome || scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showWhiteBg
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="Substackr" width={180} height={40} />
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/#how-it-works"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block"
          >
            How it works
          </Link>
          <Link
            href="/audit"
            className="text-sm font-semibold bg-white border border-gray-300 text-gray-800 px-3 sm:px-4 py-2 rounded-full hover:border-gray-400 transition-colors flex items-center"
          >
            <span className="sm:hidden">Audit →</span>
            <span className="hidden sm:inline">Audit your Substack</span>
          </Link>
          <Link
            href="/essay-ideas"
            className="text-sm font-semibold bg-brand-orange text-white px-3 sm:px-4 py-2 rounded-full hover:bg-brand-orange-dark transition-colors"
          >
            Get ideas →
          </Link>
        </nav>
      </div>
    </header>
  )
}
