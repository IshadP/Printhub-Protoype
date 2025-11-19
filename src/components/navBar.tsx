import React from 'react';

export type TabId = 'files' | 'orders';

interface NavBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function NavBar({ activeTab, onTabChange }: NavBarProps) {
  return (
    <div className="w-full bg-surface border-t border-outline-variant pb-2">
      <div className="flex w-full">
        <NavButton 
          isActive={activeTab === 'files'} 
          onClick={() => onTabChange('files')}
          label="My Files"
          icon="folder"
        />
        
        <NavButton 
          isActive={activeTab === 'orders'} 
          onClick={() => onTabChange('orders')}
          label="Orders"
          icon="person"
        />
      </div>

      {/* Home Indicator (The black bar at the bottom) */}
      <div className="w-full flex justify-center pb-2 mt-2">
        <div className="w-[108px] h-1 bg-[#1e1e1e] rounded-full opacity-80"></div>
      </div>
    </div>
  );
}

interface NavButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
  icon: string;
}

function NavButton({ isActive, onClick, label, icon }: NavButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="flex-1 flex flex-col justify-center items-center gap-1 pt-3 pb-4 cursor-pointer transition-colors duration-200"
      style={{
        flex: '1 0 0', // From your instructions
      }}
    >
      {/* Icon Container (The Pill) */}
      <div className={`
        flex items-center justify-center h-8 w-16 rounded-full transition-colors duration-300
        ${isActive ? 'bg-primary' : 'bg-transparent'}
      `}>
        <span className={`
          text-[24px] transition-colors duration-200
          ${isActive ? 'text-on-primary-container material-icons' : 'text-on-surface-variant material-icons-outlined'}
        `}>
          {icon}
        </span>
      </div>

      {/* Label */}
      <span className={`
        font-material-themelabellarge transition-colors duration-200
        ${isActive ? 'text-on-primary-container font-bold' : 'text-on-surface-variant'}
      `}>
        {label}
      </span>
    </button>
  );
}