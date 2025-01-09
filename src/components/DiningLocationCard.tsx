import Image from 'next/image';
import { Star, StarHalf, MapPin, CreditCard, Info } from 'lucide-react';
import { DiningLocation } from '@/app/lib/types';

const DiningLocationCard = ({ location }: { location: DiningLocation }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const getHref = (url: string) => {
    if (url.startsWith('http')) {
      return url;
    }
    return `https://dining.tufts.edu/where-to-eat/${url}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={location.image}
          alt={location.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h4 className="font-medium text-lg text-gray-900">
          <a
            href={getHref(location.url)}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            {location.name}
          </a>
        </h4>
        <div className="flex items-center gap-1 mt-2">
          {renderStars(location.rating)}
          <span className="text-sm text-gray-600 ml-1">{location.rating.toFixed(1)}</span>
        </div>
        
        {/* Location Address */}
        <div className="flex items-start gap-2 mt-3">
          <MapPin className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
          <p className="text-sm text-gray-600">{location.address}</p>
        </div>

        {/* Payment Methods */}
        <div className="flex items-start gap-2 mt-2 bg-gray-50 rounded-md p-2">
          <CreditCard className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
          <p className="text-sm text-gray-700 font-medium">{location.payment}</p>
        </div>

        {/* Description */}
        <div className="flex items-start gap-2 mt-3 border-t pt-3">
          <Info className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
          <p className="text-sm leading-relaxed text-gray-600">{location.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DiningLocationCard;