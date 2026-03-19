'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { User, AlertCircle } from 'lucide-react'
import ProfileCard from '@/components/research/ProfileCard'
import LoadingState from '@/components/research/LoadingState'
import { WriterProfile } from '@/lib/types'

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
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Page header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 mb-2">
            <span className="text-xs font-medium text-amber-700">Pro feature — free during beta</span>
          </div>
          {state !== 'success' && (
            <p className="text-xs text-gray-400 mb-4">No card required. No account needed. Just your handle.</p>
          )}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 mb-3">
            {state === 'success' ? 'Your Substack Profile' : 'See your newsletter the way your readers do.'}
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {state === 'success'
              ? "Here's how your newsletter looks from the outside."
              : 'We fetch your actual posts and about page — not a guess. You get a structured view of your positioning, what content lands, and where you\'re leaving readers cold.'}
          </p>
        </div>

        {/* Input form */}
        <div className="w-full max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-md border border-gray-200 focus-within:border-brand-orange/40 focus-within:shadow-lg transition-all duration-200">
              <div className="flex items-center pl-3 text-gray-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="Your Substack handle or URL — e.g. stonedape or stonedape.substack.com"
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-base py-2"
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
            Analysis typically takes 15–20 seconds.
          </p>
        </div>

        {/* Loading */}
        {isLoading && <LoadingState phase="researching" writerName={searchedHandle} />}

        {/* Error */}
        {state === 'error' && error && (
          <div className="max-w-3xl mx-auto mt-12 animate-fade-in">
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
          <ProfileCard profile={profile} collapsed={false} />
        )}
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
