'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { posts } from '@/app/lib/tuftsposts';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/app/lib/types';
import { Eye } from 'lucide-react';

const formatViewCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1).replace(/\.0$/, '')}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`
  }
  return count.toString()
}

export default function BlogPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});
  const [popularPosts, setPopularPosts] = useState<Array<[string, Post]>>([]);
  const router = useRouter();

  const generateAuthorId = (author: string) => {
    return author.toLowerCase().replace(/\s+/g, '_');
  };

  useEffect(() => {
    const minLoadingTime = 500; // ms
    const loadStart = Date.now();

    const fetchData = async () => {
      if (!postId) return;

      try {
        // Fetch current post data
        const foundPost = posts[postId as keyof typeof posts];
        if (!foundPost) {
          router.push('/tufts/posts');
          return;
        }

        // Increment view count
        await fetch(`/api/tufts/posts/${postId}/incrementViewCount`, {
          method: 'POST',
        });

        // Fetch all posts' view counts
        const counts: Record<string, number> = {};
        const postIds = Object.keys(posts);
        
        await Promise.all(
          postIds.map(async (id) => {
            try {
              const response = await fetch(`/api/tufts/posts/${id}/viewCount`);
              if (!response.ok) throw new Error('Failed to fetch view count');
              const data = await response.json();
              counts[id] = data.viewCount;
            } catch (error) {
              console.error(`Error fetching view count for post ${id}:`, error);
              counts[id] = 0;
            }
          })
        );

        // Calculate popular posts
        const popular = Object.entries(posts)
          .filter(([id]) => id !== postId)
          .sort(([idA], [idB]) => (counts[idB] || 0) - (counts[idA] || 0))
          .slice(0, 3);

        // Ensure minimum loading time for smooth UX
        const timeElapsed = Date.now() - loadStart;
        if (timeElapsed < minLoadingTime) {
          await new Promise(r => setTimeout(r, minLoadingTime - timeElapsed));
        }

        setPost(foundPost);
        setViewCounts(counts);
        setPopularPosts(popular);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId, router]);

  if (loading) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  if (!post) return null;

  return (
    <div className="min-h-screen bg-primary-400">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2 rounded-xl shadow-lg overflow-hidden bg-primary-100 ">
            {/* Main section with background image */}
            <div className="relative">
              {/* Background image container */}
              <div className="absolute inset-0">
                <Image 
                  src={post.imageUrl} 
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Content container with gradient */}
              <div className="relative z-10 bg-gradient-to-b from-black/60 to-black/80">
                {/* Back to posts link */}
                <div className="p-6">
                  <Link
                    href="/tufts/posts"
                    className="inline-block group text-white"
                  >
                    ← All Posts
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
                  </Link>
                </div>
                
                {/* Title and metadata */}
                <div className="p-6 pt-0">
                  <h1 className="text-4xl font-bold mb-3 text-white break-words">{post.title}</h1>
                  <div className="flex flex-wrap items-center gap-2 text-gray-200 text-sm">
                    <Link 
                      href="/about"
                      className="hover:text-primary-400 transition-colors duration-200"
                    >
                      By {post.author}
                    </Link>
                    <span>|</span>
                    <time>{post.date}</time>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {formatViewCount(viewCounts[postId] || 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ensure minimum height for short content */}
              <div className="absolute inset-0 z-0 min-h-[16rem]"></div>
            </div>
            
            {/* Article content */}
            <div className="p-6">
              <div className="prose max-w-none text-gray-800 text-base/loose">
                  {post.content.map((paragraph, index) => (
                    <p className="mb-5" key={index}>{paragraph}</p>
                  ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-1.5 bg-white text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <aside className="lg:col-span-1 bg-primary-100 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Popular Posts</h2>
            <div className="space-y-4">
              {popularPosts.map(([id, popularPost], index) => (
                <Link 
                  href={`/tufts/posts/${id}`} 
                  key={id}
                  className="block group"
                >
                <div className="bg-white pl-6 border border-gray-200 rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:border-indigo-200">
                  <div className="flex items-start space-x-4 relative">

                    {/* Image container */}
                    <div className="flex-none relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-white">
                        <Image
                          src={popularPost.imageUrl}
                          alt={popularPost.title}
                          width={100}
                          height={100}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Popular Number */}
                      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 border-white border-2 rounded-full flex items-center justify-center text-xl font-bold text-white">
                        {index + 1}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                        {popularPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {popularPost.content.join(' ').substring(0, 100)}...
                      </p>
                      <div className="text-sm text-gray-500 mt-2">
                        {viewCounts[id] || 0} views
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}