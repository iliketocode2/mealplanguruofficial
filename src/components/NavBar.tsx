'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Update menu height whenever the menu content changes or when opened/closed
  useEffect(() => {
    try {
      if (menuRef.current) {
        // Get the actual content height
        const height = menuRef.current.scrollHeight;
        setMenuHeight(height);
        setError(null);
      }
    } catch (err) {
      setError('Failed to calculate menu height');
      console.error('Menu height calculation error:', err);
    }
  }, [isOpen]); // Re-run when menu opens/closes

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      try {
        if (menuRef.current && isOpen) {
          setMenuHeight(menuRef.current.scrollHeight);
        }
      } catch (err) {
        setError('Failed to update menu height on resize');
        console.error('Resize handling error:', err);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.svg" 
                width={180}
                height={50}
                className="object-contain w-[180px] h-auto"
                priority 
                alt="Logo"/>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/school', label: 'Find Your School' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${pathname === link.href 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="block md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <svg 
                className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <div 
        id="mobile-menu"
        className={`
          block md:hidden transition-all duration-300 ease-in-out bg-white
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        style={{ 
          height: isOpen ? `${menuHeight}px` : '0',
          overflow: 'hidden'
        }}
        role="navigation"
      >
        <div 
          ref={menuRef}
          className={`
            px-2 pt-2 pb-3 space-y-1 sm:px-3
            transform transition-transform duration-300
            ${isOpen ? 'translate-y-0' : '-translate-y-4'}
          `}
        >
          {error && (
            <div className="text-red-600 px-3 py-2 text-sm">
              {error}
            </div>
          )}
          
          {[
            { href: '/', label: 'Home' },
            { href: '/school', label: 'Find Your School' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' }
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                block px-3 py-2 rounded-md text-base font-medium 
                transition-colors duration-200
                ${pathname === link.href 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}
              `}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}