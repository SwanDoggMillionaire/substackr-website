import { Lightbulb, Search, User } from 'lucide-react'

const features = [
  {
    icon: Lightbulb,
    title: 'Essay ideas, not just research',
    description:
      'After every profile, get five essay ideas inspired by that writer\'s approach — adapted to your niche. Turn research into content, every time you use the tool.',
  },
  {
    icon: Search,
    title: 'Full strategic profile',
    description:
      'Seven sections covering what matters — niche, positioning, audience, monetisation, content patterns, and a strategic summary with the gap they\'re leaving open.',
  },
  {
    icon: User,
    title: 'Analyse yourself',
    description:
      'Enter your own Substack name and get an honest, structured view of how your newsletter looks from the outside. Surface the blind spots you can\'t see from inside.',
  },
]

export default function Features() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">What you get</p>
          <h2 className="font-display font-extrabold text-4xl text-gray-900">
            Research that becomes writing.
            <br />
            <span className="text-brand-orange">Not just a report you file away.</span>
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
