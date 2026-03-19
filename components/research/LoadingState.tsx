'use client'

import { useEffect, useState } from 'react'

const MESSAGES = [
  'Analysing writing patterns…',
  'Mapping audience signals…',
  'Synthesising strategic insights…',
  'Evaluating content cadence…',
  'Identifying positioning strategy…',
  'Assessing monetisation model…',
]

export default function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 animate-fade-in">
      {/* Status message */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-brand-orange font-medium">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-sm transition-all duration-500">{MESSAGES[messageIndex]}</span>
        </div>
      </div>

      {/* Skeleton card */}
      <div className="bg-white rounded-2xl shadow-md card-orange-top overflow-hidden">
        {/* Card header skeleton */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="skeleton h-3 w-24 mb-3" />
          <div className="skeleton h-7 w-48" />
        </div>

        {/* Section skeletons */}
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

        {/* Strategic summary skeleton */}
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
    </div>
  )
}
