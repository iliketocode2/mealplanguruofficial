'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
          <Link href="/">
              <img src="/logo.svg" alt="Logo" className="h-8" />
            </Link>
            <Link 
              href="/" 
              className={`${pathname === '/' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 px-3 py-2`}
            >
              Home
            </Link>
            <Link 
              href="/school" 
              className={`${pathname === '/school' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 px-3 py-2`}
            >
              School
            </Link>
            <Link 
              href="/about" 
              className={`${pathname === '/about' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 px-3 py-2`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`${pathname === '/contact' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 px-3 py-2`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}