import React from 'react';
import { MobileLayoutProps, View, Tab } from '../types/MobileLayoutProps';
import TopBar from './TopBar';
import NavBar from './NavBar';

const MobileLayoutWrapper: React.FC<MobileLayoutProps> = ({
  children,
  activeTab,
  onAddFilesClick,
  onTabChange,
  currentView,
  isDarkMode,
  onToggleTheme,
  onBack,
}) => {
  
  // Dynamic Title Logic
  const getTitle = (view: View) => {
    switch (view) {
        case 'Home': return 'My Files';
        case 'AddFiles': return 'Add New File';
        case 'Staging': return 'Review & Configure';
        case 'PrintConfig': return 'Print Settings';
        case 'Payment': return 'Checkout';
        case 'Success': return 'Order Complete';
        case 'Orders': return 'Order History';
        default: return 'Printhub';
    }
  };

  // Determine if back button should be shown
  const showBackButton = currentView !== 'Home' && currentView !== 'Orders';

  // Determine if NavBar should be shown (hide on final stages like Payment/Success)
  const showNavBar = currentView === 'Home' || currentView === 'Orders' || currentView === 'Staging';

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-color-surface-dim font-sans text-color-on-surface">
      {/* Top Bar (fixed header) */}
      <TopBar 
        title={getTitle(currentView)} 
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onBack={onBack}
        showBackButton={showBackButton}
      />

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto w-full relative">
        <div className="min-h-full w-full"> 
           {children}
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      {showNavBar && (
        <NavBar activeTab={activeTab} onTabChange={onTabChange} />
      )}
    </div>
  );
};

export default MobileLayoutWrapper;