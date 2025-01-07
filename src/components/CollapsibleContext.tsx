'use client';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type CollapsibleContextType = {
  expandedSections: Record<string, boolean>;
  toggleSection: (title: string) => void;
  expandSection: (title: string) => void;
  resetSections: () => void;
};

const CollapsibleContext = createContext<CollapsibleContextType | undefined>(undefined);

export function CollapsibleProvider({ children }: { children: React.ReactNode }) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Reset sections on mount
  useEffect(() => {
    setExpandedSections({});
  }, []);

  const toggleSection = useCallback((title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  }, []);

  const expandSection = useCallback((title: string) => {
    setExpandedSections(prev => {
      if (prev[title]) return prev;
      return {
        ...prev,
        [title]: true
      };
    });
  }, []);

  const resetSections = useCallback(() => {
    setExpandedSections({});
  }, []);

  return (
    <CollapsibleContext.Provider value={{ 
      expandedSections, 
      toggleSection, 
      expandSection,
      resetSections 
    }}>
      {children}
    </CollapsibleContext.Provider>
  );
}

export const useCollapsible = () => {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error('useCollapsible must be used within a CollapsibleProvider');
  }
  return context;
};