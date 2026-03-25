'use client'

import { useEffect, useState } from 'react'

const MESSAGES_RESEARCHING = [
  'Researching the writer…',
  'Analysing writing patterns…',
  'Mapping audience signals…',
  'Evaluating content cadence…',
  'Identifying positioning strategy…',
  'Assessing monetisation model…',
]

const MESSAGES_GENERATING = [
  'Generating your ideas…',
  'Adapting their approach to your niche…',
  'Crafting your first idea…',
  'Finding the angles that work for you…',
  'Shaping the final ideas…',
]

interface LoadingStateProps {
  phase?: 'researching' | 'generating-ideas'
  writerName?: string
}

export default function LoadingState({ phase = 'researching', writerName }: LoadingStateProps) {
  const messages = phase === 'generating-ideas' ? MESSAGES_GENERATING : MESSAGES_RESEARCHING
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    setMessageIndex(0)
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [phase, messages.length])

  const isGenerating = phase === 'generating-ideas'

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 animate-fade-in">
      {/* Status message */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-brand-orange font-medium">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-sm transition-all duration-500">
            {writerName && !isGenerating
              ? messages[messageIndex].replace('the writer', writerName)
              : messages[messageIndex]}
          </span>
        </div>
        {writerName && (
          <p className="text-xs text-gray-400 mt-2">
            {isGenerating ? 'Almost there…' : `Looking up ${writerName}…`}
          </p>
        )}
      </div>

      {isGenerating ? (
        /* Phase 2 - idea card skeletons */
        <div className="bg-white rounded-2xl shadow-md card-orange-top overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-100 flex items-center gap-3">
            <div className="skeleton w-8 h-8 rounded-lg" />
            <div className="space-y-1.5">
              <div className="skeleton h-3.5 w-40" />
              <div className="skeleton h-3 w-28" />
            </div>
          </div>
          <div className="px-8 py-6 space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border border-gray-100 rounded-xl px-5 py-4 flex items-start gap-3">
                <div className="skeleton h-6 w-6 rounded flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-3/4" />
                  <div className="skeleton h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Phase 1 - profile card skeleton */
        <div className="bg-white rounded-2xl shadow-md card-orange-top overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="skeleton h-3 w-24 mb-3" />
            <div className="skeleton h-7 w-48" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="px-8 py-6 border-b border-gray-100">
              <div className="skeleton h-3 w-32 mb-3" />
              <div className="space-y-2">
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-11/12" />
                <div className="skeleton h-4 w-4/5" />
              </div>
            </div>
          ))}
          <div className="px-8 py-6 bg-brand-orange-muted/20">
            <div className="skeleton h-3 w-36 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="skeleton h-8 w-8 rounded flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="skeleton h-4 w-full" />
                    <div className="skeleton h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
