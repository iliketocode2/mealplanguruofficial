'use client';
import { useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useCollapsible } from './CollapsibleContext';

interface CollapsibleSectionProps {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  className?: string;
}

const CollapsibleSection = ({
  title,
  defaultExpanded = false,
  children,
  className = ''
}: CollapsibleSectionProps) => {
  const { expandedSections, toggleSection, expandSection } = useCollapsible();
  const sectionRef = useRef<HTMLDivElement>(null);
  const initializeRef = useRef(false);

  // Handle default expanded state only once on mount
  useEffect(() => {
    if (!initializeRef.current && defaultExpanded) {
      expandSection(title);
      initializeRef.current = true;
    }
  }, [defaultExpanded, title, expandSection]);

  // Handle hash changes
  useEffect(() => {
    const checkHash = () => {
      if (typeof window === 'undefined') return;
      
      const hash = window.location.hash;
      if (!hash) return;

      // Remove the # from the hash
      const targetId = hash.slice(1);
      
      // Check if this section contains the target element
      if (sectionRef.current?.querySelector(`#${targetId}`)) {
        expandSection(title);
        
        requestAnimationFrame(() => {
          const element = document.getElementById(targetId);
          if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: elementPosition - 160,
              behavior: 'smooth'
            });
          }
        });
      }
    };

    // Check hash on mount
    checkHash();
    
    // Add listener for hash changes
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [title, expandSection]);

  const isExpanded = expandedSections[title] || false;

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`} ref={sectionRef}>
      <button
        onClick={() => toggleSection(title)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        {isExpanded ? (
          <ChevronUp className="h-6 w-6 text-gray-500" />
        ) : (
          <ChevronDown className="h-6 w-6 text-gray-500" />
        )}
      </button>
      <div
        className={`transition-all duration-200 ease-in-out ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-6 pt-0">{children}</div>
      </div>
    </div>
  );
};

export default CollapsibleSection;