import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-surface to-brand-orange-muted/30 pointer-events-none" />
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-80 h-80 rounded-full bg-brand-orange/4 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-orange-muted border border-brand-orange/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-sm font-medium text-brand-orange-dark">Free to use — no sign-up required</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-gray-900 leading-tight tracking-tight mb-6">
          Know any Substack writer{' '}
          <span className="text-brand-orange">inside out.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Substackr gives you a full strategic profile of any Substack writer in seconds.
          Niche, audience, monetisation, content patterns — all analysed by Claude AI.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 bg-brand-orange text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-brand-orange-dark transition-all duration-200 hover:scale-105 shadow-lg shadow-brand-orange/25"
          >
            Research a writer
            <span className="text-xl">→</span>
          </Link>
          <Link
            href="/research?mode=self"
            className="inline-flex items-center gap-2 bg-white text-gray-800 font-semibold px-8 py-4 rounded-full text-lg border border-gray-200 hover:border-brand-orange/40 hover:text-brand-orange transition-all duration-200 hover:scale-105"
          >
            Analyse yourself
          </Link>
        </div>

        {/* Secondary link */}
        <a
          href="#example"
          className="inline-flex items-center gap-1.5 text-gray-500 text-sm font-medium mt-6 hover:text-gray-700 transition-colors"
        >
          See an example output <span>↓</span>
        </a>

        {/* Social proof */}
        <p className="mt-8 text-sm text-gray-400">
          Try searching for: Ben Thompson · Lenny Rachitsky · Anne-Laure Le Cunff
        </p>
      </div>
    </section>
  )
}
