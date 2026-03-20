'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import SearchForm from '@/components/research/SearchForm'
import LoadingState from '@/components/research/LoadingState'
import ProfileCard from '@/components/research/ProfileCard'
import EssayIdeas from '@/components/research/EssayIdeas'
import { WriterProfile, EssayIdeasResult } from '@/lib/types'
import { AlertCircle, Lightbulb, Search as SearchIcon, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import PageTabSwitcher from '@/components/PageTabSwitcher'

// ─── Static example data (idle state preview) ────────────────────────────────

const EXAMPLE_IDEAS = [
  {
    title: 'The Metric I Stopped Tracking (And What I Watch Instead)',
    coreTension: 'Vanity metrics feel good but often obscure what is actually driving growth.',
    whyItWorksForThem: "Lenny's best posts name a common practice and then quietly dismantle it. He doesn't lecture — he shows his own dashboard and explains the switch. Readers trust the specificity.",
    howToAdaptForYou: 'Pick one metric you have quietly deprioritised and explain the reasoning. For a solo newsletter, this kind of operational honesty is rare and immediately useful to other writers at the same stage.',
  },
  {
    title: 'What I Got Wrong About My Audience in Year One',
    coreTension: 'The readers you imagine writing for and the readers who actually subscribe are often different people.',
    whyItWorksForThem: "Lenny regularly revisits early assumptions with new evidence. The format — 'I thought X, it turned out Y' — is easy to read and hard to disagree with because it's grounded in real experience rather than advice.",
    howToAdaptForYou: "Look at your last 20 subscribers and describe who actually showed up versus who you assumed would. Name the gap. This is the kind of writing that makes readers feel like you understand their situation, not just your own.",
  },
]

function ExampleIdeaCard({ idea, index, defaultOpen }: { idea: typeof EXAMPLE_IDEAS[0]; index: number; defaultOpen?: boolean }) {
  const [expanded, setExpanded] = useState(defaultOpen ?? false)
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-brand-orange/30 transition-colors">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 flex items-start gap-3"
      >
        <span className="font-display font-bold text-lg text-brand-orange/40 flex-shrink-0 leading-tight mt-0.5">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-gray-900 leading-snug">{idea.title}</p>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{idea.coreTension}</p>
        </div>
        <span className="flex-shrink-0 text-gray-400 mt-1">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100 space-y-3">
          <div className="pt-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Core tension</p>
            <p className="text-sm text-gray-700 leading-relaxed">{idea.coreTension}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Why it works for them</p>
            <p className="text-sm text-gray-700 leading-relaxed">{idea.whyItWorksForThem}</p>
          </div>
          <div className="bg-brand-orange-muted/50 rounded-lg p-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange mb-1">How to adapt for you</p>
            <p className="text-sm text-gray-700 leading-relaxed">{idea.howToAdaptForYou}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function IdleExamplePreview() {
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
        <div className="px-4 pb-4 pt-3 bg-white space-y-2">
          <p className="text-xs text-gray-400 mb-3">Example only — your real results will be tailored to your niche.</p>
          {EXAMPLE_IDEAS.map((idea, i) => (
            <ExampleIdeaCard key={i} idea={idea} index={i} defaultOpen={i === 0} />
          ))}
        </div>
      )}
    </div>
  )
}

type PageState = 'idle' | 'researching' | 'generating-ideas' | 'success' | 'error'

function ResearchPageInner() {
  const searchParams = useSearchParams()
  const initialWriter = searchParams.get('writer') || ''
  const initialNiche = searchParams.get('niche') || ''
  const initialUserHandle = searchParams.get('userHandle') || ''

  const [state, setState] = useState<PageState>('idle')
  const [profile, setProfile] = useState<WriterProfile | null>(null)
  const [ideas, setIdeas] = useState<EssayIdeasResult | null>(null)
  const [ideasFailed, setIdeasFailed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchedName, setSearchedName] = useState('')
  const [searchedNiche, setSearchedNiche] = useState('')
  const [searchedUserHandle, setSearchedUserHandle] = useState('')

  // Auto-start if URL params provided (from homepage form)
  useEffect(() => {
    if (initialWriter) {
      handleSearch(initialWriter, initialNiche || undefined, initialUserHandle || undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = async (writerName: string, niche?: string, userHandle?: string) => {
    setState('researching')
    setError(null)
    setProfile(null)
    setIdeas(null)
    setIdeasFailed(false)
    setSearchedName(writerName)
    setSearchedNiche(niche || '')
    setSearchedUserHandle(userHandle || '')

    try {
      // Phase 1: Research the writer
      const resRes = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ writerName, isSelf: false }),
      })

      const resData = await resRes.json()

      if (!resRes.ok) {
        setError(resData.error || 'Something went wrong. Please try again.')
        setState('error')
        return
      }

      const fetchedProfile: WriterProfile = resData
      setProfile(fetchedProfile)

      // Phase 2: Generate essay ideas
      setState('generating-ideas')

      const ideasRes = await fetch('/api/essay-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: fetchedProfile,
          userNiche: niche?.trim() || undefined,
          userHandle: userHandle?.trim() || undefined,
        }),
      })

      const ideasData = await ideasRes.json()

      if (!ideasRes.ok) {
        setIdeasFailed(true)
      } else {
        setIdeas(ideasData)
      }

      setState('success')
    } catch {
      setError('Could not connect. Please check your connection and try again.')
      setState('error')
    }
  }

  const isLoading = state === 'researching' || state === 'generating-ideas'

  return (
    <div className="min-h-screen pb-24">

      {/* Full-width page header */}
      <div className="w-full bg-orange-50 border-b border-orange-100 pt-24 pb-10 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange mb-2">Free Tool</p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 mb-3">
            Get Essay Ideas
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Pick a writer you admire. Walk away with 5 ideas shaped around your niche.
          </p>
        </div>
        <div className="mt-6">
          <PageTabSwitcher active="essay-ideas" />
        </div>
      </div>

      <div className="pt-10 max-w-6xl mx-auto px-6">
        <div className="lg:flex lg:gap-10 lg:items-start">

          {/* Left column — sticky search form */}
          <div className="lg:w-80 lg:shrink-0 lg:sticky lg:top-24">
            <SearchForm
              onSearch={handleSearch}
              isLoading={isLoading}
              initialNiche={initialNiche}
            />
            {state === 'idle' && <IdleExamplePreview />}
          </div>

          {/* Right column — results area */}
          <div className="flex-1 min-w-0 mt-6 lg:mt-0">

            {/* Idle preview */}
            {state === 'idle' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden">
                {[
                  { icon: Lightbulb, label: '5 essay ideas', desc: 'Inspired by how they write, shaped for your niche' },
                  { icon: SearchIcon, label: 'Writer profile', desc: 'Niche, positioning, content patterns, and the gap they\'re leaving open' },
                  { icon: Sparkles, label: 'Adapted for you', desc: 'Add your handle for ideas built around your actual posts' },
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
            {isLoading && (
              <LoadingState
                phase={state === 'generating-ideas' ? 'generating-ideas' : 'researching'}
                writerName={searchedName}
              />
            )}

            {/* Error */}
            {state === 'error' && error && (
              <div className="animate-fade-in">
                <div className="bg-white border border-red-100 rounded-2xl p-8 flex gap-4">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Couldn&apos;t research &quot;{searchedName}&quot;
                    </p>
                    <p className="text-gray-600 text-sm">{error}</p>
                    <button
                      onClick={() => handleSearch(searchedName, searchedNiche || undefined, searchedUserHandle || undefined)}
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
                {ideas && <EssayIdeas ideas={ideas} />}

                {ideasFailed && (
                  <div className="animate-fade-in">
                    <div className="bg-white border border-amber-100 rounded-2xl p-6 flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1 text-sm">Couldn&apos;t generate essay ideas</p>
                        <p className="text-gray-600 text-sm">The research profile loaded successfully - essay idea generation hit an error.</p>
                        <button
                          onClick={() => handleSearch(searchedName, searchedNiche || undefined, searchedUserHandle || undefined)}
                          className="mt-2 text-sm text-brand-orange hover:text-brand-orange-dark font-medium transition-colors"
                        >
                          Try again →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <ProfileCard profile={profile} toplineOnly={true} />

                {/* Cross-sell to audit */}
                <div className="mt-8 bg-orange-50 border border-orange-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Want to see how your own newsletter stacks up? Run a free audit - no sign-up needed.
                  </p>
                  <a
                    href="/audit"
                    className="flex-shrink-0 text-sm font-semibold text-brand-orange border border-brand-orange rounded-lg px-4 py-2 hover:bg-brand-orange hover:text-white transition-colors"
                  >
                    Audit my newsletter →
                  </a>
                </div>

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

export default function ResearchPage() {
  return (
    <Suspense fallback={null}>
      <ResearchPageInner />
    </Suspense>
  )
}
