'use client'

import { useState } from 'react'
import SearchForm from '@/components/research/SearchForm'
import LoadingState from '@/components/research/LoadingState'
import ProfileCard from '@/components/research/ProfileCard'
import { WriterProfile, ResearchState } from '@/lib/types'
import { AlertCircle } from 'lucide-react'

export default function ResearchPage() {
  const [state, setState] = useState<ResearchState>('idle')
  const [profile, setProfile] = useState<WriterProfile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [searchedName, setSearchedName] = useState<string>('')

  const handleSearch = async (writerName: string) => {
    setState('loading')
    setError(null)
    setProfile(null)
    setSearchedName(writerName)

    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ writerName }),
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

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Page header */}
        <div className="text-center mb-10">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 mb-3">
            Research any Substack writer
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Enter a writer&apos;s name and get a full strategic profile in seconds.
          </p>
        </div>

        {/* Search form */}
        <SearchForm onSearch={handleSearch} isLoading={state === 'loading'} />

        {/* Results area */}
        {state === 'loading' && <LoadingState />}

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
                  onClick={() => handleSearch(searchedName)}
                  className="mt-3 text-sm text-brand-orange hover:text-brand-orange-dark font-medium transition-colors"
                >
                  Try again →
                </button>
              </div>
            </div>
          </div>
        )}

        {state === 'success' && profile && (
          <ProfileCard profile={profile} />
        )}
      </div>
    </div>
  )
}
