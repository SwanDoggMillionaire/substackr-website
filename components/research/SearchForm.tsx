'use client'

import { useState } from 'react'
import { Search, User } from 'lucide-react'
import { ResearchMode } from '@/lib/types'

interface SearchFormProps {
  onSearch: (name: string, mode: ResearchMode) => void
  isLoading: boolean
  initialMode?: ResearchMode
}

const SUGGESTED = ['Lenny Rachitsky', 'Ben Thompson', 'Anne-Laure Le Cunff']

export default function SearchForm({ onSearch, isLoading, initialMode = 'writer' }: SearchFormProps) {
  const [value, setValue] = useState('')
  const [mode, setMode] = useState<ResearchMode>(initialMode)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim().length >= 2 && !isLoading) {
      onSearch(value.trim(), mode)
    }
  }

  const handleSuggestion = (name: string) => {
    setValue(name)
    if (!isLoading) onSearch(name, mode)
  }

  const isSelf = mode === 'self'

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
          Research a writer
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
          Analyse yourself
        </button>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-md border border-gray-200 focus-within:border-brand-orange/40 focus-within:shadow-lg transition-all duration-200">
          <div className="flex items-center pl-3 text-gray-400">
            {isSelf ? <User className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={
              isSelf
                ? 'Enter your Substack name or URL…'
                : 'Enter a Substack writer\'s name…'
            }
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-base py-2"
            disabled={isLoading}
            autoFocus
          />
          <button
            type="submit"
            disabled={value.trim().length < 2 || isLoading}
            className="bg-brand-orange text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-orange-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm whitespace-nowrap"
          >
            {isLoading ? 'Analysing…' : isSelf ? 'Analyse' : 'Research'}
          </button>
        </div>
      </form>

      {/* Context copy */}
      {isSelf ? (
        <p className="text-center text-sm text-gray-500 mt-3">
          Get an honest, structured view of how your newsletter looks from the outside.
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
