'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { posts } from '@/app/lib/tuftsposts';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/app/lib/types';

// Skeleton loading component for a single post
const PostSkeleton = () => (
  <div className="animate-pulse">
    <div className="relative w-full h-48 bg-gray-200 rounded mb-4" /> {/* Image placeholder */}
    <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" /> {/* Title */}
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" /> {/* Date */}
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" /> {/* Author */}
    <div className="space-y-3"> {/* Content */}
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </div>
  </div>
);

// Skeleton for popular posts sidebar
const PopularPostsSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-6 bg-gray-200 rounded w-1/2" /> {/* Section title */}
    {[1, 2, 3].map((i) => (
      <div key={i} className="space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4" /> {/* Post title */}
        <div className="h-4 bg-gray-200 rounded w-1/2" /> {/* Post excerpt */}
      </div>
    ))}
  </div>
);

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PostSkeleton />
          </div>
          <aside className="lg:col-span-1">
            <PopularPostsSkeleton />
          </aside>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2">
          <Image 
            src={post.imageUrl} 
            alt={post.title}
            width={800}
            height={400}
            className="rounded-lg mb-6"
            priority
          />
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600 mb-2">{post.date}</div>
          <div className="text-gray-600 mb-4">
            <Link href={`/about#${generateAuthorId(post.author)}`} className="text-blue-500 hover:underline">
              {post.author}
            </Link>
          </div>
          <div className="mb-4">Views: {viewCounts[postId] || 0}</div>
          <div className="prose max-w-none">{post.content}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>

        <aside className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-6">Popular Posts</h2>
          <div className="space-y-6">
            {popularPosts.map(([id, popularPost]) => (
              <Link 
                href={`/tufts/posts/${id}`} 
                key={id}
                className="block group"
              >
                <div className="border rounded-lg p-4 transition-shadow hover:shadow-lg">
                  <h3 className="font-bold mb-2 group-hover:text-blue-600">
                    {popularPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {popularPost.content.substring(0, 100)}...
                  </p>
                  <div className="text-sm text-gray-500 mt-2">
                    Views: {viewCounts[id] || 0}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}