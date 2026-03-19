import { WriterProfile } from '@/lib/types'
import ProfileSection from './ProfileSection'

interface ProfileCardProps {
  profile: WriterProfile
}

function formatDate(isoString: string) {
  try {
    return new Date(isoString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return 'Today'
  }
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-12 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-md card-orange-top overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <p className="section-label mb-1">Writer Profile</p>
          <h2 className="font-display font-extrabold text-2xl text-gray-900">
            {profile.writerName}
          </h2>
          <p className="text-xs text-gray-400 mt-1">Generated {formatDate(profile.generatedAt)}</p>
        </div>

        {/* Sections */}
        <ProfileSection section={profile.researchProfile} />
        <ProfileSection section={profile.nicheAndTopicFocus} />
        <ProfileSection section={profile.audienceResonance} />
        <ProfileSection section={profile.positioning} />
        <ProfileSection section={profile.monetisationStrategy} />
        <ProfileSection section={profile.contentPatterns} />

        {/* Strategic Summary — special treatment */}
        <div className="px-8 py-6 bg-brand-orange-muted/40">
          <p className="section-label mb-4">{profile.strategicSummary.title}</p>
          <div className="space-y-4">
            {profile.strategicSummary.insights.map((insight, i) => (
              <div key={i} className="flex gap-4">
                <span className="font-display font-extrabold text-3xl text-brand-orange/30 leading-none mt-0.5 flex-shrink-0 w-8">
                  {i + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-gray-400 mt-4 px-4">
        Substackr uses Claude AI and publicly available information. Results may not be fully accurate for lesser-known writers.
      </p>
    </div>
  )
}
