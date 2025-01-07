import Image from 'next/image';
import { Star, StarHalf } from 'lucide-react';
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
            href={`https://dining.tufts.edu/where-to-eat/${location.url}`}
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
        <p className="text-sm text-gray-600 mt-2">{location.address}</p>
        <p className="text-sm text-gray-700 mt-2">{location.description}</p>
      </div>
    </div>
  );
};

export default DiningLocationCard;