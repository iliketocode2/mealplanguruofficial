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
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-8 text-center">
              <h1 className="text-4xl font-bold mb-4 text-gray-900">About Us</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                I love eating food so I made this so other students can enjoy eating food too.
              </p>
              <Link 
                href="/contact" 
                className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Contact Our Team
              </Link>
            </div>
          </div>

          {/* Team members section */}
          <div className="space-y-6">
            {/* William Goldman */}
            <div 
              id="william_goldman" 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02]"
            >
              <div className="border-l-4 border-indigo-600 p-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">William Goldman</h2>
                <p className="text-gray-600 leading-relaxed">
                  William Goldman is a junior majoring in Sociology with a minor in Environmental Studies at Tufts University. 
                  Known for her adventurous palate, she has a deep appreciation for sustainability in food systems. 
                  Sam loves exploring Tufts dining options and experimenting with healthy, eco-friendly meals using 
                  JumboCash at local eateries. When she's not analyzing social patterns in the classroom, you can 
                  find her writing about the intersection of college dining and student lifestyles on her blog. 
                  Sam is passionate about helping her peers make informed choices about meal plans that align with 
                  their habits and values.
                </p>
              </div>
            </div>

            {/* Elliot Smith */}
            <div 
              id="elliot_smith" 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02]"
            >
              <div className="border-l-4 border-indigo-600 p-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Elliot Smith</h2>
                <p className="text-gray-600 leading-relaxed">
                  Elliot Smith is a senior studying Mechanical Engineering with a focus on renewable energy. 
                  A self-proclaimed foodie, Elliot brings an analytical mindset to everything, including his 
                  dining choices. As a proud advocate for the 160 Plan, he enjoys balancing his time between 
                  late-night dining hall runs and local café visits using JumboCash. Elliot's blog posts often 
                  delve into the economics and efficiency of Tufts meal plans, offering data-driven advice for 
                  fellow students. Outside of class, he enjoys hiking and testing out creative recipes in his 
                  off-campus kitchen.
                </p>
              </div>
            </div>

            {/* Priya Shah */}
            <div 
              id="priya_shah" 
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02]"
            >
              <div className="border-l-4 border-indigo-600 p-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Priya Shah</h2>
                <p className="text-gray-600 leading-relaxed">
                  Priya Shah is a sophomore majoring in English and Film Studies. As an on-campus resident, 
                  she's an expert at navigating Tufts' dining halls and making the most of her meal swipes. 
                  Priya's love for storytelling shines through in her blog, where she shares relatable anecdotes 
                  about meal prep mishaps and her quest to find the best coffee on campus. A big fan of the 
                  Unlimited Plan, Priya appreciates the convenience of grabbing meals between film screenings 
                  and writing workshops. When she's not blogging, she's likely working on her screenplay or 
                  hosting movie nights with friends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}