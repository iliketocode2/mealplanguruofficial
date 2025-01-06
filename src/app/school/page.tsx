'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function School() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Find Your School
          </h1>
          <p className="text-center text-gray-600 text-lg mb-12">
            Select your university to explore meal plans and dining options
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {/* Tufts - Active School */}
            <Link 
              href="/tufts" 
              className="group relative flex flex-col items-center"
            >
              <div className="w-[200px] h-[200px] rounded-full overflow-hidden bg-white shadow-lg 
                            ring-2 ring-blue-500/50 transition-all duration-300
                            group-hover:ring-4 group-hover:shadow-2xl">
                <Image
                  src="/images/tufts.png"
                  alt="Tufts University"
                  width={200}
                  height={200}
                  priority
                  className="object-cover w-full h-full transition-transform duration-300 
                           group-hover:scale-125"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                />
              </div>
              <span className="mt-4 text-lg font-semibold text-gray-900 transition-colors duration-300
                             group-hover:text-blue-600">
                Tufts University
              </span>
              <span className="mt-1 text-sm text-blue-600 font-medium">
                Available Now
              </span>
            </Link>

            {/* Harvard - Coming Soon */}
            <div className="relative flex flex-col items-center opacity-70">
              <div className="w-[200px] h-[200px] rounded-full overflow-hidden bg-white shadow-lg
                            ring-2 ring-gray-200 relative">
                <Image
                  src="/images/harvard.png"
                  alt="Harvard University"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full filter"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                />
                <div className="absolute inset-0 rounded-full bg-black/60 backdrop-blur-sm 
                              flex flex-col items-center justify-center gap-2">
                  <span className="text-white font-semibold text-lg">Coming Soon</span>
                  <span className="text-gray-300 text-sm">Summer 2025</span>
                </div>
              </div>
              <span className="mt-4 text-lg font-semibold text-gray-600">
                Harvard University
              </span>
              <span className="mt-1 text-sm text-gray-500 font-medium">
                Coming Soon
              </span>
            </div>

            {/* Boston University - Coming Soon */}
            <div className="relative flex flex-col items-center opacity-70">
              <div className="w-[200px] h-[200px] rounded-full overflow-hidden bg-white shadow-lg
                            ring-2 ring-gray-200 relative">
                <Image
                  src="/images/bu.jpg"
                  alt="Boston University"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full filter"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                />
                <div className="absolute inset-0 rounded-full bg-black/60 backdrop-blur-sm 
                              flex flex-col items-center justify-center gap-2">
                  <span className="text-white font-semibold text-lg">Coming Soon</span>
                  <span className="text-gray-300 text-sm">Winter 2025</span>
                </div>
              </div>
              <span className="mt-4 text-lg font-semibold text-gray-600">
                Boston University
              </span>
              <span className="mt-1 text-sm text-gray-500 font-medium">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}