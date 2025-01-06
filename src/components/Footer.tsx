import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer bg-gray-800 text-white py-8">
      <div className="footer-content max-w-6xl mx-auto px-4">
        <div className="footer-links border-b border-gray-600 pb-5 mb-2 text-lg">
          <ul className="flex justify-center space-x-8">
            <li className="relative">
              <div className="group">
                <Link href="/" className="inline-block">
                  Home
                </Link>
                <span className="absolute left-0 bottom-0 block w-0 group-hover:w-full transition-all duration-500 h-0.5 bg-white"></span>
              </div>
            </li>
            <li className="relative">
              <div className="group">
                <Link href="/school" className="inline-block">
                  Find Your School
                </Link>
                <span className="absolute left-0 bottom-0 block w-0 group-hover:w-full transition-all duration-500 h-0.5 bg-white"></span>
              </div>
            </li>
            <li className="relative">
              <div className="group">
                <Link href="/about" className="inline-block">
                  About
                </Link>
                <span className="absolute left-0 bottom-0 block w-0 group-hover:w-full transition-all duration-500 h-0.5 bg-white"></span>
              </div>
            </li>
            <li className="relative">
              <div className="group">
                <Link href="/contact" className="inline-block">
                  Contact
                </Link>
                <span className="absolute left-0 bottom-0 block w-0 group-hover:w-full transition-all duration-500 h-0.5 bg-white"></span>
              </div>
            </li>
          </ul>
        </div>
        <div className="text-center footer-copyright text-sm mt-5">
          <p>&copy; 2025 MealPlanGuru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}