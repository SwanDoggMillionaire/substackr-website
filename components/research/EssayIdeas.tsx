'use client'

import { useState } from 'react'
import { WriterProfile, EssayIdeasResult, EssayIdeasState } from '@/lib/types'
import { Lightbulb, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'

interface EssayIdeasProps {
  profile: WriterProfile
}

function IdeaCard({ idea, index }: { idea: EssayIdeasResult['ideas'][0]; index: number }) {
  const [expanded, setExpanded] = useState(false)

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

export default function EssayIdeas({ profile }: EssayIdeasProps) {
  const [state, setState] = useState<EssayIdeasState>('idle')
  const [userNiche, setUserNiche] = useState('')
  const [result, setResult] = useState<EssayIdeasResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (userNiche.trim().length < 3 || state === 'loading') return

    setState('loading')
    setError(null)

    try {
      const res = await fetch('/api/essay-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, userNiche: userNiche.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        setState('error')
        return
      }

      setResult(data)
      setState('success')
    } catch {
      setError('Could not connect. Please try again.')
      setState('error')
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-orange-muted flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-4 h-4 text-brand-orange" />
          </div>
          <div>
            <p className="font-display font-semibold text-gray-900 text-sm">
              Essay Ideas inspired by {profile.writerName}
            </p>
            <p className="text-xs text-gray-500">Adapted for your newsletter</p>
          </div>
        </div>

        {/* Input or results */}
        {state === 'idle' || state === 'error' ? (
          <div className="px-8 py-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What is your Substack newsletter about?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={userNiche}
                onChange={(e) => setUserNiche(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="e.g. AI tools for solo founders, personal finance for millennials"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-brand-orange/40 focus:ring-2 focus:ring-brand-orange/10"
              />
              <button
                onClick={handleGenerate}
                disabled={userNiche.trim().length < 3}
                className="bg-brand-orange text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-orange-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm whitespace-nowrap"
              >
                Generate
              </button>
            </div>
            {state === 'error' && error && (
              <p className="text-sm text-red-500 mt-2">{error}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              Claude will generate 5 essay ideas inspired by {profile.writerName}&apos;s approach, adapted to your niche.
            </p>
          </div>
        ) : state === 'loading' ? (
          <div className="px-8 py-10 flex flex-col items-center gap-3 text-center">
            <Loader2 className="w-6 h-6 text-brand-orange animate-spin" />
            <p className="text-sm text-gray-600 font-medium">Generating essay ideas…</p>
            <p className="text-xs text-gray-400">Analysing {profile.writerName}&apos;s approach and adapting it for your newsletter</p>
          </div>
        ) : (
          <div className="px-8 py-6">
            <p className="text-xs text-gray-500 mb-4">
              Based on {profile.writerName}&apos;s approach · Your niche: <span className="font-medium text-gray-700">{result?.userNiche}</span>
            </p>
            <div className="space-y-2">
              {result?.ideas.map((idea, i) => (
                <IdeaCard key={i} idea={idea} index={i} />
              ))}
            </div>
            <button
              onClick={() => setState('idle')}
              className="mt-4 text-sm text-brand-orange hover:text-brand-orange-dark font-medium transition-colors"
            >
              ← Regenerate with different niche
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
