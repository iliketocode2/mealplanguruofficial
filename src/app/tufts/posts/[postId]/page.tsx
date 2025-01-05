'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { posts } from '@/app/lib/tuftsposts';
import Link from 'next/link';
import { Post } from '@/app/lib/types';

export default function BlogPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});
  const router = useRouter();

  useEffect(() => {
    if (postId) {
      const foundPost = posts[postId as keyof typeof posts];
      if (foundPost) {
        setPost(foundPost);
        // Increment view count when post is viewed
        fetch(`/api/tufts/posts/${postId}/incrementViewCount`, {
          method: 'POST',
        });
      } else {
        router.push('/tufts/posts');
      }
      setLoading(false);
    }
  }, [postId, router]);

  useEffect(() => {
    const fetchViewCounts = async () => {
      const counts: Record<string, number> = {};
      const postIds = Object.keys(posts);

      for (const id of postIds) {
        const response = await fetch(`/api/tufts/posts/${id}/viewCount`);
        const data = await response.json();
        counts[id] = data.viewCount;
      }

      setViewCounts(counts);
    };

    fetchViewCounts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  // Get the top 3 posts by view count
  const popularPosts = Object.entries(posts)
    .filter(([id]) => id !== postId)
    .sort(([idA], [idB]) => (viewCounts[idB] || 0) - (viewCounts[idA] || 0))
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4">
      <article className="prose lg:prose-xl">
        <h1>{post.title}</h1>
        <p>Views: {viewCounts[postId] || 0}</p>
        <div>{post.content}</div>
      </article>

      <aside className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Most Popular Posts</h2>
        <div className="grid gap-4">
          {popularPosts.map(([id, popularPost]) => (
            <Link href={`/tufts/posts/${id}`} key={id} className="block">
              <div className="border p-4 rounded hover:shadow-lg transition">
                <h3 className="font-bold">{popularPost.title}</h3>
                <p>{popularPost.content.substring(0, 50)}...</p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}