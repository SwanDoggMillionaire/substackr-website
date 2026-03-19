import { ProfileSection as ProfileSectionType } from '@/lib/types'

interface ProfileSectionProps {
  section: ProfileSectionType
  highlight?: boolean
}

export default function ProfileSection({ section, highlight = false }: ProfileSectionProps) {
  return (
    <div className={`px-8 py-6 border-b border-gray-100 ${highlight ? 'bg-brand-orange-muted/30' : ''}`}>
      <p className="section-label mb-2">{section.title}</p>
      <p className="text-gray-700 leading-relaxed">{section.content}</p>
      {section.bullets && section.bullets.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {section.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5 text-gray-600 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
