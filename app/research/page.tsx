'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import SearchForm from '@/components/research/SearchForm'
import LoadingState from '@/components/research/LoadingState'
import ProfileCard from '@/components/research/ProfileCard'
import EssayIdeas from '@/components/research/EssayIdeas'
import { WriterProfile, EssayIdeasResult, ResearchMode } from '@/lib/types'
import { AlertCircle } from 'lucide-react'

type CombinedState = 'idle' | 'researching' | 'generating-ideas' | 'success' | 'error'

function ResearchPageInner() {
  const searchParams = useSearchParams()
  const initialMode: ResearchMode = searchParams.get('mode') === 'self' ? 'self' : 'writer'
  const initialWriter = searchParams.get('writer') || ''
  const initialNiche = searchParams.get('niche') || ''
  const initialUserHandle = searchParams.get('userHandle') || ''

  const [state, setState] = useState<CombinedState>('idle')
  const [profile, setProfile] = useState<WriterProfile | null>(null)
  const [ideas, setIdeas] = useState<EssayIdeasResult | null>(null)
  const [ideasFailed, setIdeasFailed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchedName, setSearchedName] = useState<string>('')
  const [searchedNiche, setSearchedNiche] = useState<string>('')
  const [searchedUserHandle, setSearchedUserHandle] = useState<string>('')
  const [searchedMode, setSearchedMode] = useState<ResearchMode>(initialMode)

  // Auto-start if URL params provided (from homepage form)
  useEffect(() => {
    if (initialWriter && initialMode === 'writer') {
      handleSearch(initialWriter, 'writer', initialNiche || undefined, initialUserHandle || undefined)
    } else if (initialWriter && initialMode === 'self') {
      handleSearch(initialWriter, 'self')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = async (writerName: string, mode: ResearchMode, niche?: string, userHandle?: string) => {
    setState('researching')
    setError(null)
    setProfile(null)
    setIdeas(null)
    setIdeasFailed(false)
    setSearchedName(writerName)
    setSearchedNiche(niche || '')
    setSearchedUserHandle(userHandle || '')
    setSearchedMode(mode)

    try {
      // Phase 1: Research the writer
      const resRes = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ writerName, isSelf: mode === 'self' }),
      })

      const resData = await resRes.json()

      if (!resRes.ok) {
        setError(resData.error || 'Something went wrong. Please try again.')
        setState('error')
        return
      }

      const fetchedProfile: WriterProfile = resData
      setProfile(fetchedProfile)

      // Phase 2: Generate essay ideas (writer mode only)
      if (mode === 'writer') {
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
      }

      setState('success')
    } catch {
      setError('Could not connect. Please check your connection and try again.')
      setState('error')
    }
  }

  const isSelf = searchedMode === 'self'
  const isLoading = state === 'researching' || state === 'generating-ideas'

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Page header */}
        <div className="text-center mb-10">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 mb-3">
            {state === 'success' && isSelf
              ? 'Your Substack Profile'
              : state === 'success' && profile
              ? `5 ideas inspired by ${profile.writerName}`
              : 'Get your essay ideas'}
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {state === 'success'
              ? isSelf
                ? "Here's how your newsletter looks from the outside."
                : searchedNiche
                  ? `Adapted for: ${searchedNiche}`
                  : searchedUserHandle
                    ? `Personalised for your Substack (@${searchedUserHandle})`
                    : 'Inspired by their approach — adapt for your voice.'
              : 'Enter a writer you admire. Get five essay ideas in seconds.'}
          </p>
        </div>

        {/* Search form — always visible */}
        <SearchForm
          onSearch={handleSearch}
          isLoading={isLoading}
          initialMode={initialMode}
          initialNiche={initialNiche}
        />

        {/* Loading state */}
        {isLoading && <LoadingState phase={state === 'generating-ideas' ? 'generating-ideas' : 'researching'} writerName={searchedName} />}

        {/* Error state */}
        {state === 'error' && error && (
          <div className="max-w-3xl mx-auto mt-12 animate-fade-in">
            <div className="bg-white border border-red-100 rounded-2xl p-8 flex gap-4">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  Couldn&apos;t {isSelf ? 'analyse' : 'research'} &quot;{searchedName}&quot;
                </p>
                <p className="text-gray-600 text-sm">{error}</p>
                <button
                  onClick={() => handleSearch(searchedName, searchedMode, searchedNiche || undefined, searchedUserHandle || undefined)}
                  className="mt-3 text-sm text-brand-orange hover:text-brand-orange-dark font-medium transition-colors"
                >
                  Try again →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success state */}
        {state === 'success' && profile && (
          <>
            {/* Essay ideas first (writer mode only) */}
            {!isSelf && ideas && (
              <EssayIdeas ideas={ideas} />
            )}

            {/* Ideas failed gracefully */}
            {!isSelf && ideasFailed && (
              <div className="w-full max-w-3xl mx-auto mt-12 animate-fade-in">
                <div className="bg-white border border-amber-100 rounded-2xl p-6 flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1 text-sm">Couldn&apos;t generate essay ideas</p>
                    <p className="text-gray-600 text-sm">The research profile loaded successfully — essay idea generation hit an error. You can still read the full profile below.</p>
                    <button
                      onClick={() => handleSearch(searchedName, searchedMode, searchedNiche || undefined, searchedUserHandle || undefined)}
                      className="mt-2 text-sm text-brand-orange hover:text-brand-orange-dark font-medium transition-colors"
                    >
                      Try again →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Profile card — collapsed by default in writer mode */}
            <ProfileCard profile={profile} collapsed={!isSelf} />
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
