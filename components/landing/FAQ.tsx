'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'Will this just copy the writer\'s style?',
    answer: 'No. The tool analyses how a writer thinks — their angles, tensions, and editorial instincts — and uses that as a lens to generate ideas for your newsletter. The output is adapted for your niche and your voice, not theirs. You get the intellectual framework, not a template. A reader of your newsletter should never be able to trace an essay back to the inspiration writer.',
  },
  {
    question: 'How accurate is the writer profile?',
    answer: 'It depends on the writer. For well-known Substackers with a substantial public archive, Claude has strong training data and the profile tends to be detailed and accurate. For smaller or newer writers, the profile is more speculative — the tool will tell you this with a confidence level (High, Medium, or Low) shown on every result. When you provide your own Substack handle, we fetch your actual posts and about page in real time, which significantly improves the quality of ideas tailored to you.',
  },
  {
    question: 'What does the Substack Audit actually show me?',
    answer: 'A structured outside-in view of your newsletter — the kind of perspective that is genuinely hard to generate yourself. You get a research profile, niche and topic breakdown, audience resonance analysis, positioning assessment, monetisation notes, content pattern observations, a strategic summary with three specific insights, and concrete tips to improve your About page. Everything is grounded in your actual posts and about page, fetched live when you run the audit. It takes 30–60 seconds and is free during beta.',
  },
]

function FAQItem({ faq, defaultOpen }: { faq: typeof faqs[0]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50/60 transition-colors"
      >
        <span className="font-display font-semibold text-gray-900 leading-snug">{faq.question}</span>
        <span className="flex-shrink-0 text-gray-400">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function FAQ() {
  return (
    <section className="py-24 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="section-label mb-3">FAQ</p>
          <h2 className="font-display font-extrabold text-4xl text-gray-900">
            Good questions.
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
