import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <h1 className="text-8xl font-extrabold">404</h1>
            <h2 className="text-3xl mt-4 font-semibold">Oops! Page Not Found</h2>
            <p className="mt-2 text-lg">The page you are looking for does not exist.</p>
            <Link href="/" className="mt-6 px-4 py-2 bg-white text-blue-500 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
                Go Back to Home
            </Link>
        </div>
    );
}