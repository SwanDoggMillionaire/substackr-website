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
    whyItWorksForThem: "Lenny's best posts create tension between conventional startup wisdom and what actually worked. He doesn't just share the right answer - he shows the moment of doubt.",
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
    whyItWorksForThem: "Lenny's content works because it's operationally specific - readers leave with something to implement, not just think about.",
    howToAdaptForYou: 'Show your actual weekly dashboard. Be honest about the vanity metric you deprioritised and why. Building in public means showing the instrument panel, not just the highlights.',
  },
]

// ─── Pro tab data ──────────────────────────────────────────────────────────────

const proMockNewsletter = {
  name: 'The Curious Creator',
  handle: 'curiouscreator.substack.com',
  oneLiner: 'An essay newsletter for people who think carefully, create seriously, and still have more questions than answers.',
}

const proMockResearchProfile = `The Curious Creator is built around a central conviction: the most interesting creative work happens in the gap between what you know and what you're still figuring out. The writing is essay-driven and intellectually honest — each post traces a real thought process rather than delivering a pre-packaged conclusion. The newsletter occupies the space between personal development and creative practice, but it sidesteps the generic productivity framing that saturates that category. What distinguishes it is the willingness to sit with open questions and bring the reader along for the thinking, not just the answer.`

const proMockNicheBullets = [
  'The psychology of creative curiosity — why some people keep asking questions and others stop',
  'Creative identity and the tension between producing work and developing as a thinker',
  'Learning in public: the case for documenting your process before you have the answers',
  'The intersection of craft, attention, and original thought in a distracted world',
]

const proMockAudienceResonance = `Your likely reader is someone who has a professional identity but suspects there is a more interesting version of themselves underneath it. They read widely, think carefully, and feel a vague guilt that they have not yet turned that into something. They are not beginners looking for permission — they are people looking for a framework that matches how they actually think. The "curious" framing resonates because it describes how they see themselves, not just what they are interested in. Your tone — unhurried, precise, genuinely exploratory — is the product, not merely the delivery mechanism.`

const proMockStrategicSummary = [
  {
    number: 1,
    insight: 'Your strongest single asset is the quality of your questions. Most newsletters give readers answers; you give them better questions to carry around. This is a distinctive editorial position that few writers claim explicitly — naming it directly in your About page and post headers would make the value proposition immediately legible to first-time visitors.',
  },
  {
    number: 2,
    insight: 'The biggest growth lever right now is a consistent publishing cadence, not more polish. Readers of exploratory newsletters forgive imperfect essays; they do not forgive inconsistency, because it breaks the habit loop that makes a newsletter feel essential. Even a fortnightly cadence published like clockwork will compound faster than brilliant but sporadic posts.',
  },
  {
    number: 3,
    insight: 'You have the ingredients for a signature series but have not assembled them yet. Several posts circle the same territory — the relationship between curiosity and creative output — but they live as standalone pieces. Tying them into a named series would give new subscribers a reason to go deep into your archive immediately, rather than reading the latest issue and moving on.',
  },
]

const proMockRecentPosts = [
  { title: 'What curiosity actually feels like (vs. what we say it feels like)', audience: 'free', views: 4150 },
  { title: 'Why most creative advice makes you worse, not better', audience: 'free', views: 3240 },
  { title: 'The question I keep asking that I still cannot answer', audience: 'free', views: 2810 },
  { title: 'On finishing things you no longer believe in', audience: 'paid', views: 1920 },
]

const proMockAboutTips = [
  'Your About page describes what you write about but not what changes for the reader. Add one sentence that completes: "Read this if you want to…" — it forces you to name the transformation, not just the topic.',
  'The newsletter name is strong but the tagline underneath it is not doing work. "Exploring ideas at the edge of creativity and learning" describes half the newsletters on Substack. Replace it with something only you could say — something that names your specific angle.',
  'Pin your two best posts at the top of the About page. New subscribers decide in under 60 seconds — surface your strongest work immediately rather than making them scroll a chronological archive.',
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
    <div className="max-w-4xl mx-auto">
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
                2 more ideas waiting - run a real search to unlock them
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-400 mt-6">
        Free, no account needed. <a href="/research" className="text-brand-orange hover:text-brand-orange-dark font-medium transition-colors">Try it on a writer you know →</a>
      </p>
    </div>
  )
}

function ProExample() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md card-orange-top overflow-hidden">

        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="section-label mb-1">Your Substack Profile</p>
              <h3 className="font-display font-extrabold text-2xl text-gray-900">{proMockNewsletter.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{proMockNewsletter.handle}</p>
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
            {proMockNewsletter.oneLiner}
          </p>
        </div>

        {/* Research Profile */}
        <div className="px-8 py-6 border-t border-gray-100">
          <p className="section-label mb-3">Research Profile</p>
          <p className="text-sm text-gray-700 leading-relaxed">{proMockResearchProfile}</p>
        </div>

        {/* Niche & Topic Focus */}
        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/40">
          <p className="section-label mb-3">Niche &amp; Topic Focus</p>
          <ul className="space-y-2.5">
            {proMockNicheBullets.map((bullet, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0 mt-1.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{bullet}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Audience Resonance */}
        <div className="px-8 py-6 border-t border-gray-100">
          <p className="section-label mb-3">Audience Resonance</p>
          <p className="text-sm text-gray-700 leading-relaxed">{proMockAudienceResonance}</p>
        </div>

        {/* Strategic Summary */}
        <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/40">
          <p className="section-label mb-4">Strategic Summary</p>
          <ol className="space-y-5">
            {proMockStrategicSummary.map((item) => (
              <li key={item.number} className="flex gap-4">
                <span className="font-display font-extrabold text-xl text-brand-orange/30 flex-shrink-0 leading-tight w-5">
                  {item.number}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">{item.insight}</p>
              </li>
            ))}
          </ol>
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
                    <span className="text-xs text-gray-400 flex-shrink-0">{post.views.toLocaleString()} views</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Footer: remaining sections teaser */}
        <div className="px-8 py-4 border-t border-gray-100 bg-brand-orange-muted/20">
          <p className="text-xs text-gray-500 text-center">
            Plus: Positioning · Monetisation Strategy · Content Patterns · Similar Writers
          </p>
        </div>

      </div>
      <p className="text-center text-sm text-gray-400 mt-6">
        Analyse your own Substack — free during beta, no account needed. <a href="/analyse" className="text-brand-orange hover:text-brand-orange-dark font-medium transition-colors">Try it now →</a>
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
              Free - Essay ideas
            </button>
            <button
              onClick={() => setTab('pro')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === 'pro'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Pro - Full audit
            </button>
          </div>
        </div>

        {tab === 'free' ? <FreeExample /> : <ProExample />}

      </div>
    </section>
  )
}
