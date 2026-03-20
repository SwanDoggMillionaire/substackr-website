import Link from 'next/link'

type ActivePage = 'essay-ideas' | 'audit'

export default function PageTabSwitcher({ active }: { active: ActivePage }) {
  return (
    <div className="flex justify-center">
      <div className="bg-gray-100 rounded-full p-1 inline-flex">
        {active === 'essay-ideas' ? (
          <span className="bg-brand-orange text-white text-sm font-semibold px-5 py-2 rounded-full">
            Essay Ideas — Free
          </span>
        ) : (
          <Link
            href="/essay-ideas"
            className="text-gray-500 hover:text-gray-700 text-sm font-medium px-5 py-2 rounded-full transition-colors"
          >
            Essay Ideas — Free
          </Link>
        )}
        {active === 'audit' ? (
          <span className="bg-brand-orange text-white text-sm font-semibold px-5 py-2 rounded-full">
            Newsletter Audit — Free in beta
          </span>
        ) : (
          <Link
            href="/audit"
            className="text-gray-500 hover:text-gray-700 text-sm font-medium px-5 py-2 rounded-full transition-colors"
          >
            Newsletter Audit — Free in beta
          </Link>
        )}
      </div>
    </div>
  )
}
