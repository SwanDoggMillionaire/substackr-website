'use client'

import { useState } from 'react'
import { WriterProfile } from '@/lib/types'
import ProfileSection from './ProfileSection'
import { ChevronDown, ChevronUp, Lock } from 'lucide-react'

interface ProfileCardProps {
  profile: WriterProfile
  collapsed?: boolean
  toplineOnly?: boolean
}

const LOCKED_SECTIONS = [
  {
    title: 'Research Profile',
    teaser: 'Full overview of who this writer is, what they cover, and why they\'ve grown.',
  },
  {
    title: 'Niche & Topic Focus',
    teaser: 'Deep-dive on their specific niche, how tightly they own it, and whether their breadth is a strength or weakness.',
  },
  {
    title: 'Audience Resonance',
    teaser: 'Who reads them, what keeps them subscribed, and the signals that show audience loyalty.',
  },
  {
    title: 'Positioning',
    teaser: 'How they frame their identity — expert vs fellow traveller, aspirational vs personal — and what makes it distinctive.',
  },
  {
    title: 'Monetisation Strategy',
    teaser: 'Paid tier pricing, revenue model, and how mature their newsletter business actually is.',
  },
  {
    title: 'Content Patterns',
    teaser: 'Formats, typical post length, publishing cadence, and which content types perform best.',
  },
  {
    title: 'Strategic Summary',
    teaser: 'Three concrete insights any writer can adopt or adapt, plus the specific gap they\'re leaving wide open.',
  },
]

function LockedSection({ title, teaser }: { title: string; teaser: string }) {
  return (
    <div className="px-8 py-5 border-t border-gray-100">
      <p className="section-label mb-3">{title}</p>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex gap-3">
        <Lock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-1">Substackr Pro</p>
          <p className="text-sm text-gray-500 leading-relaxed mb-3">{teaser}</p>
          <button className="text-xs font-semibold text-brand-orange hover:text-brand-orange-dark transition-colors">
            Unlock Pro →
          </button>
        </div>
      </div>
    </div>
  )
}

function ConfidenceBadge({ level }: { level: 'HIGH' | 'MEDIUM' | 'LOW' }) {
  const styles = {
    HIGH: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    MEDIUM: 'bg-amber-50 text-amber-700 border-amber-200',
    LOW: 'bg-red-50 text-red-600 border-red-200',
  }
  const labels = {
    HIGH: 'High confidence',
    MEDIUM: 'Medium confidence',
    LOW: 'Limited data',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium border rounded-full px-2.5 py-1 ${styles[level]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${level === 'HIGH' ? 'bg-emerald-500' : level === 'MEDIUM' ? 'bg-amber-500' : 'bg-red-400'}`} />
      {labels[level]}
    </span>
  )
}

export default function ProfileCard({ profile, collapsed = false, toplineOnly = false }: ProfileCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed)

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-md card-orange-top overflow-hidden">

        {/* Header — always visible */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="section-label mb-1">
                {profile.isAnalysingSelf ? 'Your Substack Profile' : 'Research Profile'}
              </p>
              <h2 className="font-display font-extrabold text-2xl text-gray-900">
                {profile.writerName}
              </h2>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              {profile.dataSource === 'live' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium border rounded-full px-2.5 py-1 bg-emerald-50 text-emerald-700 border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Live data
                </span>
              )}
              {profile.confidenceLevel && (
                <ConfidenceBadge level={profile.confidenceLevel} />
              )}
            </div>
          </div>

          {/* One-liner */}
          {profile.oneLiner && (
            <p className="text-gray-600 italic leading-relaxed text-sm border-l-2 border-brand-orange/40 pl-3">
              {profile.oneLiner}
            </p>
          )}

          {/* Niche bullets — shown in header when toplineOnly (that's the free overview) */}
          {toplineOnly && profile.nicheAndTopicFocus?.bullets && profile.nicheAndTopicFocus.bullets.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {profile.nicheAndTopicFocus.bullets.map((bullet) => (
                <span key={bullet} className="text-xs text-gray-600 bg-gray-100 rounded-full px-2.5 py-1">
                  {bullet}
                </span>
              ))}
            </div>
          )}

          {/* Low confidence warning */}
          {profile.confidenceLevel === 'LOW' && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
              This writer has limited information in Claude&apos;s training data. The profile below is a best-effort analysis — treat it as directional, not definitive.
            </div>
          )}
        </div>

        {/* Topline-only mode: locked sections */}
        {toplineOnly && (
          <>
            {LOCKED_SECTIONS.map((s) => (
              <LockedSection key={s.title} title={s.title} teaser={s.teaser} />
            ))}
          </>
        )}

        {/* Full mode: toggle + expandable content */}
        {!toplineOnly && (
          <>
            {/* Toggle button when collapsed */}
            {isCollapsed && (
              <button
                onClick={() => setIsCollapsed(false)}
                className="w-full px-8 py-4 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-brand-orange hover:bg-brand-orange-muted/20 transition-colors"
              >
                <span>See the full research behind these ideas</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            )}

            {/* Full content — shown when expanded */}
            {!isCollapsed && (
              <>
                <ProfileSection section={profile.researchProfile} />
                <ProfileSection section={profile.nicheAndTopicFocus} />
                <ProfileSection section={profile.audienceResonance} />
                <ProfileSection section={profile.positioning} />
                <ProfileSection section={profile.monetisationStrategy} />
                <ProfileSection section={profile.contentPatterns} />

                {/* Strategic Summary */}
                <div className="px-8 py-6 bg-brand-orange-muted/40">
                  <p className="section-label mb-4">{profile.strategicSummary.title}</p>
                  <div className="space-y-4 mb-6">
                    {profile.strategicSummary.insights.map((insight, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="font-display font-extrabold text-3xl text-brand-orange/30 leading-none mt-0.5 flex-shrink-0 w-8">
                          {i + 1}
                        </span>
                        <p className="text-gray-700 leading-relaxed">{insight}</p>
                      </div>
                    ))}
                  </div>

                  {profile.strategicSummary.theGap && (
                    <div className="border-t border-brand-orange/20 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange/70 mb-2">
                        The Gap
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {profile.strategicSummary.theGap}
                      </p>
                    </div>
                  )}
                </div>

                {/* Similar Writers */}
                {profile.similarWriters && profile.similarWriters.length > 0 && (
                  <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50">
                    <p className="section-label mb-3">Also worth studying</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.similarWriters.map((name) => (
                        <span
                          key={name}
                          className="text-sm text-gray-700 bg-white border border-gray-200 rounded-full px-3 py-1"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* About Me Tips — self-analysis only */}
                {profile.isAnalysingSelf && profile.aboutMeTips && profile.aboutMeTips.length > 0 && (
                  <div className="px-8 py-6 border-t border-gray-100">
                    <p className="section-label mb-3">Improve your About page</p>
                    <ul className="space-y-3">
                      {profile.aboutMeTips.map((tip, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0 mt-1.5" />
                          <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recent Posts — self-analysis only */}
                {profile.isAnalysingSelf && profile.recentPosts && profile.recentPosts.length > 0 && (
                  <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50">
                    <p className="section-label mb-3">Your recent posts</p>
                    <ol className="space-y-3">
                      {profile.recentPosts.map((post, i) => (
                        <li key={post.slug} className="flex gap-3">
                          <span className="text-xs text-gray-400 font-medium w-5 flex-shrink-0 pt-0.5">{i + 1}.</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 flex-wrap">
                              <a
                                href={post.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-gray-900 hover:text-brand-orange transition-colors leading-snug"
                              >
                                {post.title}
                              </a>
                              <span className={`inline-flex items-center text-xs font-medium rounded-full px-2 py-0.5 flex-shrink-0 ${
                                post.audience === 'paid'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-gray-100 text-gray-500'
                              }`}>
                                {post.audience === 'paid' ? 'Paid' : 'Free'}
                              </span>
                              {post.wordcount && (
                                <span className="text-xs text-gray-400 flex-shrink-0">{post.wordcount.toLocaleString()} words</span>
                              )}
                            </div>
                            {post.subtitle && (
                              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{post.subtitle}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Collapse button */}
                {collapsed && (
                  <button
                    onClick={() => setIsCollapsed(true)}
                    className="w-full px-8 py-4 flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors border-t border-gray-100"
                  >
                    <span>Collapse</span>
                    <ChevronUp className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-gray-400 mt-4 px-4">
        Substackr uses Claude AI and publicly available information. Results may not be fully accurate for lesser-known writers.
      </p>
    </div>
  )
}
