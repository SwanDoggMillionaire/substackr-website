'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

interface SearchFormProps {
  onSearch: (name: string) => void
  isLoading: boolean
}

const SUGGESTED = ['Lenny Rachitsky', 'Ben Thompson', 'Anne-Laure Le Cunff']

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim().length >= 2 && !isLoading) {
      onSearch(value.trim())
    }
  }

  const handleSuggestion = (name: string) => {
    setValue(name)
    if (!isLoading) onSearch(name)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-md border border-gray-200 focus-within:border-brand-orange/40 focus-within:shadow-lg transition-all duration-200">
          <div className="flex items-center pl-3 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter a Substack writer's name…"
            className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-base py-2"
            disabled={isLoading}
            autoFocus
          />
          <button
            type="submit"
            disabled={value.trim().length < 2 || isLoading}
            className="bg-brand-orange text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-orange-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm whitespace-nowrap"
          >
            {isLoading ? 'Researching…' : 'Research'}
          </button>
        </div>
      </form>

      {/* Suggested searches */}
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
    </div>
  )
}
