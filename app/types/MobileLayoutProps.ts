// Define the allowed tabs for the bottom navigation
export type Tab = 'files' | 'orders';

// Define the allowed views/pages in the prototype
export type View = 'Home' | 'AddFiles' | 'Staging' | 'PrintConfig' | 'Payment' | 'Success' | 'Orders';

export interface MobileLayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  onAddFilesClick: () => void;
  onTabChange: (tab: Tab) => void;
  currentView: View;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onBack: () => void;
}