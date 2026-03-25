import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'

export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="bg-white rounded-2xl shadow-sm card-orange-top p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-brand-orange uppercase tracking-widest">Guide</span>
          <span className="text-gray-300 text-xs">·</span>
          <span className="text-xs text-gray-500">{post.readingTime}</span>
        </div>
        <h2 className="font-display font-bold text-xl text-gray-900 mb-2 group-hover:text-brand-orange transition-colors leading-snug">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
        <p className="text-xs text-gray-400">
          {new Date(post.publishedAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </article>
    </Link>
  )
}
