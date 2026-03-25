'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, User } from 'lucide-react'

export default function Hero() {
  const router = useRouter()

  const [writer, setWriter] = useState('')
  const [niche, setNiche] = useState('')
  const [analyseHandle, setAnalyseHandle] = useState('')

  const handleIdeasSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (niche.trim().length < 2) return
    const params = new URLSearchParams({ niche: niche.trim() })
    if (writer.trim()) params.set('writer', writer.trim())
    router.push(`/essay-ideas?${params.toString()}`)
  }

  const handleAnalyseSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (analyseHandle.trim().length < 2) return
    router.push(`/audit?handle=${encodeURIComponent(analyseHandle.trim())}`)
  }

  return (
    <section className="relative overflow-hidden pt-24 pb-10">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-surface to-brand-orange-muted/30 pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-80 h-80 rounded-full bg-brand-orange/4 blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-orange-muted border border-brand-orange/20 rounded-full px-4 py-1.5 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-sm font-medium text-brand-orange-dark">Free to use - no sign-up required</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-[2.1rem] sm:text-5xl lg:text-6xl text-gray-900 leading-tight tracking-tight mb-4">
          Your next essay is
          <br />
          <span className="text-brand-orange">already out there.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-gray-600 mx-auto mb-6 leading-relaxed">
          Research writers you admire. Audit your own newsletter.
        </p>

        {/* Stacked product cards */}
        <div className="flex flex-col gap-5 text-left">

          {/* Card 1: Essay ideas - free */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">Get essay ideas</p>
              <span className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-3 py-1">Free</span>
            </div>
            <form onSubmit={handleIdeasSubmit} className="flex flex-col">
              <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
                <div className="flex items-center px-3 py-2.5 border-b border-gray-100">
                  <span className="text-gray-300 flex-shrink-0 mr-2.5 text-base leading-none">✦</span>
                  <input
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="Your niche or topic"
                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm"
                  />
                </div>
                <div className="flex items-center px-3 py-2.5">
                  <Search className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2.5" />
                  <input
                    type="text"
                    value={writer}
                    onChange={(e) => setWriter(e.target.value)}
                    placeholder="Writer you admire (optional)"
                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-brand-orange text-white font-semibold py-2.5 rounded-xl hover:bg-brand-orange-dark transition-colors text-sm"
              >
                Get my ideas →
              </button>
            </form>
          </div>

          {/* Card 2: Analyse your Substack - Pro */}
          <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-800 p-8 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-white">Audit your Substack</p>
              <span className="text-xs font-medium text-white bg-white/10 rounded-full px-3 py-1">Free during beta</span>
            </div>
            <form onSubmit={handleAnalyseSubmit} className="flex flex-col">
              <div className="border border-gray-200 bg-white rounded-xl overflow-hidden mb-3">
                <div className="flex items-center px-3 py-2.5">
                  <User className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2.5" />
                  <input
                    type="text"
                    value={analyseHandle}
                    onChange={(e) => setAnalyseHandle(e.target.value)}
                    placeholder="Your Substack handle or URL"
                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-white text-gray-900 font-semibold py-2.5 rounded-xl hover:bg-gray-100 transition-colors text-sm"
              >
                Audit my Substack →
              </button>
            </form>
          </div>

        </div>

        {/* Secondary link */}
        <a
          href="#example"
          className="inline-flex items-center gap-1.5 text-gray-500 text-sm font-medium mt-6 hover:text-gray-700 transition-colors"
        >
          See an example output <span>↓</span>
        </a>
      </div>
    </section>
  )
}
