import React from 'react';


export default function Navbar(){
  return (
    // Fixed at bottom, separated from main content by a shadow
    <div className="w-full bg-color-surface-container-lowest shadow-[0_-2px_4px_rgba(0,0,0,0.05)] z-10">
        <nav className="flex w-full justify-around items-start h-20 pt-2">
            <NavItem
                icon="folder_copy"
                label="My Files"
                tab="files"
                active={activeTab === 'files'}
                onClick={() => onTabChange('files')}
            />
            <NavItem
                icon="receipt"
                label="Orders"
                tab="orders"
                active={activeTab === 'orders'}
                onClick={() => onTabChange('orders')}
            />
        </nav>

        {/* Simulated OS Home Indicator Bar */}
        <div className="flex justify-center pb-2 w-full bg-color-surface-container-lowest">
            <div className="h-1 w-32 rounded-full bg-color-on-surface/50"></div>
        </div>
    </div>
  );
};
