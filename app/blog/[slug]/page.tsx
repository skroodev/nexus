import { notFound } from 'next/navigation'
import React from 'react'

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL

export const dynamicParams = true
export const revalidate = 60

export async function generateStaticParams() {
  return []
}

async function getPostBySlug(slug: string) {
  if (!CMS_URL) {
    console.error('❌ CMS_URL is not defined')
    return null
  }

  try {
    console.log('📡 Fetching post with slug:', slug)
    
    const encodedSlug = encodeURIComponent(slug)
    const url = `${CMS_URL}/api/posts?where[slug][equals]=${encodedSlug}`
    
    console.log('📡 Fetch URL:', url)
    
    const res = await fetch(url, { next: { revalidate: 60 } })
    
    console.log('📡 Response status:', res.status)

    if (!res.ok) {
      console.error(`❌ Failed to fetch post (status ${res.status})`)
      const text = await res.text()
      console.error('Response:', text)
      return null
    }

    const data = await res.json()
    console.log('📡 Found docs:', data.docs?.length || 0)
    
    const post = data.docs?.[0] || null
    
    if (post) {
      console.log('✅ Post found:', post.title)
    } else {
      console.log('⚠️ Post not found for slug:', slug)
      // Try fetching all posts to debug
      console.log('📡 Fetching all published posts for debugging...')
      const allRes = await fetch(`${CMS_URL}/api/posts?where[status][equals]=published&limit=100`, { next: { revalidate: 60 } })
      const allData = await allRes.json()
      console.log('📡 Available slugs:', allData.docs?.map((p: any) => p.slug))
    }

    return post
  } catch (error) {
    console.error('❌ Error fetching post:', error)
    return null
  }
}

function RichTextRenderer({ content }: { content: any }): React.ReactElement | null {
  if (!content) return null

  // Handle Lexical JSON format
  if (content.root && Array.isArray(content.root.children)) {
    return (
      <div className="space-y-4">
        {content.root.children.map((node: any, index: number) => (
          <LexicalNode key={index} node={node} />
        ))}
      </div>
    )
  }

  // Handle plain string HTML
  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />
  }

  // Handle array of nodes
  if (Array.isArray(content)) {
    return (
      <>
        {content.map((node: any, index: number) => (
          <LexicalNode key={index} node={node} />
        ))}
      </>
    )
  }

  return null
}

function LexicalNode({ node }: { node: any }): React.ReactElement | null {
  if (!node) return null

  // Heading nodes
  if (node.type === 'heading' && node.tag) {
    const Tag = node.tag as keyof React.ReactHTML
    return (
      <Tag className={node.tag === 'h2' ? 'text-2xl font-bold mt-6 mb-4' : 'text-xl font-semibold mt-4 mb-3'}>
        {node.children && typeof node.children === 'string' && node.children}
        {Array.isArray(node.children) && node.children.map((child: any, i: number) => (
          <TextNode key={i} node={child} />
        ))}
      </Tag>
    )
  }

  // Paragraph nodes
  if (node.type === 'paragraph') {
    return (
      <p className="text-base leading-relaxed">
        {node.children && typeof node.children === 'string' && node.children}
        {Array.isArray(node.children) && node.children.map((child: any, i: number) => (
          <TextNode key={i} node={child} />
        ))}
      </p>
    )
  }

  // List nodes
  if (node.type === 'list') {
    const Tag = node.listType === 'bullet' ? 'ul' : 'ol'
    return (
      <Tag className={node.listType === 'bullet' ? 'list-disc list-inside space-y-2' : 'list-decimal list-inside space-y-2'}>
        {Array.isArray(node.children) && node.children.map((child: any, i: number) => (
          <li key={i}>
            {typeof child.text === 'string' && child.text}
            {child.children && Array.isArray(child.children) && child.children.map((c: any, j: number) => (
              <TextNode key={j} node={c} />
            ))}
          </li>
        ))}
      </Tag>
    )
  }

  // Upload/Image nodes
  if (node.type === 'upload' && node.value) {
    const imageUrl = typeof node.value === 'string' 
      ? node.value 
      : node.value.url
    
    return (
      <div className="my-6">
        <img
          src={imageUrl.startsWith('http') ? imageUrl : `${CMS_URL}${imageUrl}`}
          alt={node.value.alt || 'Image'}
          className="w-full rounded-lg"
        />
      </div>
    )
  }

  return null
}

function TextNode({ node }: { node: any }): React.ReactNode | string | null {
  if (!node) return null

  if (node.type === 'text') {
    let text = node.text || ''
    
    // Apply formatting
    if (node.bold) text = <strong>{text}</strong>
    if (node.italic) text = <em>{text}</em>
    if (node.underline) text = <u>{text}</u>
    if (node.strikethrough) text = <s>{text}</s>
    
    return <>{text}</>
  }

  if (typeof node.text === 'string') {
    return node.text
  }

  return null
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  console.log('🔵 BlogPostPage called with slug:', slug)
  
  const post = await getPostBySlug(slug)

  if (!post) {
    console.log('🔴 Post is null, calling notFound()')
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#1C1C1C] pt-20 sm:pt-24">
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <header className="mb-8">
          <a href="/blog/" className="text-[#DBA800] hover:text-[#c9931f] mb-4 inline-block">
            ← Retour au blog
          </a>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-between text-gray-600">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </header>

        {post.coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
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
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {post.excerpt && (
          <p className="text-xl text-gray-600 mb-8 italic">{post.excerpt}</p>
        )}

        <div className="prose prose-lg max-w-none">
          {typeof post.content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <RichTextRenderer content={post.content} />
          )}
        </div>
      </article>
    </main>
  )
}
