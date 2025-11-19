import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import TopBar from './TopBar';
import NavBar from "./NavBar";
import type { TabId } from "./NavBar"
import ScreenContainer from './ScreenContainer';

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  activeTab?: TabId;             
  onTabChange?: (tab: TabId) => void; 
}

export default function MobileLayout({ 
  children, 
  title = "Printhub", 
  activeTab = "files",       
  onTabChange = () => {}  
}: MobileLayoutProps) {
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="w-full h-full md:h-[850px] md:w-[400px] bg-surface md:rounded-3xl md:shadow-2xl overflow-hidden flex flex-col relative border-outline-variant md:border-8 transition-colors duration-300">
      
      <TopBar 
        title={title} 
        isDarkMode={isDarkMode} 
        onToggleTheme={() => setIsDarkMode(!isDarkMode)} 
      />

      <ScreenContainer>
        {children}
      </ScreenContainer>

      <div className="absolute bottom-0 w-full z-20">
        <NavBar activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  );
}