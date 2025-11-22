import React from 'react';
import { MobileLayoutProps } from '../types/MobileLayoutProps';
import TopBar from './TopBar';
import NavBar from './NavBar';
import Icon from './Icon';

const MobileLayout: React.FC<MobileLayoutProps & { currentView: string }> = ({
  children,
  activeTab,
  onAddFilesClick,
  onTabChange,
  currentView,
  isDarkMode,
  onToggleTheme,
  onBack,
}) => {
  // Determine if the FAB should be visible
  // Show FAB only on 'files' tab and main views (Home), hide on sub-views
  const showFab = activeTab === 'files' && (currentView === 'Home' || currentView === 'Staging');

  // Dynamic Title Logic
  const getTitle = () => {
    switch (currentView) {
        case 'Home': return 'My Files';
        case 'AddFiles': return 'Add New File';
        case 'Staging': return 'Staging';
        case 'PrintConfig': return 'Print Settings';
        case 'Payment': return 'Payment';
        case 'Success': return 'Success';
        case 'Orders': return 'Order History';
        default: return 'Printhub';
    }
  };

  // Determine if back button should be shown
  const showBackButton = currentView !== 'Home' && currentView !== 'Orders';

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-color-surface-dim font-sans text-color-on-surface">
      {/* Top Bar */}
      <TopBar 
        title={getTitle()} 
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onBack={onBack}
        showBackButton={showBackButton}
      />

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto w-full relative">
        {/* Content Container with padding if needed */}
        <div className="min-h-full w-full">
           {children}
        </div>
      </main>

      {/* Bottom Navigation Bar (Fixed at bottom) */}
      <NavBar activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default MobileLayout;