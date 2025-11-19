import React from 'react';
import type { ReactNode } from 'react';
import TopBar from './topBar';
import NavBar from './navBar';
import ScreenContainer from './content';


interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function MobileLayout() {
  return (
    // Outer container: Centers the app on desktop, full width on mobile
    <div className="w-full h-full md:h-[850px] md:w-[400px] bg-white md:rounded-3xl md:shadow-2xl overflow-hidden flex flex-col relative border-gray-200 md:border-8">
     <TopBar/>
     <ScreenContainer/>
     <NavBar activeTab='files'/>
    </div>
  );
}
