import React from 'react';
import Icon from './Icon';
import { MobileLayoutProps } from '../types/MobileLayoutProps';

type Tab = MobileLayoutProps['activeTab'];

interface NavBarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

interface NavItemProps {
  icon: string;
  label: string;
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
      className="flex flex-1 flex-col items-center justify-center gap-1 pt-2 pb-4 cursor-pointer group"
      aria-selected={active}
      role="tab"
    >
      {/* Icon Container: Pill shape when active */}
      <div 
        className={`
          flex items-center justify-center rounded-full w-16 h-8 transition-colors duration-200
          ${active ? 'bg-color-secondary-container' : 'bg-transparent'}
        `}
      >
        <Icon 
          name={icon} 
          // Use filled icon style when active for emphasis
          filled={active} 
          // Active uses 'on-secondary-container' (dark green text on light green bg)
          // Inactive uses 'on-surface-variant' (grey)
          className={`
            transition-colors duration-200
            ${active ? 'text-color-on-secondary-container' : 'text-color-on-surface-variant'}
          `}
          size="md"
        />
      </div>

      {/* Label */}
      <span 
        className={`
          text-xs font-medium transition-colors duration-200
          ${active ? 'text-color-on-surface font-bold' : 'text-color-on-surface-variant'}
        `}
      >
        {label}
      </span>
    </button>
  );
};

const NavBar: React.FC<NavBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full bg-color-surface-container-lowest shadow-[0_-1px_3px_rgba(0,0,0,0.05)] z-20">
        {/* Navigation Items */}
        <nav className="flex w-full justify-around items-center h-20 px-2">
            <NavItem
                icon="folder" // Material icon name for folder
                label="My Files"
                active={activeTab === 'files'}
                onClick={() => onTabChange('files')}
            />
            <NavItem
                icon="person" // Material icon name for person/orders
                label="Orders"
                active={activeTab === 'orders'}
                onClick={() => onTabChange('orders')}
            />
        </nav>

        {/* Home Indicator (Simulated OS Bar) */}
        <div className="flex justify-center pb-2 w-full bg-color-surface-container-lowest">
            <div className="h-1 w-32 rounded-full bg-color-on-surface opacity-80"></div>
        </div>
    </div>
  );
};

export default NavBar;