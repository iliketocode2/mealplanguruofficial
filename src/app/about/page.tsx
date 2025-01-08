'use client';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div id="william_goldman">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Making College Dining
                <span className="text-blue-600"> Better</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Hi, I'm William Goldman! I created this platform to help students navigate their dining experience and make informed choices about their meal plans.
              </p>
            </div>
            <div className="relative h-64 md:h-96">
              <Image
                src="/food_images/will_eat.jpg"
                alt="William Goldman"
                fill
                className="object-cover rounded-2xl shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">My Story</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                During my freshman year, I noticed how challenging it was for students to make informed 
                decisions about their meal plans and find the best dining options on campus. I often ran into
                problems where I would misuse my meal swipes or misunderstand how the full meal plan worked.
                This platform was born from a desire to solve these problems and create a student-driven resource 
                for students.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Why This Platform?</h3>
              <p className="text-gray-600 leading-relaxed">
                As a student, I've noticed that we often learn the most from each other and tend to listen more
                closely to our peers. That's why I think a blog written by students, along with a website full 
                of helpful information, is the best way to encourage students to connect and learn more about 
                their meal plans. This platform can help everyone make smarter choices and better understand how 
                their meal plan expenses are divided.
              </p>
            </div>
          </div>

          {/* Staggered Food Images */}
          <div className="relative h-[600px]">
            <div className="absolute top-0 right-0 w-2/3 h-64">
              <Image
                src="/food_images/dewick_meal.jpg"
                alt="Favorite dish 1"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="absolute top-48 left-0 w-2/3 h-64">
              <Image
                src="/food_images/carm_breakfast.jpg"
                alt="Favorite dish 2"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="absolute bottom-0 right-8 w-2/3 h-64">
              <Image
                src="/food_images/dewick_dessert.jpg"
                alt="Favorite dish 3"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Connect</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions or suggestions? I'd love to hear from you!
            </p>

            <div className="flex justify-center space-x-8 mt-4">
              <a href="https://github.com/iliketocode2" target="_blank" rel="noopener noreferrer">
                <Image src="/github-mark.svg" alt="GitHub" width={34} height={34} className="transition-transform duration-200 hover:scale-110"/>
              </a>
              <a href="mailto:goldmanwilliam3@gmail.com">
                <Image src="/email-svg.svg" alt="Email" width={34} height={34} className="transition-transform duration-200 hover:scale-110"/>
              </a>
              <a href="https://www.linkedin.com/in/william-goldman-79125a283/" target="_blank" rel="noopener noreferrer">
                <Image src="/linkedin.svg" alt="LinkedIn" width={34} height={34} className="transition-transform duration-200 hover:scale-110"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}