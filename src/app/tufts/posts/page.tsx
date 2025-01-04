import { posts } from '@/app/lib/tuftsposts'
import Image from 'next/image'

interface Props {
  params: { postId: string }
}

export default function Post({ params }: Props) {
  const post = posts[params.postId]
  
  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <Image 
        src={post.imageUrl}
        alt={post.title}
        width={150}
        height={150}
        priority
      />
      <p>{post.content}</p>
      <div>
        <p>By {post.author}</p>
        <p>{post.date}</p>
      </div>
      <div>
        {post.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </article>
  )
}