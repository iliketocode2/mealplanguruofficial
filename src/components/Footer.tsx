import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="footer bg-gray-800 text-white py-8">
            <div className="footer-content max-w-6xl mx-auto px-4">
                <div className="footer-links border-b border-gray-600 pb-2 mb-2">
                    <ul className="flex justify-center space-x-4">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/school">Find Your School</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="text-center footer-copyright">
                    <p>&copy; 2025 MealPlanGuru. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}