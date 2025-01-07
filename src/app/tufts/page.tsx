'use client';
import Image from 'next/image'
import Link from 'next/link'
import { plans } from '@/app/lib/tuftsplans'
import MealPlanCalculator from '@/components/MealPlanCalculator'
import HandyResources from '@/components/HandyResources'
import RecentPosts from '@/components/RecentPosts'
import MealPlanSection from '@/components/MealPlanSection'
import DiningLocationCardWrapper from '@/components/DiningLocationCardWrapper'
import CollapsibleSection from '@/components/CollapsibleSection';
import { useState, useEffect } from 'react'
import { CollapsibleProvider } from '@/components/CollapsibleContext';

export default function Tufts() {
  // Use client-side rendering for the dining locations
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const PlacesToEatSection = () => (
    <div className="space-y-6">
      {isMounted && <DiningLocationCardWrapper />}
    </div>
  )

  return (
    <div className="min-h-screen bg-primary-400 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner */}
        <div className="flex justify-center mb-8">
          <Link href="/tufts">
            <Image 
              src="/images/tufts-logo-png-white.png"
              alt="Back to Tufts"
              width={300} 
              height={200}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4">
          <CollapsibleProvider>
            <CollapsibleSection title="Quick Resources">
              <HandyResources />
            </CollapsibleSection>

            <CollapsibleSection title="Recent Posts">
              <RecentPosts />
            </CollapsibleSection>

            <CollapsibleSection title="Meal Plan Information">
              <div className="max-h-[700px] overflow-y-auto" id="mobile-meal-plans">
                <MealPlanSection />
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Meal Plan Calculator">
              <div className="max-h-[700px] overflow-y-auto" id="mobile-calculator">
                <MealPlanCalculator plans={plans} />
              </div>
            </CollapsibleSection>
            
            <CollapsibleSection title="Places to Eat">
              <div className="max-h-[700px] overflow-y-auto" id="mobile-places-eat">
                <PlacesToEatSection />
              </div>
            </CollapsibleSection>

          </CollapsibleProvider>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:block">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="lg:w-1/3 flex flex-col">
              <div className="mb-6">
                <section className="bg-primary-100 rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">Handy Resources for Students</h2>
                  <HandyResources />
                </section>
              </div> 
              
              <section className="bg-primary-100 rounded-lg shadow-sm p-6 flex-grow">
                <div className="space-y-4">
                  <Link href="/tufts/posts" className="inline-block mb-0">
                    <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      Recent Posts
                    </h2>
                  </Link>
                  <RecentPosts />
                </div>
              </section>
            </aside>

            {/* Main content */}
            <main className="lg:w-2/3 space-y-6">
              <section className="bg-primary-100 rounded-lg shadow-sm p-6" id="meal-plans" >
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">Meal Plans</h2>
                <MealPlanSection />
              </section>

              <section className="bg-primary-100 rounded-lg shadow-sm p-6" id="calculator">
                <div className="max-h-[700px] overflow-y-auto">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-900">Meal Plan Calculator</h2>
                  <MealPlanCalculator plans={plans} />
                </div>
              </section>
            </main>
          </div>

          <section className="bg-primary-100 rounded-lg shadow-sm p-6 space-y-6 mt-6" id="places-eat">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Places to Eat</h2>
              <PlacesToEatSection />
          </section>
        </div>
      </div>
    </div>
  )
}