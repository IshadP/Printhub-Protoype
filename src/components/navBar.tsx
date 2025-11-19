import React from 'react';

export type TabId = 'files' | 'orders' | null;

interface NavBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function NavBar({ activeTab, onTabChange }: NavBarProps) {
  return (
    <div className="w-full bg-surface border-t border-outline-variant pb-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
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

      {/* Home Indicator */}
      <div className="w-full flex justify-center pb-2 mt-2">
        <div className="w-[108px] h-1 bg-[#1e1e1e] rounded-full opacity-80 dark:bg-white/20"></div>
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
      style={{ flex: '1 0 0' }}
    >
      {/* Icon Container (Pill) */}
      <div className={`
        flex items-center justify-center h-8 w-16 rounded-full transition-colors duration-300
        ${isActive ? 'bg-primary' : 'bg-transparent'}
      `}>
        <span className={`
          text-[24px] transition-colors duration-200 material-icons-round
          ${isActive ? 'text-on-primary-container' : 'text-on-surface-variant'}
        `}>
          {icon}
        </span>
      </div>

      {/* Label */}
      <span className={`
        font-material-themelabelmedium transition-colors duration-200
        ${isActive ? 'text-on-primary-container font-bold' : 'text-on-surface-variant font-medium'}
      `}>
        {label}
      </span>
    </button>
  );
}