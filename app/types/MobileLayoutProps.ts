export interface MobileLayoutProps {
  children: React.ReactNode;
  activeTab: 'files' | 'orders';
  onAddFilesClick: () => void;
  onTabChange: (tab: 'files' | 'orders') => void;
  currentView: View;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onBack: () => void;
}