import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Hero section */}
            <div className="relative h-64">
              <Image 
                src="/images/tufts_dining.jpg" 
                alt="Tufts Dining"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80">
                <div className="absolute bottom-0 p-8">
                  <h1 className="text-4xl font-bold mb-3 text-white">
                    Bringing a Student's Perspective to Meal Planning
                  </h1>
                  <p className="text-lg text-gray-200">
                    Written by students, for students.
                  </p>
                </div>
              </div>
            </div>

            {/* Content section */}
            <div className="p-8">
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Meal Plan Guru is a website that helps students find the best meal plan for their needs at their school. 
                Providing news, updates, reviews, and opinions about your meal plan and how best to use it.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Find Your School</h3>
                  <p className="text-gray-600">
                    Start by browsing our database of schools and meal plans
                  </p>
                  <Link 
                    href="/school"
                    className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Find School
                  </Link>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Learn More</h3>
                  <p className="text-gray-600">
                    Discover our mission and meet our team of student writers
                  </p>
                  <Link 
                    href="/about"
                    className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}