const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL

async function getPosts() {
  try {
    const res = await fetch(
      `${CMS_URL}/api/posts?where[status][equals]=published&sort=-publishedAt`,
      { next: { revalidate: 60 } }
    )

    if (!res.ok) throw new Error('Failed to fetch posts')
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen bg-[#1C1C1C] pt-20 sm:pt-24">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        
        {posts.length === 0 ? (
          <p className="text-gray-500">Aucun article pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <article
                key={post.slug}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {post.coverImage && (
                  <div className="h-48 overflow-hidden bg-gray-200">
                    <img
                      src={
                        typeof post.coverImage === 'object' && post.coverImage.url
                          ? `${CMS_URL}${post.coverImage.url}`
                          : typeof post.coverImage === 'string'
                          ? post.coverImage.startsWith('http')
                            ? post.coverImage
                            : `${CMS_URL}${post.coverImage}`
                          : ''
                      }
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <a href={`/blog/${post.slug}/`} className="group">
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                  </a>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
                    <a
                      href={`/blog/${post.slug}/`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Lire plus →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
