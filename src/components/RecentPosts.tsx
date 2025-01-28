import Link from 'next/link';
import Image from 'next/image';
import { posts } from '@/app/lib/tuftsposts';

export default function RecentPosts() {
  const recentPosts = Object.entries(posts)
    .sort(([, postA], [, postB]) => 
      new Date(postB.date).getTime() - new Date(postA.date).getTime())
    .slice(0, 3);

  return (
    <div>
      <div className="space-y-4">
        {recentPosts.map(([postId, post]) => (
          <div key={postId} className="border-b-2 border-gray-100 last:border-0 pb-4 last:pb-0">
            {postId ? (
              <Link href={`/tufts/posts/${postId}`} 
                    className="block hover:bg-gray-50 p-3 -mx-3 rounded-md transition-colors">
                <div className="flex gap-4">
                  {/* Image container */}
                  <div className="flex-none">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  
                  {/* Content container */}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                    <p className="text-sm text-gray-600">{post.author}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <p className="text-gray-500">Post ID is not available</p>
            )}
          </div>
        ))}
      </div>
      <Link href="/tufts/posts" 
            className="inline-block mt-4 text-blue-600 hover:text-blue-700 transition-colors">
        See More →
      </Link>
    </div>
  );
}