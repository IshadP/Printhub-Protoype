// File: app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import MobileLayoutWrapper from "./components/MobileLayoutWrapper";
import { Tab, View } from "./types/MobileLayoutProps";
import { getInitialTheme, applyTheme } from "./utils/theme";
import PrintConfigPage from "./components/PrintConfigPage";
import { OrientationMode } from "./components/OrientationToggle";
import { DuplexMode } from "./components/Doublesided";
import Icon from "./components/Icon";
import Button from "./components/Button";
import QuickPrintItem from "./components/QuickPrintItem"; 

// --- Mock Data ---
interface File {
    id: string;
    name: string;
    pages: number;
    size: string;
    selected: boolean;
}

const mockFiles: File[] = [
    // { id: '1', name: 'MyFile_v3.pdf', pages: 12, size: '2.4MB', selected: false },
    // { id: '2', name: 'Resume_2024.docx', pages: 1, size: '150KB', selected: false },
];
// --- End Mock Data ---


// Mock Components for other views to simulate routing

/**
 * The main Home Screen View showing Quick Print and User Files.
 */
const HomeView: React.FC<{ 
    onViewChange: (view: View) => void;
    onAddFilesClick: () => void;
    onPrintFilesClick: () => void;
    onQuickPrint: (fileName: string) => void; // NEW PROP
    files: File[];
}> = ({ onViewChange, onAddFilesClick, onPrintFilesClick, onQuickPrint, files }) => {

    const hasFiles = files.length > 0;
    // Assume only files marked as 'selected' count for printing. 
    // Since QuickPrint auto-selects, it should immediately enable 'Print Files'.
    const hasSelectedFiles = files.some(f => f.selected); 

    return (
        <div className="flex flex-col h-full relative">
            <div className="flex-1 overflow-y-auto px-4 pb-24"> 
                {/* 1. Quick Print Section */}
                <h3 className="font-material-themetitlemedium text-color-on-surface pt-4 pb-2">Quick Print</h3>
                <div className="flex space-x-3 overflow-x-auto pb-4 hide-scrollbar">
                    <div className="flex space-x-3 min-w-max">
                        {/* Use onQuickPrint handler */}
                        <QuickPrintItem 
                            label="Admission Form.pdf" 
                            onClick={() => onQuickPrint('Admission Form.pdf')}
                        />
                        <QuickPrintItem 
                            label="Admit Card Form.pdf" 
                            onClick={() => onQuickPrint('Admit Card Form.pdf')}
                        />
                        <QuickPrintItem 
                            label="Fee Receipt.pdf" 
                            onClick={() => onQuickPrint('Fee Receipt.pdf')}
                        />
                    </div>
                </div>

                {/* 2. Your Files Section */}
                <h3 className="font-material-themetitlemedium text-color-on-surface pt-4 pb-2">Your Files</h3>

                {hasFiles ? (
                    // RENDER FILE LIST HERE (for next steps)
                    <div className="bg-color-surface-container rounded-xl p-4 shadow-md">
                        {/* Mock file list content */}
                        {files.map(file => (
                             <div 
                                key={file.id} 
                                className={`p-3 rounded-lg flex justify-between items-center transition-colors ${file.selected ? 'bg-color-secondary-container/50' : 'hover:bg-color-surface-container-low'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon name={file.selected ? "check_box" : "check_box_outline_blank"} size={24} className={file.selected ? "text-color-primary" : "text-color-on-surface-variant"}/>
                                    <span className="font-material-themetitlesmall truncate max-w-[200px]">{file.name}</span>
                                </div>
                                <span className="font-material-themebodysmall text-color-on-surface-variant">{file.pages} pages</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Empty State: Tap the "+ Add Files" button
                    <div className="bg-color-surface-container-high rounded-xl p-8 flex items-center justify-center text-color-primary font-material-themetitlelarge min-h-64 shadow-inner">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <Icon name="note_add" size={40} className="text-color-primary" />
                            <p className="font-material-themebodymedium text-color-on-surface-variant max-w-[240px]">
                                Tap the "+ Add Files" button to get started. All your documents will appear here.
                            </p>
                        </div>
                    </div>
                )}
            </div>
            
            {/* 3. Sticky Action Buttons (Always visible at the bottom of HomeView) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-4 bg-color-surface-dim/95 backdrop-blur-sm shadow-[0_-4px_6px_rgba(0,0,0,0.05)]">
                <Button 
                    label="Add Files" 
                    icon="add" 
                    onClick={onAddFilesClick}
                    className="flex-1 min-h-12 bg-color-secondary-container text-color-on-secondary-container hover:bg-color-secondary"
                />
                <Button 
                    label="Print Files" 
                    icon="print" 
                    onClick={onPrintFilesClick}
                    className="flex-1 min-h-12"
                    disabled={!hasSelectedFiles}
                />
            </div>
        </div>
    );
};

const OrdersView = () => (
    <div className="p-4 flex flex-col space-y-4">
        <h2 className="font-material-themeheadlinemedium text-color-on-surface">Order History</h2>
        <div className="bg-color-surface-container-high rounded-xl p-4 flex flex-col gap-3 min-h-64 shadow-inner">
            <div className="bg-color-surface-container rounded-lg p-3 shadow-sm font-material-themebodymedium">
                Order #1234 - Delivered (15 items)
            </div>
            <div className="bg-color-surface-container rounded-lg p-3 shadow-sm font-material-themebodymedium">
                Order #1233 - Completed (2 items)
            </div>
            <p className="text-color-on-surface-variant font-material-themebodysmall text-center pt-4">End of list</p>
        </div>
    </div>
);


export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('files');
  const [currentView, setCurrentView] = useState<View>('Home'); // Changed to 'Home' to start on the correct screen
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [files, setFiles] = useState<File[]>(mockFiles); // State for files

  // Print Configuration State (Remains here for persistence across screens)
  const [orientation, setOrientation] = useState<OrientationMode>('portrait');
  const [duplexMode, setDuplexMode] = useState<DuplexMode>('longside');
  const [isColor, setIsColor] = useState(true);
  const [isStapled, setIsStapled] = useState(false);
  const [copies, setCopies] = useState(1);
  
  // Theme initialization
  useEffect(() => {
    const initialTheme = getInitialTheme();
    setIsDarkMode(initialTheme === 'dark');
    applyTheme(initialTheme);
  }, []);

  // Handlers

  const handleToggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    applyTheme(newTheme);
  };
  
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'files') {
      setCurrentView('Home');
    } else {
      setCurrentView('Orders');
    }
  };

  const handleBack = () => {
    switch (currentView) {
        case 'PrintConfig':
        case 'Staging':
        case 'AddFiles':
            setCurrentView('Home');
            break;
        case 'Payment':
            setCurrentView('PrintConfig');
            break;
        default:
            // For Home/Orders, back button is hidden.
            break;
    }
  };
  
  const handleConfirmSettings = () => {
    setCurrentView('Payment');
  };
  
  const handleAddFilesClick = () => {
    // Mocking the file picker. Does not add a file on click, just changes view.
    setCurrentView('AddFiles');
  }
  
  const handlePrintFilesClick = () => {
      setCurrentView('PrintConfig');
  }

  /**
   * Handles clicking a Quick Print button: adds a mock file to the list 
   * and immediately navigates to PrintConfig.
   */
  const handleQuickPrint = (fileName: string) => {
    const newFile: File = {
        id: crypto.randomUUID(), // Use a unique ID
        name: fileName,
        pages: Math.floor(Math.random() * 10) + 1, // Random pages 1-10
        size: `${(Math.random() * 5).toFixed(1)}MB`,
        selected: true, // Auto-select the file
    };
    
    // Add new file, ensure it's selected, and deselect any previously selected files if needed (optional logic, keeping it simple here)
    setFiles(prevFiles => [newFile, ...prevFiles.map(f => ({ ...f, selected: false }))]); 
    
    // Navigate to print configuration for this new file
    setCurrentView('PrintConfig');
  };


  // View Renderer
  const renderContent = () => {
    switch (currentView) {
      case 'Home':
        return (
            <HomeView 
                onViewChange={setCurrentView} 
                onAddFilesClick={handleAddFilesClick}
                onPrintFilesClick={handlePrintFilesClick}
                onQuickPrint={handleQuickPrint} // PASS NEW HANDLER
                files={files}
            />
        );
      case 'PrintConfig':
        return (
          <PrintConfigPage 
            orientation={orientation}
            duplexMode={duplexMode}
            isColor={isColor}
            isStapled={isStapled}
            copies={copies}
            setOrientation={setOrientation}
            setDuplexMode={setDuplexMode}
            setIsColor={setIsColor}
            setIsStapled={setIsStapled}
            setCopies={setCopies}
            onConfirm={handleConfirmSettings}
          />
        );
      case 'Orders':
        return <OrdersView />;
      case 'Payment':
        return (
            <div className="p-6 text-center bg-color-surface-container-low mx-4 mt-4 rounded-3xl shadow-md">
                <Icon name="credit_card" size={48} className="text-color-primary mb-4" />
                <h3 className="font-material-themetitlelarge text-color-on-surface">Mock Payment Gateway</h3>
                <p className="font-material-themebodymedium text-color-on-surface-variant mt-2">
                    Total: ${ (copies * 0.15 * (isColor ? 2 : 1)).toFixed(2) }
                </p>
                <div className="mt-6">
                    <button
                        onClick={() => setCurrentView('Success')}
                        className="w-full bg-color-primary text-color-on-primary rounded-full py-3 font-material-themelabellarge shadow-lg transition hover:bg-color-primary-container hover:text-color-on-primary-container"
                    >
                        Confirm Payment
                    </button>
                </div>
            </div>
        );
      case 'Success':
        return (
            <div className="p-6 text-center bg-color-surface-bright mx-4 mt-4 rounded-3xl shadow-lg">
                <Icon name="check_circle" size={80} className="text-color-primary mb-4" filled={true}/>
                <h3 className="font-material-themeheadlinemedium text-color-on-surface">Order Placed!</h3>
                <p className="font-material-themebodylarge text-color-on-surface-variant mt-2">
                    Your print order is being processed and will be ready for pickup shortly.
                </p>
                <button
                    onClick={() => setCurrentView('Home')}
                    className="mt-6 bg-color-secondary-container text-color-on-secondary-container rounded-full px-6 py-2 font-material-themelabellarge shadow-md"
                >
                    Back to Home
                </button>
            </div>
        );
      case 'AddFiles':
          return (
              <div className="p-6 text-center bg-color-surface-container-high mx-4 mt-4 rounded-3xl shadow-md">
                <Icon name="upload_file" size={48} className="text-color-on-surface mb-4" />
                <h3 className="font-material-themetitlelarge text-color-on-surface">Select Files to Upload</h3>
                <p className="font-material-themebodymedium text-color-on-surface-variant mt-2">
                    (Mock file picker UI would go here)
                </p>
                <button
                    onClick={() => setCurrentView('Home')}
                    className="mt-6 bg-color-outline-variant text-color-on-surface rounded-full px-6 py-2 font-material-themelabellarge shadow-md"
                >
                    Cancel
                </button>
            </div>
          )
      default:
        return <div className="p-4 font-material-themebodysmall text-color-error">Error: View not implemented: {currentView}</div>;
    }
  };

  return (
    <MobileLayoutWrapper
      activeTab={activeTab}
      onAddFilesClick={handleAddFilesClick}
      onTabChange={handleTabChange}
      currentView={currentView}
      isDarkMode={isDarkMode}
      onToggleTheme={handleToggleTheme}
      onBack={handleBack}
    >
      {renderContent()}
    </MobileLayoutWrapper>
  );
}