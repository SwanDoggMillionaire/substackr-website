'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'

const exampleNiche = 'building in public as a solo founder'
const exampleWriter = 'Lenny Rachitsky'

const exampleIdeas = [
  {
    title: 'The Decision I Almost Made That Would Have Killed My Product',
    coreTension: 'The instinct to follow user requests vs. the discipline to say no to most of them.',
    whyItWorksForThem: "Lenny's best posts create tension between conventional startup wisdom and what actually worked. He doesn't just share the right answer — he shows the moment of doubt.",
    howToAdaptForYou: 'Document a recent decision where you nearly pivoted based on user feedback, then didn\'t. Walk through your exact reasoning. For solo founders, this authenticity is the product.',
  },
  {
    title: 'I Interviewed 10 Solo Founders Who Hit €10K MRR. Here\'s What They All Had in Common.',
    coreTension: 'Individual success stories vs. the repeatable patterns underneath them.',
    whyItWorksForThem: 'Lenny built his audience by turning one-off interviews into systematic insight. The format signals authority: "I did the research so you don\'t have to."',
    howToAdaptForYou: 'Interview 5–10 founders in your audience. Keep the questions identical. Publish the patterns. This one piece of content builds credibility and your email list simultaneously.',
  },
  {
    title: 'The Metrics I Track Every Week (And the One I Stopped Tracking)',
    coreTension: 'What the data says vs. what actually matters for staying motivated solo.',
    whyItWorksForThem: "Lenny's content works because it's operationally specific — readers leave with something to implement, not just think about.",
    howToAdaptForYou: 'Show your actual weekly dashboard. Be honest about the vanity metric you deprioritised and why. Building in public means showing the instrument panel, not just the highlights.',
  },
]

function IdeaCard({ idea, index }: { idea: typeof exampleIdeas[0]; index: number }) {
  const [expanded, setExpanded] = useState(index === 0)

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

export default function ExampleOutput() {
  return (
    <section id="example" className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">Example output</p>
          <h2 className="font-display font-extrabold text-4xl text-gray-900 mb-4">
            This is what you walk away with.
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Writer: <span className="font-medium text-gray-900">{exampleWriter}</span> · Niche: <span className="font-medium text-gray-900">{exampleNiche}</span>
          </p>
        </div>

        {/* Essay ideas */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md card-orange-top overflow-hidden">
            {/* Card header */}
            <div className="px-8 py-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-orange-muted flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-brand-orange" />
              </div>
              <div>
                <p className="font-display font-semibold text-gray-900 text-sm">
                  5 essay ideas inspired by {exampleWriter}
                </p>
                <p className="text-xs text-gray-500">Adapted for: {exampleNiche}</p>
              </div>
            </div>

            {/* Idea cards */}
            <div className="px-8 py-6 space-y-2">
              {exampleIdeas.map((idea, i) => (
                <IdeaCard key={i} idea={idea} index={i} />
              ))}
              {/* Blurred hint at more */}
              <div className="relative">
                <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-start gap-3 opacity-40 blur-sm select-none pointer-events-none">
                  <span className="font-display font-bold text-lg text-brand-orange/40 flex-shrink-0">4</span>
                  <div>
                    <p className="font-display font-semibold text-gray-900 text-sm">Two more ideas waiting…</p>
                    <p className="text-sm text-gray-500 mt-1">Run a real search to unlock all five.</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-500 bg-white/90 px-3 py-1 rounded-full border border-gray-200">
                    2 more ideas — try it free
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Run a real search to get your own 5 ideas — free, no account needed.
          </p>
        </div>
      </div>
    </section>
  )
}
