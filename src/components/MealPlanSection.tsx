import Link from 'next/link';
import { plans } from '@/app/lib/tuftsplans'

export default function MealPlanSection() {
    return (
        <div>  
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
        </div>
    );
}