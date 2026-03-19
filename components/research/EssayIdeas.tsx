'use client'

import { useState } from 'react'
import { EssayIdeasResult } from '@/lib/types'
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react'

interface EssayIdeasProps {
  ideas: EssayIdeasResult
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

export default function EssayIdeas({ ideas }: EssayIdeasProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-12 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-md card-orange-top overflow-hidden">
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-orange-muted flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-4 h-4 text-brand-orange" />
          </div>
          <div>
            <p className="font-display font-semibold text-gray-900 text-sm">
              Your 5 essay ideas
            </p>
            <p className="text-xs text-gray-500">
              Inspired by {ideas.writerName} · Your niche: <span className="font-medium text-gray-700">{ideas.userNiche}</span>
            </p>
          </div>
        </div>

        {/* Ideas */}
        <div className="px-8 py-6 space-y-2">
          {ideas.ideas.map((idea, i) => (
            <IdeaCard key={i} idea={idea} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
