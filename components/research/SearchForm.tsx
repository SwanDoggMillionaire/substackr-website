'use client'

import { useState } from 'react'
import { Search, User } from 'lucide-react'
import { ResearchMode } from '@/lib/types'

interface SearchFormProps {
  onSearch: (name: string, mode: ResearchMode, niche?: string, userHandle?: string) => void
  isLoading: boolean
  initialMode?: ResearchMode
  initialNiche?: string
}

const SUGGESTED = ['Lenny Rachitsky', 'Ben Thompson', 'Anne-Laure Le Cunff']

export default function SearchForm({ onSearch, isLoading, initialMode = 'writer', initialNiche = '' }: SearchFormProps) {
  const [value, setValue] = useState('')
  const [niche, setNiche] = useState(initialNiche)
  const [userHandle, setUserHandle] = useState('')
  const [mode, setMode] = useState<ResearchMode>(initialMode)

  const isSelf = mode === 'self'

  // Writer field always required. Niche and userHandle are optional.
  const canSubmit = value.trim().length >= 2

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (canSubmit && !isLoading) {
      onSearch(
        value.trim(),
        mode,
        isSelf ? undefined : (niche.trim() || undefined),
        isSelf ? undefined : (userHandle.trim() || undefined)
      )
    }
  }

  const handleSuggestion = (name: string) => {
    setValue(name)
    if (!isLoading) {
      onSearch(
        name,
        mode,
        niche.trim() || undefined,
        userHandle.trim() || undefined
      )
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Mode toggle */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-4 w-fit mx-auto">
        <button
          onClick={() => setMode('writer')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === 'writer'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          Get essay ideas
        </button>
        <button
          onClick={() => setMode('self')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === 'self'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          Analyse your Substack
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {isSelf ? (
          /* Self mode — single field */
          <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-md border border-gray-200 focus-within:border-brand-orange/40 focus-within:shadow-lg transition-all duration-200">
            <div className="flex items-center pl-3 text-gray-400">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Your Substack handle or URL — e.g. stonedape or stonedape.substack.com"
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-base py-2"
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              disabled={!canSubmit || isLoading}
              className="bg-brand-orange text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-orange-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm whitespace-nowrap"
            >
              {isLoading ? 'Analysing…' : 'Analyse'}
            </button>
          </div>
        ) : (
          /* Writer mode — three stacked fields, niche + handle optional */
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 focus-within:border-brand-orange/40 focus-within:shadow-lg transition-all duration-200 overflow-hidden">
            {/* Writer field — required */}
            <div className="flex items-center px-4 py-3 border-b border-gray-100">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0 mr-3" />
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Writer's name or handle — e.g. Lenny Rachitsky or lenny.substack.com"
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm py-1"
                disabled={isLoading}
                autoFocus
              />
            </div>
            {/* Niche — optional */}
            <div className="flex items-center px-4 py-3 border-b border-gray-100">
              <span className="text-gray-300 flex-shrink-0 mr-3 text-lg leading-none">✦</span>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Your newsletter niche (optional) — e.g. mindfulness for busy parents"
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm py-1"
                disabled={isLoading}
              />
            </div>
            {/* User handle — optional, for personalised ideas */}
            <div className="flex items-center px-4 py-3">
              <User className="w-4 h-4 text-gray-300 flex-shrink-0 mr-3" />
              <input
                type="text"
                value={userHandle}
                onChange={(e) => setUserHandle(e.target.value)}
                placeholder="Your Substack handle (optional) — for personalised ideas"
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm py-1"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!canSubmit || isLoading}
                className="ml-3 bg-brand-orange text-white font-semibold px-5 py-2 rounded-xl hover:bg-brand-orange-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm whitespace-nowrap flex-shrink-0"
              >
                {isLoading ? 'Working…' : 'Get ideas →'}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Context copy / suggestions */}
      {isSelf ? (
        <p className="text-center text-sm text-gray-500 mt-3">
          We&apos;ll fetch your actual posts and about page for an accurate analysis — not a guess.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          <span className="text-sm text-gray-400">Try:</span>
          {SUGGESTED.map((name) => (
            <button
              key={name}
              onClick={() => handleSuggestion(name)}
              disabled={isLoading}
              className="text-sm text-gray-600 hover:text-brand-orange border border-gray-200 hover:border-brand-orange/30 rounded-full px-3 py-1 transition-colors disabled:opacity-40"
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
