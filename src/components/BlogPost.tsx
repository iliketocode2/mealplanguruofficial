import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/app/lib/types'

interface BlogPostProps extends Post {
  variant?: 'summary' | 'detailed'
}

export default function BlogPost({ 
  title, 
  date, 
  content, 
  author, 
  imageUrl, 
  tags, 
  variant = 'detailed' 
}: BlogPostProps) {
  const generateAuthorId = (author: string) => {
    return author.toLowerCase().replace(/\s+/g, '_')
  }

  return (
    <div className={`post-item ${variant}`}>
      <div className="post-image">
        <Image 
          src={imageUrl} 
          alt={title}
          width={400}
          height={300}
          priority
        />
      </div>
      <div className="right">
        <h3>{title}</h3>
        <p className="date">{date}</p>
        <p>
          <Link href={`/about#${generateAuthorId(author)}`}>{author}</Link>
        </p>
        <p>{content}</p>
        <div className="tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}