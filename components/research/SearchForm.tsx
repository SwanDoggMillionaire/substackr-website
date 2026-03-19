'use client'

import { useState } from 'react'
import { Search, User } from 'lucide-react'

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
  const [value, setValue] = useState('')
  const [niche, setNiche] = useState(initialNiche)
  const [userHandle, setUserHandle] = useState('')
  const [suggested] = useState(() => pickRandom(WRITER_POOL, 3))

  const canSubmit = value.trim().length >= 2

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (canSubmit && !isLoading) {
      onSearch(
        value.trim(),
        niche.trim() || undefined,
        userHandle.trim() || undefined,
      )
    }
  }

  const handleSuggestion = (name: string) => {
    setValue(name)
    if (!isLoading) {
      onSearch(name, niche.trim() || undefined, userHandle.trim() || undefined)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
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
          <div className="flex items-start px-4 py-3 border-b border-gray-100">
            <span className="text-gray-300 flex-shrink-0 mr-3 text-lg leading-none mt-1">✦</span>
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Your newsletter niche (optional) — e.g. mindfulness for busy parents"
                className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm py-1"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-400 mt-0.5">Helps us shape the ideas around your angle, not theirs</p>
            </div>
          </div>
          {/* User handle — optional, for personalised ideas */}
          <div className="flex items-start px-4 py-3">
            <User className="w-4 h-4 text-gray-300 flex-shrink-0 mr-3 mt-1.5" />
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={userHandle}
                onChange={(e) => setUserHandle(e.target.value)}
                placeholder="Your Substack handle (optional) — e.g. yourname.substack.com"
                className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-sm py-1"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-400 mt-0.5">We&apos;ll pull in your real posts so the ideas fit your newsletter, not a stranger&apos;s</p>
            </div>
            <button
              type="submit"
              disabled={!canSubmit || isLoading}
              className="ml-3 bg-brand-orange text-white font-semibold px-5 py-2 rounded-xl hover:bg-brand-orange-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm whitespace-nowrap flex-shrink-0"
            >
              {isLoading ? 'Working…' : 'Get ideas →'}
            </button>
          </div>
        </div>
      </form>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        <span className="text-sm text-gray-400">Try:</span>
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
