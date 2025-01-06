'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function School() {
  return (
    <div className="bg-gray-100 min-h-screen text-black">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Find Your School</h1>
        
        <div className="flex justify-center flex-wrap gap-8 p-8">
          {/* Tufts - Active School */}
          <Link 
            href="/tufts" 
            className="flex flex-col items-center no-underline text-inherit transform transition-transform duration-200 hover:scale-105"
          >
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden relative bg-white shadow-md ring-2 ring-blue-500">
              <Image
                src="/images/tufts.png"
                alt="Tufts University"
                width={200}
                height={200}
                priority
                className="object-cover w-full h-full"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
              />
            </div>
            <span className="mt-2 text-lg font-medium">Tufts</span>
          </Link>

          {/* Harvard - Coming Soon */}
          <div className="flex flex-col items-center opacity-70 cursor-not-allowed">
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden relative bg-white shadow-md">
              <Image
                src="/images/harvard.png"
                alt="Harvard University"
                width={200}
                height={200}
                className="object-cover w-full h-full"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
              />
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <span className="text-white font-bold">Coming Soon</span>
              </div>
            </div>
            <span className="mt-2 text-lg font-medium">Harvard</span>
          </div>

          {/* Boston University - Coming Soon */}
          <div className="flex flex-col items-center opacity-70 cursor-not-allowed">
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden relative bg-white shadow-md">
              <Image
                src="/images/bu.jpg"
                alt="Boston University"
                width={200}
                height={200}
                className="object-cover w-full h-full"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
              />
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <span className="text-white font-bold">Coming Soon</span>
              </div>
            </div>
            <span className="mt-2 text-lg font-medium">Boston University</span>
          </div>
        </div>
      </div>
    </div>
  );
}