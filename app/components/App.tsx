'use client';

import React, { useState } from 'react';
import LandingPage from './LandingPage';
import ProxiesSite from './ProxiesSite';
import MPCSection from './MPCSection';
import { ContentData, SearchIndexItem } from '@/lib/content';

export type SectionType = 'landing' | 'proxies' | 'mpc';

interface AppProps {
  initialContent?: ContentData[];
  initialSearchIndex?: SearchIndexItem[];
}

export default function App({ initialContent = [], initialSearchIndex = [] }: AppProps) {
  const [currentSection, setCurrentSection] = useState<SectionType>('landing');

  const handleNavigateToSection = (section: 'proxies' | 'mpc') => {
    setCurrentSection(section);
  };

  const handleNavigateToLanding = () => {
    setCurrentSection('landing');
  };

  // Render the appropriate section based on current state
  switch (currentSection) {
    case 'landing':
      return (
        <LandingPage 
          onNavigateToSection={handleNavigateToSection}
        />
      );
    
    case 'proxies':
      return (
        <ProxiesSite 
          initialContent={initialContent}
          initialSearchIndex={initialSearchIndex}
          onNavigateBack={handleNavigateToLanding}
        />
      );
    
    case 'mpc':
      return (
        <MPCSection 
          onNavigateBack={handleNavigateToLanding}
        />
      );
    
    default:
      return (
        <LandingPage 
          onNavigateToSection={handleNavigateToSection}
        />
      );
  }
}