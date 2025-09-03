import { useState } from 'react';

interface MealPeriod {
  name: string;
  time: string;
  value: number;
}

const mealPeriods: MealPeriod[] = [
  { name: 'Breakfast', time: 'Unit Opening - 10:59am', value: 8.84 },
  { name: 'Lunch', time: '11am - 1:59pm', value: 15.09 },
  { name: 'Late Lunch', time: '2pm - 4:59pm', value: 15.09 },
  { name: 'Dinner', time: '5pm - Unit Closing', value: 16.59 },
];

const MealTimes = () => {
  const [hoveredPeriod, setHoveredPeriod] = useState<string | null>(null);

  return (
    <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <p className="text-gray-600 mb-6">
        Use one meal swipe equivalency per meal period in any retail location.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {mealPeriods.map((period) => (
          <div
            key={period.name}
            className="relative overflow-hidden rounded-lg border border-gray-200 transition-all duration-300"
            onMouseEnter={() => setHoveredPeriod(period.name)}
            onMouseLeave={() => setHoveredPeriod(null)}
            style={{
            //   transform: hoveredPeriod === period.name ? 'translateY(-4px)' : 'none',
              boxShadow: hoveredPeriod === period.name ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <div className="bg-blue-50 p-4">
              <h3 className="text-lg font-semibold text-blue-900">{period.name}</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                ${period.value.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-white">
              <p className="text-gray-600 text-sm">{period.time}</p>
            </div>
            {hoveredPeriod === period.name && (
              <div className="absolute inset-0 bg-blue-500 bg-opacity-10 transition-opacity duration-300" />
            )}
          </div>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 mt-6">
        * Each meal period represents when you can use your meal swipe equivalency at retail locations.
      </p>
    </section>
  );
};

export default MealTimes;