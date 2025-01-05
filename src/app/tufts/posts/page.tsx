'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { posts } from '@/app/lib/tuftsposts'
import PostsNavBar from '@/components/PostsNavBar'

export default function AllPosts() {
  const [sortOrder, setSortOrder] = useState<'oldToNew' | 'newToOld' | 'mostViewed'>('newToOld')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({})
  
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const tag = searchParams.get('tag')
    if (tag) {
      setSelectedTag(tag)
    }
  }, [searchParams])

  useEffect(() => {
    const fetchViewCounts = async () => {
      const counts: Record<string, number> = {}
      const postIds = Object.keys(posts)
      
      for (const postId of postIds) {
        try {
          const response = await fetch(`/api/tufts/posts/${postId}/viewCount`)
          if (!response.ok) throw new Error('Failed to fetch view count')
          const data = await response.json()
          counts[postId] = data.viewCount
        } catch (error) {
          console.error(`Error fetching view count for post ${postId}:`, error)
          counts[postId] = 0 // Fallback to 0 views if there's an error
        }
      }
      
      setViewCounts(counts)
      setLoading(false)
    }

    fetchViewCounts()
  }, [])

  const filteredPosts = Object.entries(posts)
    .filter(([, post]) => {
      if (selectedTag && !post.tags.includes(selectedTag)) return false
      if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !post.content.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
    .sort(([idA, postA], [idB, postB]) => {
      if (sortOrder === 'mostViewed') {
        return (viewCounts[idB] || 0) - (viewCounts[idA] || 0)
      }
      const dateA = new Date(postA.date)
      const dateB = new Date(postB.date)
      return sortOrder === 'newToOld' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime()
    })

  const uniqueTags = Array.from(new Set(Object.values(posts).flatMap(post => post.tags)))

  if (loading) return <div>Loading...</div>

  return (
    <div className="all-posts-page">
      <PostsNavBar />
      <div className="filter-bar">
        <label>
          Sort by:
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
          >
            <option value="newToOld">New to Old</option>
            <option value="oldToNew">Old to New</option>
            <option value="mostViewed">Most Viewed</option>
          </select>
        </label>
        <label>
          Filter by tag:
          <select 
            value={selectedTag || ''} 
            onChange={(e) => {
              const tag = e.target.value || null
              setSelectedTag(tag)
              if (tag) {
                router.push(`/tufts/posts?tag=${tag}`)
              } else {
                router.push('/tufts/posts')
              }
            }}
          >
            <option value="">All</option>
            {uniqueTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </label>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="all-posts">
        <h1>All Posts</h1>
        <div className="posts-list">
          {filteredPosts.length === 0 ? (
            <p>Sorry, no available posts.</p>
          ) : (
            filteredPosts.map(([postId, post]) => (
              <div key={postId} className="post-summary">
                <Link href={`/tufts/posts/${postId}`}>
                  <Image 
                    src={post.imageUrl} 
                    alt={post.title}
                    width={300}
                    height={200}
                    priority
                  />
                  <h2>{post.title}</h2>
                  <p>{post.date}</p>
                  <p>{post.author}</p>
                  <p>Views: {viewCounts[postId]}</p>
                  <div className="tags">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}