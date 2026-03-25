import { getAllPosts } from '@/lib/blog'
import PostCard from '@/components/blog/PostCard'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 sm:py-24">
      <div className="mb-12">
        <p className="section-label mb-3">Blog</p>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 mb-4 leading-tight">
          Guides for Substack writers
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Practical guides on finding essay ideas, auditing your newsletter, and writing consistently.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet — check back soon.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
