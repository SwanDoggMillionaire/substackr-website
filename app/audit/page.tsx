'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { User, AlertCircle, FileText, Edit, List, ChevronDown, ChevronUp } from 'lucide-react'
import PageTabSwitcher from '@/components/PageTabSwitcher'
import ProfileCard from '@/components/research/ProfileCard'
import LoadingState from '@/components/research/LoadingState'
import { WriterProfile } from '@/lib/types'

// ─── Static example (idle state preview) ─────────────────────────────────────

const EXAMPLE_RESEARCH_PROFILE = `Lenny's Newsletter is one of the most operationally specific publications in the product and growth space. Lenny Rachitsky draws on years of experience at Airbnb to analyse how successful consumer and B2B companies actually grow — not in theory, but in practice, with real numbers and named tactics. The newsletter sits at the intersection of product management and growth strategy, and it has built an unusually loyal paid readership by consistently trading in information that practitioners can act on the same day they read it. What distinguishes it from adjacent publications is the combination of primary research (Lenny conducts original surveys and interviews) with Lenny's own hard-won operational experience, which gives even well-known topics a layer of credibility that is difficult to replicate.`

function AuditIdleExamplePreview() {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-5 border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="text-sm font-medium text-gray-600">See an example result</span>
        <span className="text-gray-400 flex-shrink-0">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-3 bg-white">
          <p className="text-xs text-gray-400 mb-3">Example only — your real results will be based on your actual posts and about page.</p>
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange mb-2">Research Profile</p>
            <p className="text-sm text-gray-700 leading-relaxed">{EXAMPLE_RESEARCH_PROFILE}</p>
            <p className="text-xs text-gray-400 mt-3 italic">Plus 6 more sections in your full audit…</p>
          </div>
        </div>
      )}
    </div>
  )
}

type AnalyseState = 'idle' | 'loading' | 'success' | 'error'

function AnalysePageInner() {
  const searchParams = useSearchParams()
  const initialHandle = searchParams.get('handle') || ''

  const [state, setState] = useState<AnalyseState>('idle')
  const [handle, setHandle] = useState(initialHandle)
  const [profile, setProfile] = useState<WriterProfile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [searchedHandle, setSearchedHandle] = useState('')

  const canSubmit = handle.trim().length >= 2

  const analyse = async (writerName: string) => {
    setState('loading')
    setError(null)
    setProfile(null)
    setSearchedHandle(writerName)

    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ writerName, isSelf: true }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setState('error')
        return
      }

      setProfile(data)
      setState('success')
    } catch {
      setError('Could not connect. Please check your connection and try again.')
      setState('error')
    }
  }

  // Auto-start if handle provided via URL (from homepage form)
  useEffect(() => {
    if (initialHandle) {
      analyse(initialHandle)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || state === 'loading') return
    analyse(handle.trim())
  }

  const isLoading = state === 'loading'

  return (
    <div className="min-h-screen pb-24">

      {/* Full-width page header */}
      <div className="w-full bg-gray-900 border-b border-gray-800 pt-24 pb-10 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange mb-2">Pro — Free in Beta</p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-3">
            Audit Your Substack
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Enter your handle. See your newsletter the way your readers do.
          </p>
        </div>
        <div className="mt-6">
          <PageTabSwitcher active="audit" />
        </div>
      </div>

      <div className="pt-10 max-w-6xl mx-auto px-6">
        <div className="lg:flex lg:gap-10 lg:items-start">

          {/* Left column — sticky input form */}
          <div className="lg:w-80 lg:shrink-0 lg:sticky lg:top-24">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-md border border-gray-200 focus-within:border-brand-orange/40 focus-within:shadow-lg transition-all duration-200">
                <div className="flex items-center pl-3 text-gray-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="Your handle or URL"
                  className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-base py-2 min-w-0"
                  disabled={isLoading}
                  autoFocus={!initialHandle}
                />
                <button
                  type="submit"
                  disabled={!canSubmit || isLoading}
                  className="bg-brand-orange text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-orange-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm whitespace-nowrap"
                >
                  {isLoading ? 'Analysing…' : 'Analyse'}
                </button>
              </div>
            </form>
            <p className="text-center text-sm text-gray-500 mt-3">
              Analysis typically takes 30-60 seconds.
            </p>
            {state === 'idle' && <AuditIdleExamplePreview />}
          </div>

          {/* Right column — results area */}
          <div className="flex-1 min-w-0 mt-6 lg:mt-0">

            {/* Idle preview */}
            {state === 'idle' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden">
                {[
                  { icon: FileText, label: '7-section audit', desc: 'Niche, positioning, audience, content patterns, monetisation, and more' },
                  { icon: Edit, label: 'About page tips', desc: 'Specific suggestions to improve how you introduce your newsletter' },
                  { icon: List, label: 'Recent posts reviewed', desc: 'We fetch your last 12 posts and factor them into the analysis' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="bg-gray-100 py-4 px-5 flex flex-col gap-1.5">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <p className="text-sm font-semibold text-gray-700">{label}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Loading */}
            {isLoading && <LoadingState phase="researching" writerName={searchedHandle} />}

            {/* Error */}
            {state === 'error' && error && (
              <div className="animate-fade-in">
                <div className="bg-white border border-red-100 rounded-2xl p-8 flex gap-4">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Couldn&apos;t analyse &quot;{searchedHandle}&quot;
                    </p>
                    <p className="text-gray-600 text-sm">{error}</p>
                    <button
                      onClick={() => analyse(searchedHandle)}
                      className="mt-3 text-sm text-brand-orange hover:text-brand-orange-dark font-medium transition-colors"
                    >
                      Try again →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Success */}
            {state === 'success' && profile && (
              <>
                <ProfileCard profile={profile} collapsed={false} />
                <div className="text-center mt-12 mb-4">
                  <a
                    href="https://tally.so/r/D4eEg5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    How was this? 30-second feedback →
                  </a>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default function AnalysePage() {
  return (
    <Suspense fallback={null}>
      <AnalysePageInner />
    </Suspense>
  )
}
