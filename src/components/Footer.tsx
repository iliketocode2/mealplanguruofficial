import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Column 1: Main Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Schools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Find Your School</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/school" className="hover:text-gray-300">
                  All Schools
                </Link>
              </li>
              <li>
                <Link href="/tufts" className="font-light text-sm hover:text-gray-300">
                  Tufts
                </Link>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>
                    <Link href="/tufts/posts" className="font-extralight text-xs hover:text-gray-400">
                      Tufts Posts
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Column 3: Footer Bottom */}
          <div className="text-sm text-gray-400">
            <Link href="/" className="flex items-center mb-2">
              <img src="/logo.svg" alt="Logo" className="h-12 w-auto" />
            </Link>
            <p>&copy; {currentYear} MealPlanGuru. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
