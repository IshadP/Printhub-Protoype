"use client";

import React from 'react';
import Icon from './Icon';



const StatusBar = () => (
  // Use surface-container-low for status bar background
  <div className="flex pt-4 pb-2
   px-4 justify-between items-center w-full bg-color-surface-container-low text-color-on-surface-variant font-material-themelabelmedium h-8">
    <span className="font-material-themelabellarge">9:30</span>
    
    <div className="flex items-center gap-1.5">
      <Icon name="signal_cellular_alt" size={24} />
      <Icon name="battery_full" size={24} className="rotate-90" />
    </div>
  </div>
);

const TopBar = ({ 
  title, 
  isDarkMode, 
  onToggleTheme, 
  onBack,
  showBackButton
}) => {
  return (
    <header className="sticky top-0 z-20 w-full bg-primary-container transition-colors duration-300">
      <StatusBar />
      <div className="flex h-16 items-center px-4 justify-between">
        
        {/* Left Side: Back Button or App Title */}
        <div className="flex items-center gap-2">
            {showBackButton ? (
                <button 
                    onClick={onBack}
                    className="p-2 rounded-full text-color-on-surface hover:bg-color-surface-container transition-colors cursor-pointer"
                    aria-label="Back"
                >
                    <Icon name="arrow_back" size={24} />
                </button>
            ) : (
                // App Logo/Title on Home View
                <h1 className="text-color-primary font-material-headlinesmall">
                    Printhub
                </h1>
            )}

            {/* Dynamic Title (Shown when navigating to a specific view) */}
            {showBackButton && (
                <span className="text-color-on-surface font-material-themetitlelarge truncate max-w-[200px]">
                    {title}
                </span>
            )}

        </div>
        
        {/* Right Side: Actions */}
        <div className="flex items-center gap-1">
          {/* Dark Mode Toggle */}
          <button 
            onClick={onToggleTheme}
            className="p-2 rounded-full text-color-on-surface-variant hover:bg-color-surface-container transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            <Icon 
              name={isDarkMode ? 'dark_mode' : 'light_mode'} 
              size={24} 
              filled={isDarkMode} 
            />
          </button>
          
          {/* User Profile */}
          <button 
            className="p-2 rounded-full text-color-on-surface-variant hover:bg-color-surface-container transition-colors cursor-pointer"
            aria-label="User Profile"
          >
            <Icon name="account_circle" size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;