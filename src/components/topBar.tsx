import React from 'react';

interface TopBarProps {
  title?: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function TopBar({ title = "Printhub", isDarkMode, onToggleTheme }: TopBarProps) {
  return (
    <div className="bg-primary-container pb-2 transition-colors duration-300 w-full">
      
      <div className="flex p-3 px-6 justify-between items-end self-stretch">
       
        <span className="text-sm font-medium tracking-wide">9:30</span>
        
        <div className="flex items-center gap-1.5">

          <span className="material-icons text-[18px]">signal_cellular_alt</span>
        
          <span className="material-icons text-[18px] rotate-90">battery_full</span>
        </div>
      </div>

      <header className="flex h-16 px-2 pr-4 pl-4 justify-between items-center">
        <h1 className="text-xl text-on-secondary-container tracking-tight">
          {title}
        </h1>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={onToggleTheme}
            className="flex items-center justify-center text-on-secondary-container hover:bg-on-secondary-container/10 rounded-full  transition-colors cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            <span className="material-icons filled text-[24px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          
          <button 
            className="flex items-center justify-center text-on-secondary-container hover:bg-on-secondary-container/10 rounded-full cursor-pointer"
            aria-label="User Profile"
          >
            <span className="material-icons text-[28px]">account_circle</span>
          </button>
        </div>
      </header>
    </div>
  );
}