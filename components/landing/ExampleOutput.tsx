'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Lightbulb, ExternalLink } from 'lucide-react'

// ─── Free tab data ─────────────────────────────────────────────────────────────

const exampleNiche = 'building in public as a solo founder'
const exampleWriter = 'Lenny Rachitsky'

const exampleIdeas = [
  {
    title: 'The Decision I Almost Made That Would Have Killed My Product',
    coreTension: 'The instinct to follow user requests vs. the discipline to say no to most of them.',
    whyItWorksForThem: "Lenny's best posts create tension between conventional startup wisdom and what actually worked. He doesn't just share the right answer — he shows the moment of doubt.",
    howToAdaptForYou: "Document a recent decision where you nearly pivoted based on user feedback, then didn't. Walk through your exact reasoning. For solo founders, this authenticity is the product.",
  },
  {
    title: "I Interviewed 10 Solo Founders Who Hit €10K MRR. Here's What They All Had in Common.",
    coreTension: 'Individual success stories vs. the repeatable patterns underneath them.',
    whyItWorksForThem: "Lenny built his audience by turning one-off interviews into systematic insight. The format signals authority: \"I did the research so you don't have to.\"",
    howToAdaptForYou: 'Interview 5–10 founders in your audience. Keep the questions identical. Publish the patterns. This one piece of content builds credibility and your email list simultaneously.',
  },
  {
    title: 'The Metrics I Track Every Week (And the One I Stopped Tracking)',
    coreTension: 'What the data says vs. what actually matters for staying motivated solo.',
    whyItWorksForThem: "Lenny's content works because it's operationally specific — readers leave with something to implement, not just think about.",
    howToAdaptForYou: 'Show your actual weekly dashboard. Be honest about the vanity metric you deprioritised and why. Building in public means showing the instrument panel, not just the highlights.',
  },
]

// ─── Pro tab data ──────────────────────────────────────────────────────────────

const proMockRecentPosts = [
  { title: 'I shipped my first AI feature using only prompts. Here\'s what broke.', audience: 'free', wordcount: 1240 },
  { title: 'The moment I stopped pretending I had a plan', audience: 'paid', wordcount: 890 },
  { title: 'What 6 months of building in public actually taught me', audience: 'free', wordcount: 1580 },
]

const proMockAboutTips = [
  'Your About page leads with what you cover (topics) rather than why a reader should care. Add a one-sentence hook about the transformation you offer — not just the subject matter.',
  "Spell out who this is for. Right now a new visitor can't tell if this is for aspiring founders, developers, or curious observers. Name your reader explicitly.",
  'Add two "Start here" links to your best posts — give new visitors an immediate sample of your writing before they decide whether to subscribe.',
]

// ─── Sub-components ─────────────────────────────────────────────────────────────

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

function FreeExample() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md card-orange-top overflow-hidden">
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
        <div className="px-8 py-6 space-y-2">
          {exampleIdeas.map((idea, i) => (
            <IdeaCard key={i} idea={idea} index={i} />
          ))}
          {/* Blurred hint */}
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
  )
}

function ProExample() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md card-orange-top overflow-hidden">

        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="section-label mb-1">Your Substack Profile</p>
              <h3 className="font-display font-extrabold text-2xl text-gray-900">Your Newsletter</h3>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium border rounded-full px-2.5 py-1 bg-emerald-50 text-emerald-700 border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live data
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium border rounded-full px-2.5 py-1 bg-emerald-50 text-emerald-700 border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                High confidence
              </span>
            </div>
          </div>
          <p className="text-gray-600 italic leading-relaxed text-sm border-l-2 border-brand-orange/40 pl-3">
            A solo founder documenting the messy, honest reality of building an AI product in public — one mistake at a time.
          </p>
        </div>

        {/* Research Profile section */}
        <div className="px-8 py-6 border-t border-gray-100">
          <p className="section-label mb-3">Research Profile</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Your newsletter sits at the intersection of technical learning and raw founder honesty. You write for people who are tired of polished success stories and want to see how the sausage is actually made. The tone is self-aware, occasionally self-deprecating, and always specific — readers come for the AI angle and stay for the transparency about what&apos;s actually hard.
          </p>
        </div>

        {/* Audience Resonance section */}
        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/40">
          <p className="section-label mb-3">Audience Resonance</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Readers subscribe because they feel seen — they&apos;re also figuring things out without a team, a runway, or a clear playbook. The &quot;I don&apos;t have this figured out either&quot; framing builds unusual loyalty. What keeps people subscribed is the combination of practical AI insights with the emotional texture of going solo. You&apos;re not teaching from authority; you&apos;re learning in public, which makes the reader feel like a collaborator rather than a student.
          </p>
        </div>

        {/* About Me Tips */}
        <div className="px-8 py-6 border-t border-gray-100">
          <p className="section-label mb-3">Improve your About page</p>
          <ul className="space-y-3">
            {proMockAboutTips.map((tip, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0 mt-1.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Posts */}
        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50">
          <p className="section-label mb-3">Your recent posts</p>
          <ol className="space-y-3">
            {proMockRecentPosts.map((post, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-xs text-gray-400 font-medium w-5 flex-shrink-0 pt-0.5">{i + 1}.</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    <span className="text-sm font-medium text-gray-900 leading-snug flex items-center gap-1">
                      {post.title}
                      <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    </span>
                    <span className={`inline-flex items-center text-xs font-medium rounded-full px-2 py-0.5 flex-shrink-0 ${
                      post.audience === 'paid'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {post.audience === 'paid' ? 'Paid' : 'Free'}
                    </span>
                    <span className="text-xs text-gray-400 flex-shrink-0">{post.wordcount.toLocaleString()} words</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Footer: more sections teaser */}
        <div className="px-8 py-4 border-t border-gray-100 bg-brand-orange-muted/20">
          <p className="text-xs text-gray-500 text-center">
            Plus: Niche & Topic Focus · Positioning · Monetisation Strategy · Content Patterns · Strategic Summary
          </p>
        </div>

      </div>
      <p className="text-center text-sm text-gray-400 mt-6">
        Analyse your own Substack — free during beta, no account needed.
      </p>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ExampleOutput() {
  const [tab, setTab] = useState<'free' | 'pro'>('free')

  return (
    <section id="example" className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="section-label mb-3">Example output</p>
          <h2 className="font-display font-extrabold text-4xl text-gray-900 mb-4">
            This is what you walk away with.
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-8">
            Two products. One free, one paid. See what each gives you.
          </p>

          {/* Tab toggle */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mx-auto">
            <button
              onClick={() => setTab('free')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === 'free'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Free — Essay ideas
            </button>
            <button
              onClick={() => setTab('pro')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === 'pro'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Pro — Full audit
            </button>
          </div>
        </div>

        {tab === 'free' ? <FreeExample /> : <ProExample />}

      </div>
    </section>
  )
}
