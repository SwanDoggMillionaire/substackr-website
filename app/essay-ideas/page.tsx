'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import SearchForm from '@/components/research/SearchForm'
import LoadingState from '@/components/research/LoadingState'
import ProfileCard from '@/components/research/ProfileCard'
import EssayIdeas from '@/components/research/EssayIdeas'
import { WriterProfile, EssayIdeasResult } from '@/lib/types'
import { AlertCircle, Lightbulb, Search as SearchIcon, Sparkles } from 'lucide-react'

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
      </div>

      <div className="pt-10 max-w-6xl mx-auto px-6">

        {/* Search form */}
        <SearchForm
          onSearch={handleSearch}
          isLoading={isLoading}
          initialNiche={initialNiche}
        />

        {/* Idle preview row */}
        {state === 'idle' && (
          <div className="w-full max-w-2xl mx-auto mt-4">
            <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden">
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
          <div className="max-w-3xl mx-auto mt-12 animate-fade-in">
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
            {/* Essay ideas */}
            {ideas && <EssayIdeas ideas={ideas} />}

            {/* Ideas failed gracefully */}
            {ideasFailed && (
              <div className="w-full max-w-3xl mx-auto mt-12 animate-fade-in">
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

            {/* Profile card - topline only (free tier) */}
            <ProfileCard profile={profile} toplineOnly={true} />

            {/* Feedback */}
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
  )
}

export default function ResearchPage() {
  return (
    <Suspense fallback={null}>
      <ResearchPageInner />
    </Suspense>
  )
}
