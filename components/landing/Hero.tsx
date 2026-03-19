'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

const SUGGESTED = ['Lenny Rachitsky', 'Ben Thompson', 'Anne-Laure Le Cunff']

export default function Hero() {
  const router = useRouter()
  const [writer, setWriter] = useState('')
  const [niche, setNiche] = useState('')

  const canSubmit = writer.trim().length >= 2 && niche.trim().length >= 3

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    router.push(`/research?writer=${encodeURIComponent(writer.trim())}&niche=${encodeURIComponent(niche.trim())}`)
  }

  const handleSuggestion = (name: string) => {
    setWriter(name)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-surface to-brand-orange-muted/30 pointer-events-none" />
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-80 h-80 rounded-full bg-brand-orange/4 blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-orange-muted border border-brand-orange/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-sm font-medium text-brand-orange-dark">Free to use — no sign-up required</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-gray-900 leading-tight tracking-tight mb-6">
          Stop staring at
          <br />
          <span className="text-brand-orange">a blank page.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Enter a writer you admire and your newsletter niche. Get five essay ideas — inspired by their approach, adapted for your voice.
        </p>

        {/* Two-input form */}
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 focus-within:border-brand-orange/40 focus-within:shadow-xl transition-all duration-200 overflow-hidden">
            {/* Writer field */}
            <div className="flex items-center px-4 py-3 border-b border-gray-100">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0 mr-3" />
              <input
                type="text"
                value={writer}
                onChange={(e) => setWriter(e.target.value)}
                placeholder="Writer you admire — e.g. Lenny Rachitsky"
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm"
                autoFocus
              />
            </div>
            {/* Niche field + submit */}
            <div className="flex items-center px-4 py-3">
              <span className="text-gray-300 flex-shrink-0 mr-3 text-lg leading-none">✦</span>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Your newsletter is about… e.g. mindfulness for busy parents"
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm"
              />
              <button
                type="submit"
                disabled={!canSubmit}
                className="ml-3 bg-brand-orange text-white font-semibold px-5 py-2 rounded-xl hover:bg-brand-orange-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm whitespace-nowrap flex-shrink-0"
              >
                Get my ideas →
              </button>
            </div>
          </div>
        </form>

        {/* Suggested writers */}
        <div className="flex flex-wrap gap-2 mt-5 justify-center">
          <span className="text-sm text-gray-400">Try:</span>
          {SUGGESTED.map((name) => (
            <button
              key={name}
              onClick={() => handleSuggestion(name)}
              className="text-sm text-gray-600 hover:text-brand-orange border border-gray-200 hover:border-brand-orange/30 rounded-full px-3 py-1 transition-colors"
            >
              {name}
            </button>
          ))}
        </div>

        {/* Secondary link */}
        <a
          href="#example"
          className="inline-flex items-center gap-1.5 text-gray-500 text-sm font-medium mt-8 hover:text-gray-700 transition-colors"
        >
          See an example output <span>↓</span>
        </a>
      </div>
    </section>
  )
}
