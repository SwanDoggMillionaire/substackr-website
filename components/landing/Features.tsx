import { Search, Zap, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Full Strategic Profile',
    description:
      'Seven sections covering everything that matters — niche, positioning, audience, monetisation, content patterns, and a strategic summary with three actionable insights.',
  },
  {
    icon: Zap,
    title: 'Powered by Claude AI',
    description:
      'Not a keyword scraper. Genuine AI synthesis of publicly available information. The kind of analysis that would take you an hour — done in under 30 seconds.',
  },
  {
    icon: BarChart3,
    title: 'Learn, Not Just Read',
    description:
      'Each profile ends with three specific insights calibrated to help you learn from that writer. What to adopt, what gap they leave open, what makes them distinctive.',
  },
]

export default function Features() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">How it works</p>
          <h2 className="font-display font-extrabold text-4xl text-gray-900">
            Research that used to take hours.
            <br />
            <span className="text-brand-orange">Now takes seconds.</span>
          </h2>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="group p-8 rounded-2xl border border-gray-100 hover:border-brand-orange/30 hover:shadow-md transition-all duration-200 bg-white">
                <div className="w-12 h-12 rounded-xl bg-brand-orange-muted flex items-center justify-center mb-5 group-hover:bg-brand-orange/10 transition-colors">
                  <Icon className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
