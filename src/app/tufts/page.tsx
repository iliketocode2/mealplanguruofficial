import Image from 'next/image'
import Link from 'next/link'
import { plans } from '@/app/lib/tuftsplans'
import { posts } from '@/app/lib/tuftsposts'
import MealPlanCalculator from '@/components/MealPlanCalculator';


export default function Tufts() {
  const recentPosts = Object.entries(posts)
    .sort(([, postA], [, postB]) => 
      new Date(postB.date).getTime() - new Date(postA.date).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <header className="flex justify-between items-center bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900">Tufts</h1>
          <div className="flex space-x-4">
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Handy Resources</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
                  <div className="logo_of_the_app w-8 h-8 bg-blue-100 rounded-full" />
                  <p className="text-gray-700">Tufts Mobile App</p>
                </div>
                <a href="https://dining.tufts.edu/" 
                   target="_blank" 
                   rel="noreferrer"
                   className="block p-3 text-blue-600 hover:bg-gray-50 rounded-md transition-colors">
                  Tufts Dining
                </a>
                <a href="#meal-plans" 
                   className="block p-3 text-blue-600 hover:bg-gray-50 rounded-md transition-colors">
                  Meal Plans
                </a>
                <a href="#places-eat" 
                   className="block p-3 text-blue-600 hover:bg-gray-50 rounded-md transition-colors">
                  Places To Eat
                </a>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-lg shadow-sm p-6">
              <Link href="/tufts/posts" className="inline-block mb-4">
                <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  Recent Posts
                </h2>
              </Link>
              <div className="space-y-4">
                {recentPosts.map(([postId, post]) => (
                  <div key={postId} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    {postId ? (
                      <Link href={`/tufts/posts/${postId}`} 
                            className="block hover:bg-gray-50 p-3 -mx-3 rounded-md transition-colors">
                        <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                        <p className="text-sm text-gray-600">{post.author}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ) : (
                      <p className="text-gray-500">Post ID is not available</p>
                    )}
                  </div>
                ))}
              </div>
              <Link href="/tufts/posts" 
                    className="inline-block mt-4 text-blue-600 hover:text-blue-700 transition-colors">
                See More →
              </Link>
            </section>
          </div>
        </div>

        <section id="meal-plans" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Meal Plans</h2>

          <div className="mb-8">
            <MealPlanCalculator plans={plans} />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-2">{plan.details}</p>
                <p className="text-lg font-bold text-gray-900 mb-2">{plan.price}</p>
                <p className="text-gray-600 mb-4">{plan.extra}</p>
                <Link href={`/tufts/posts?tag=${plan.tag}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors">
                  See Related Posts →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section id="places-eat" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Places to Eat</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Dining Halls</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                  <h4>
                    <a href="https://dining.tufts.edu/where-to-eat/dewick-macphie-dining-center" 
                       target="_blank" 
                       rel="noreferrer"
                       className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      Dewick MacPhie
                    </a>
                  </h4>
                  <p className="text-gray-600 mt-2">description</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                  <h4>
                    <a href="https://dining.tufts.edu/where-to-eat/fresh-carmichael-dining-center" 
                       target="_blank" 
                       rel="noreferrer"
                       className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      Carmichael
                    </a>
                  </h4>
                  <p className="text-gray-600 mt-2">description</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Retail Locations</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'Hodgdon', url: 'hodgdon-food-on-the-run' },
                  { name: 'Kindlevan Cafe', url: 'kindlevan-cafe' },
                  { name: 'Mugar Cafe', url: 'mugar-cafe' },
                  { name: 'Hotung Cafe', url: 'hotung-cafe' },
                  { name: 'Commons Marketplace', url: 'commons-marketplace' },
                  { name: 'Pax et Lox', url: 'pax-et-lox' },
                  { name: 'Tower Cafe', url: 'tower-cafe' }
                ].map((location) => (
                  <div key={location.name} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                    <h4>
                      <a href={`https://dining.tufts.edu/where-to-eat/${location.url}`}
                         target="_blank"
                         rel="noreferrer"
                         className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                        {location.name}
                      </a>
                    </h4>
                    <p className="text-gray-600 mt-2">description</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Other Locations</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                  <h4>
                    <a href="https://dining.tufts.edu/where-to-eat/smfa-cafe"
                       target="_blank"
                       rel="noreferrer"
                       className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                      SMFA Cafe
                    </a>
                  </h4>
                  <p className="text-gray-600 mt-2">description</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}