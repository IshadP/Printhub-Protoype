import React from 'react';
import Icon from './Icon';
import { Tab } from '../types/MobileLayoutProps';

interface NavBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

interface NavItemProps {
  icon: string;
  label: string;
  tab: Tab;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-1 flex-col items-center justify-center gap-1 py-1 cursor-pointer group"
      aria-selected={active}
      role="tab"
    >
      {/* Icon Container: Pill shape when active, using Secondary color scheme */}
      <div 
        className={`
          flex items-center justify-center rounded-full w-16 h-8 transition-all duration-300
          ${active ? 'bg-color-secondary-container' : 'bg-transparent'}
        `}
      >
        <Icon 
          name={icon} 
          filled={active} 
          className={`
            transition-colors duration-300
            ${active ? 'text-color-on-secondary-container' : 'text-color-on-surface-variant'}
          `}
          size={24}
        />
      </div>

      {/* Label */}
      <span 
        className={`
          font-material-themelabelmedium 
          transition-colors duration-300 mt-0.5
          ${active ? 'text-color-on-surface' : 'text-color-on-surface-variant'}
        `}
      >
        {label}
      </span>
    </button>
  );
};

const NavBar: React.FC<NavBarProps> = ({ activeTab, onTabChange }) => {
  return (
    // Fixed at bottom, separated from main content by a shadow
    <div className="w-full bg-color-surface-container-lowest shadow-[0_-2px_4px_rgba(0,0,0,0.05)] z-10">
        {/* Navigation Items */}
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

export default NavBar;