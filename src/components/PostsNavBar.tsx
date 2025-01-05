'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function PostsNavBar() {
  const pathname = usePathname()
  const pathnames = pathname?.split('/').filter((x) => x) || []

  return (
    <div className="posts-nav-bar">
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        return (
          <span key={to}>
            {' / '}
            {isLast ? (
              <span>{value}</span>
            ) : (
              <Link href={to}>{value}</Link>
            )}
          </span>
        )
      })}
    </div>
  )
}