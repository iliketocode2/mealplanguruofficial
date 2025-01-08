import Image from 'next/image';
import Link from 'next/link';

const HandyResources = () => {
    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const href = event.currentTarget.getAttribute('href');
        if (!href?.startsWith('#')) return;
    
        const isMobile = window.innerWidth < 1024;
        const targetId = href.slice(1);
        const mobileId = `mobile-${targetId}`;
    
        event.preventDefault();
        const element = document.getElementById(isMobile ? mobileId : targetId);
        
        if (isMobile) {
        window.location.hash = mobileId;
        } else {
        window.location.hash = targetId;
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - 60, // 60px offset from the top
                behavior: 'smooth'
            });
        }
        }
    };
  
    return (
    <div className="space-y-6">
        <div className="space-y-4">
          <div className="p-3 hover:bg-gray-50 rounded-md transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <Image
                src="/images/mobile_order.png"
                alt="Tufts Mobile Order App"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <p className="text-gray-700 font-medium">Tufts Mobile Order App</p>
            </div>
            <div className="flex space-x-4 pl-11">
              <a 
                href="https://apps.apple.com/us/app/transact-mobile-ordering/id1494719529"
                target="_blank"
                rel="noreferrer"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src="/images/app-store-badge.svg"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                  className="h-auto"
                />
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.blackboard.mobileorder&hl=en_US"
                target="_blank"
                rel="noreferrer"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src="/images/google-play-badge.png"
                  alt="Get it on Google Play"
                  width={135}
                  height={40}
                  className="h-auto"
                />
              </a>
            </div>
          </div>
            <div className="flex items-center space-x-3 mb-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
                <Image
                src="/images/tufts_dining_logo.png"
                alt="Tufts Dining Website"
                width={32}
                height={32}
                className="rounded-lg"
                />
                <a href="https://dining.tufts.edu/"
                    target="_blank"
                    rel="noreferrer"
                    className="block p-1 text-gray-700 font-medium">
                    Tufts Dining
                </a>
            </div>
            <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">On This Site</h3>
                <div className="flex flex-wrap gap-3">
                    <Link
                    href="/tufts/posts" 
                    className="block p-2 text-blue-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                    Blog
                    </Link>
                    <a 
                    href="#calculator" 
                    onClick={handleLinkClick}
                    className="block p-2 text-blue-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                    Meal Plan Calculator
                    </a>
                    <a 
                    href="#meal-plans" 
                    onClick={handleLinkClick}
                    className="block p-2 text-blue-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                    Meal Plan Information
                    </a>
                    <a 
                    href="#places-eat" 
                    onClick={handleLinkClick}
                    className="block p-2 text-blue-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                    Places To Eat
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
};

export default HandyResources;