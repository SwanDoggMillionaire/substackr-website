import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="py-24 bg-surface-dark">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-brand-orange font-semibold text-sm uppercase tracking-widest mb-4">
          Get started - it&apos;s free
        </p>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-6 leading-tight">
          Ready to write something
          <br />
          worth reading?
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Free. No account needed. Results in under 60 seconds.
        </p>
        <Link
          href="/essay-ideas"
          className="inline-flex items-center gap-2 bg-brand-orange text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-brand-orange-dark transition-all duration-200 hover:scale-105 shadow-lg shadow-brand-orange/30"
        >
          Get my first ideas →
        </Link>
      </div>
    </section>
  )
}
