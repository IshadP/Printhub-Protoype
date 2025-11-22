import React from 'react';
import Icon from './Icon';

interface TopBarProps {
  title: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
}


const StatusBar: React.FC = () => (
  <div className="flex pt-2 pb-2 px-4 justify-between items-end self-stretch bg-color-surface-container-low text-color-on-surface-variant ">
    
    <span className="font-material-themelabellarge">9:30</span>
    
   
    <div className="flex items-center gap-1.5">
    
      <Icon name="signal_cellular_alt" size={24} />
      <Icon name="battery_full" size={24} className="rotate-90" />
    </div>
  </div>
);

const TopBar: React.FC<TopBarProps> = ({ 
  title, 
  isDarkMode, 
  onToggleTheme, 
  onBack,
  showBackButton
}) => {
  return (
    <header className="sticky top-0 z-10 w-full shadow-sm bg-primary-container transition-colors duration-300 pt-4">
      <StatusBar />
      <div className="flex h-16 items-center justify-between p-2">

        <h1 className="text-on-primary-container font-material-themetitlelarge">
          PrintHub
        </h1>
        
        <div className="flex items-center gap-2">

          <button 
            onClick={onToggleTheme}
            className="flex items-center justify-center p-2 rounded-full text-on-primary-container hover:bg-color-primary-container transition-colors cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
  
            <Icon 
              name={isDarkMode ? 'light_mode' : 'light_mode'} 
              size={24} 
              filled={true} 
            />
          </button>
          
          <button 
            className="flex items-center justify-center p-2 rounded-full text-on-primary-container hover:bg-color-surface-container-high transition-colors cursor-pointer"
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