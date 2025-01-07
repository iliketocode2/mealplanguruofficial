'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

export default function About() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-max bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: About Us */}
          <div className="col-span-1 bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">About Us</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              I love eating food, so I made this platform to help students enjoy their dining experience. From
              meal plan optimization to exploring food options, our goal is to make college dining effortless and enjoyable.
            </p>
            <Link
              href="/contact"
              className="block mt-6 px-6 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Contact Our Team
            </Link>
          </div>

          {/* Right Column: Team Members */}
          <div className="col-span-2 space-y-6">

            {/* William Goldman */}
            <div id="william_goldman" className="bg-blue-50 rounded-3xl shadow-lg p-8 transform">
              <h2 className="text-3xl font-bold mb-2 text-blue-800">William Goldman</h2>
              <p className="text-sm text-blue-600 mb-4 font-semibold">Founder & Developer</p>
              <p className="text-gray-700 leading-relaxed">
                William Goldman is a junior majoring in Sociology with a minor in Environmental Studies at Tufts University. Known for his adventurous palate, he has a deep appreciation for sustainability in food systems. William is passionate about helping his peers make informed choices about meal plans that align with their habits and values.
              </p>
            </div>

            {/* Anonymous Contributors */}
            <div className="bg-blue-50 rounded-3xl shadow-lg p-8 transform">
              <h2 className="text-3xl font-bold mb-2 text-blue-800">Anonymous Contributors</h2>
              <p className="text-sm text-blue-600 mb-4 font-semibold">Bloggers & Photographers</p>
              <p className="text-gray-700 leading-relaxed">
                Thanks to all of our anonymous contributors!
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
