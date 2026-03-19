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
    if (writer.trim().length < 2) return
    const params = new URLSearchParams({ writer: writer.trim() })
    if (niche.trim()) params.set('niche', niche.trim())
    router.push(`/research?${params.toString()}`)
  }

  const handleAnalyseSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (analyseHandle.trim().length < 2) return
    router.push(`/analyse?handle=${encodeURIComponent(analyseHandle.trim())}`)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-surface to-brand-orange-muted/30 pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-80 h-80 rounded-full bg-brand-orange/4 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-orange-muted border border-brand-orange/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-sm font-medium text-brand-orange-dark">Free to use - no sign-up required</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-gray-900 leading-tight tracking-tight mb-6">
          Your next essay is
          <br />
          <span className="text-brand-orange">already out there.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Choose a writer you admire. Receive ideas inspired by how they think, adapted for your newsletter.
        </p>

        {/* Two product cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left items-stretch">

          {/* Card 1: Essay ideas - free */}
          <div className="bg-white rounded-2xl shadow-lg ring-1 ring-brand-orange/20 border border-gray-200 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">Get essay ideas</p>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">Free</span>
            </div>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Pick a Substack writer you admire. Get five essay ideas inspired by their approach - adapted for your newsletter, not a copy of theirs.
            </p>
            <form onSubmit={handleIdeasSubmit} className="flex-1 flex flex-col">
              <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
                <div className="flex items-center px-3 py-2.5 border-b border-gray-100">
                  <Search className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2.5" />
                  <input
                    type="text"
                    value={writer}
                    onChange={(e) => setWriter(e.target.value)}
                    placeholder="Writer you admire - e.g. lenny.substack.com"
                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm"
                    autoFocus
                  />
                </div>
                <div className="flex items-center px-3 py-2.5">
                  <span className="text-gray-300 flex-shrink-0 mr-2.5 text-base leading-none">✦</span>
                  <input
                    type="text"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="Your niche (optional) - e.g. mindfulness for parents"
                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-auto w-full bg-brand-orange text-white font-semibold py-2.5 rounded-xl hover:bg-brand-orange-dark transition-colors text-sm"
              >
                Get my ideas →
              </button>
            </form>
            <div className="md:hidden mt-3 text-center">
              <a href="/analyse" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Or analyse your own Substack →
              </a>
            </div>
          </div>

          {/* Card 2: Analyse your Substack - Pro */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">Analyse your Substack</p>
              <span className="text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-2.5 py-0.5">Free during beta</span>
            </div>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Enter your handle. We&apos;ll fetch your actual posts and about page, then give you a structured view of what&apos;s working, what isn&apos;t, and where you&apos;re leaving readers behind.
            </p>
            <form onSubmit={handleAnalyseSubmit} className="flex-1 flex flex-col">
              <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
                <div className="flex items-center px-3 py-2.5">
                  <User className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2.5" />
                  <input
                    type="text"
                    value={analyseHandle}
                    onChange={(e) => setAnalyseHandle(e.target.value)}
                    placeholder="Your Substack handle or URL - e.g. stonedape.substack.com"
                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-3 text-center leading-relaxed">
                We fetch your actual posts and about page - not a guess.
              </p>
              <button
                type="submit"
                className="mt-auto w-full bg-teal-600 text-white font-semibold py-2.5 rounded-xl hover:bg-teal-700 transition-colors text-sm"
              >
                Analyse my Substack →
              </button>
            </form>
          </div>

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
