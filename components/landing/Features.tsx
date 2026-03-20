import { Lightbulb, Search, User } from 'lucide-react'

const features = [
  {
    icon: Lightbulb,
    title: 'Essay ideas, not just research',
    description:
      'Pick a writer you admire. Walk away with five ideas you could actually write - shaped around your niche, not theirs.',
  },
  {
    icon: Search,
    title: 'Full strategic profile',
    description:
      'The brief you\'d pay a researcher to write. Niche, positioning, audience, content patterns - and the gap they\'re leaving open for you.',
  },
  {
    icon: User,
    title: 'Audit yourself',
    description:
      'See your newsletter the way your readers do. The blind spots you can\'t see from inside - laid out clearly.',
  },
]

export default function Features() {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">What you actually get</p>
          <h2 className="font-display font-extrabold text-4xl text-gray-900">
            Five ideas you could write this week.
            <br />
            <span className="text-brand-orange">Based on a writer you already respect.</span>
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
