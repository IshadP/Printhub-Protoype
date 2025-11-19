import { useState } from 'react';
import MobileLayout from './components/MobileLayout';
import type { TabId } from './components/NavBar';

function App() {
  // 1. This state remembers which tab is active (null, 'files', or 'orders')
  const [activeTab, setActiveTab] = useState<TabId>(null);

  // 2. This function decides what content to show based on the state
  const renderContent = () => {
    switch (activeTab) {
      case 'files':
        return (
          <div className="flex flex-col items-center justify-center h-full text-on-surface-variant">
            <span className="material-icons-round text-6xl mb-4 opacity-20">folder_open</span>
            <h2 className="text-xl font-medium text-on-surface">My Files</h2>
            <p className="text-sm opacity-60">No files uploaded yet</p>
          </div>
        );
      case 'orders':
        return (
          <div className="flex flex-col items-center justify-center h-full text-on-surface-variant">
            <span className="material-icons-round text-6xl mb-4 opacity-20">receipt_long</span>
            <h2 className="text-xl font-medium text-on-surface">Orders</h2>
            <p className="text-sm opacity-60">No active orders</p>
          </div>
        );
      default:
        // This is the "Home" screen (when activeTab is null)
        return (
          <>
            <div className="bg-primary-container p-6 rounded-3xl shadow-sm">
              <h2 className="font-material-themeheadlinemedium text-on-primary-container mb-2">
                Printhub
              </h2>
              <p className="font-material-themebodylarge text-on-primary-container opacity-80">
                Tap "+" to start a new print order.
              </p>
            </div>

            <h3 className="font-material-themetitlelarge text-on-surface mt-6 mb-3 px-1">
              Recent
            </h3>
            <div className="bg-surface-container-high p-4 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                 <span className="material-icons-round">description</span>
              </div>
              <div className="flex-1">
                <div className="font-material-themetitlemedium text-on-surface">Guide.pdf</div>
                <div className="font-material-themebodysmall text-on-surface-variant">2.4 MB</div>
              </div>
              <button className="material-icons-round text-on-surface-variant">more_vert</button>
            </div>
          </>
        );
    }
  };

  return (
    // 3. We pass the state (activeTab) and the changer (setActiveTab) down
    <MobileLayout 
      title={activeTab === 'files' ? 'My Files' : activeTab === 'orders' ? 'Orders' : 'Printhub'}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </MobileLayout>
  );
}

export default App;