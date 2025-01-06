'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { posts } from '@/app/lib/tuftsposts'

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
      if (selectedTag && !post.tags.includes(selectedTag)) return false;
      if (
        searchQuery &&
        !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !post.content.some(paragraph => 
          paragraph.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ) {
        return false;
      }
      return true;
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

  if (loading) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">      
      <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="flex justify-center my-8">
        <Link href="/tufts">
          <Image 
            src="/images/tufts_banner.png"
            alt="Back to Tufts"
            width={300} 
            height={200}
            className="object-contain"
          />
        </Link>
      </div>

        <div className="text-black bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-gray-700 text-sm font-medium">Sort by:</span>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="newToOld">New to Old</option>
                <option value="oldToNew">Old to New</option>
                <option value="mostViewed">Most Viewed</option>
              </select>
            </label>
            
            <label className="block">
              <span className="text-gray-700 text-sm font-medium">Filter by tag:</span>
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Tags</option>
                {uniqueTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </label>
            
            <div className="relative">
              <span className="text-gray-700 text-sm font-medium">Search:</span>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
              />
              <svg
                className="absolute left-3 top-8 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
          
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-600">Sorry, no posts match your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(([postId, post]) => (
                <Link 
                  key={postId} 
                  href={`/tufts/posts/${postId}`}
                  className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image 
                      src={post.imageUrl} 
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.author}</span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <svg 
                        className="h-4 w-4 mr-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      {viewCounts[postId]} views
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}