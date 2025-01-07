import { diningLocations } from '@/app/lib/diningLocations';
import DiningLocationCard from '@/components/DiningLocationCard';
import { useMemo } from 'react';

export default function DiningLocationCardWrapper() {
    // Memoize the filtered locations to prevent unnecessary re-renders
    const categorizedLocations = useMemo(() => ({
        diningHalls: diningLocations.filter(location => location.type === 'dining-hall'),
        retailLocations: diningLocations.filter(location => location.type === 'retail'),
        otherLocations: diningLocations.filter(location => location.type === 'other')
    }), []);

    return (
        <div className="space-y-8">
            {categorizedLocations.diningHalls.length > 0 && (
                <div>
                    <h3 className="text-xl font-medium mb-4 text-gray-900">Dining Halls</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {categorizedLocations.diningHalls.map(location => (
                            <DiningLocationCard 
                                key={`dining-hall-${location.name}`} 
                                location={location} 
                            />
                        ))}
                    </div>
                </div>
            )}

            {categorizedLocations.retailLocations.length > 0 && (
                <div>
                    <h3 className="text-xl font-medium mb-4 text-gray-900">Retail Locations</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {categorizedLocations.retailLocations.map(location => (
                            <DiningLocationCard 
                                key={`retail-${location.name}`} 
                                location={location} 
                            />
                        ))}
                    </div>
                </div>
            )}

            {categorizedLocations.otherLocations.length > 0 && (
                <div>
                    <h3 className="text-xl font-medium mb-4 text-gray-900">Other Locations</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {categorizedLocations.otherLocations.map(location => (
                            <DiningLocationCard 
                                key={`other-${location.name}`} 
                                location={location} 
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}