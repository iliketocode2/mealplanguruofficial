import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="footer bg-gray-800 text-white py-8">
            <div className="footer-content max-w-6xl mx-auto px-4">
                <div className="footer-logo">
                    <Link href="/">
                        <Image src="/logo.svg" className="App-logo" alt="logo" width={100} height={100} /> {/* Adjust width and height as needed */}
                    </Link>
                </div>
                <div className="footer-links">
                    <ul className="flex space-x-4">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/school">Find Your School</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-copyright">
                    <p>&copy; 2025 MealPlanGuru. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}