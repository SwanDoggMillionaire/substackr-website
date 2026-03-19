// Static example profile — shows the product before someone uses it
const exampleProfile = {
  writerName: 'Lenny Rachitsky',
  researchProfile: {
    title: 'Research Profile',
    content:
      'Lenny Rachitsky is one of the most prominent product and growth writers on Substack, best known for Lenny\'s Newsletter — a deep-dive resource for product managers, founders, and growth practitioners. A former Airbnb product lead, Lenny writes from genuine practitioner experience, covering frameworks, interviews with top operators, and candid takes on product strategy. He has built one of the largest paid newsletters on Substack.',
  },
  nicheAndTopicFocus: {
    title: 'Niche & Topic Focus',
    content: 'Tightly owned product and growth space — very little dilution into adjacent territory.',
    bullets: ['Product strategy & roadmapping', 'Growth loops and retention', 'Interviews with PMs and founders', 'Career advice for product people'],
  },
  positioning: {
    title: 'Positioning',
    content:
      'Peer-to-peer expert. Lenny positions himself as a former practitioner who is still in the trenches through his interviews and community — not an academic or consultant. His framing is: "I\'ve done this, here\'s what I learned, here\'s what the best people I know think."',
  },
  strategicSummary: {
    title: 'Strategic Summary',
    insights: [
      'Adopt his interview format: deep, structured conversations with real practitioners outperform opinion essays for trust-building. The guest\'s credibility compounds your own.',
      'His weakness is specificity to tech/Silicon Valley — a writer serving a different industry vertical (e.g. e-commerce, media) could own the same format in a less crowded space.',
      'His paid tier converts because the content is directly useful for career advancement — not just interesting. When evaluating your own premium offer, ask whether it helps subscribers do something, not just know something.',
    ],
  },
}

export default function ExampleOutput() {
  return (
    <section id="example" className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">Example output</p>
          <h2 className="font-display font-extrabold text-4xl text-gray-900 mb-4">
            This is what you get.
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            A structured profile that gives you strategic intelligence, not just a description.
          </p>
        </div>

        {/* Profile card preview */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md card-orange-top overflow-hidden">
            {/* Card header */}
            <div className="px-8 py-6 border-b border-gray-100">
              <p className="section-label mb-1">Writer Profile</p>
              <h3 className="font-display font-extrabold text-2xl text-gray-900">
                {exampleProfile.writerName}
              </h3>
            </div>

            {/* Sections */}
            <div className="divide-y divide-gray-100">
              {/* Research Profile */}
              <div className="px-8 py-6">
                <p className="section-label mb-2">{exampleProfile.researchProfile.title}</p>
                <p className="text-gray-700 leading-relaxed">{exampleProfile.researchProfile.content}</p>
              </div>

              {/* Niche */}
              <div className="px-8 py-6">
                <p className="section-label mb-2">{exampleProfile.nicheAndTopicFocus.title}</p>
                <p className="text-gray-700 leading-relaxed mb-3">{exampleProfile.nicheAndTopicFocus.content}</p>
                <ul className="space-y-1">
                  {exampleProfile.nicheAndTopicFocus.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Positioning */}
              <div className="px-8 py-6">
                <p className="section-label mb-2">{exampleProfile.positioning.title}</p>
                <p className="text-gray-700 leading-relaxed">{exampleProfile.positioning.content}</p>
              </div>

              {/* Strategic Summary — highlighted */}
              <div className="px-8 py-6 bg-brand-orange-muted/40">
                <p className="section-label mb-4">{exampleProfile.strategicSummary.title}</p>
                <div className="space-y-3">
                  {exampleProfile.strategicSummary.insights.map((insight, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="font-display font-bold text-2xl text-brand-orange/40 leading-none mt-0.5 flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            This is a sample profile. Run a real search to get the full 7-section analysis.
          </p>
        </div>
      </div>
    </section>
  )
}
