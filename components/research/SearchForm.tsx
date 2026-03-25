'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

interface SearchFormProps {
  onSearch: (name: string, niche?: string, userHandle?: string) => void
  isLoading: boolean
  initialNiche?: string
}

const WRITER_POOL = [
  'Lenny Rachitsky', 'Ben Thompson', 'Anne-Laure Le Cunff',
  'Heather Cox Richardson', 'Gergely Orosz', 'Packy McCormick',
  'Noah Smith', 'Byrne Hobart', 'Mario Gabriele',
  'Kyla Scanlon', 'Ted Gioia', 'Nick Maggiulli',
  'Freddie deBoer', 'Polina Pompliano', 'Casey Newton',
  'Nikhil Krishnan', 'Lyn Alden', 'Molly White',
  'Li Jin', 'Tomas Pueyo', 'Andrew Sullivan',
  'Gary Marcus', 'Simon Owens', 'Chartr',
  'Alex Danco', 'Trung Phan', 'Emily Oster',
  'Matt Levine', 'Kelsey Piper', 'Ramp Capital',
]

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

export default function SearchForm({ onSearch, isLoading, initialNiche = '' }: SearchFormProps) {
  const [writerName, setWriterName] = useState('')
  const [niche, setNiche] = useState(initialNiche)
  const [suggested] = useState(() => pickRandom(WRITER_POOL, 3))

  // Niche is now the primary required field; writer is optional
  const canSubmit = niche.trim().length >= 2

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (canSubmit && !isLoading) {
      onSearch(writerName.trim(), niche.trim() || undefined)
    }
  }

  const handleSuggestion = (name: string) => {
    setWriterName(name)
    if (!isLoading) {
      onSearch(name, niche.trim() || undefined)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 focus-within:border-brand-orange/40 focus-within:shadow-lg transition-all duration-200 overflow-hidden">
          {/* Niche field - primary, required */}
          <div className="flex items-start px-4 py-3 border-b border-gray-100">
            <span className="text-gray-300 flex-shrink-0 mr-3 text-lg leading-none mt-1">✦</span>
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Your niche or topic"
                className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm py-1"
                disabled={isLoading}
              />
            </div>
          </div>
          {/* Writer field - optional */}
          <div className="flex items-start px-4 py-3">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0 mr-3 mt-1.5" />
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={writerName}
                onChange={(e) => setWriterName(e.target.value)}
                placeholder="A writer you admire (optional)"
                className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm py-1"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={!canSubmit || isLoading}
              className="ml-3 bg-brand-orange text-white font-semibold px-5 py-2 rounded-xl hover:bg-brand-orange-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm whitespace-nowrap flex-shrink-0 self-start mt-0.5"
            >
              {isLoading ? 'Working…' : 'Generate ideas →'}
            </button>
          </div>
        </div>
      </form>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        <span className="text-sm text-gray-500">Not sure who to try? These produce great results:</span>
        {suggested.map((name) => (
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
    </div>
  )
}
