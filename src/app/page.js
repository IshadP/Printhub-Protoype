'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "./components/navbar";
import TopBar from "./components/topbar";
import QuickPrintCard from "./components/QuickPrintCard";
import ItemCard from "./components/ItemCard";
import BottomSheet from "./components/BottomSheet";
import ActionButtons from "./components/ActionButtons";
import { useStorage } from "./context/StorageContext";

export default function Home() {
  const router = useRouter();
  const {
    files,
    isSelectionMode,
    cart,
    toggleSelection,
    enterSelectionMode,
    exitSelectionMode,
    updateFileConfig,
    addFiles
  } = useStorage();

  const [editingFileId, setEditingFileId] = useState(null);

  const handleQuickPrint = (type) => {
    const newFile = {
      id: `quick-${Date.now()}`,
      name: type === 'admission' ? 'Admission Form.pdf' : 'Admit Card Form.pdf',
      type: 'application/pdf',
      size: 1024 * 1024, // 1MB dummy size
      pages: 2,
      date: new Date().toISOString(),
      config: {
        copies: 1,
        color: false,
        pages: 'all',
        doubleSide: 'off',
        orientation: 'portrait'
      }
    };
    addFiles([newFile]);
  };

  const handleUpload = () => {
    router.push('/upload');
  };

  const handlePrintSelected = () => {
    router.push('/scan');
  };

  const handleEdit = (id) => {
    setEditingFileId(id);
  };

  const handleSaveConfig = (id, newConfig) => {
    updateFileConfig(id, newConfig);
  };

  const editingFile = files.find(f => f.id === editingFileId);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-dim">
      <div className="aspect-270/600 border-2 h-[90vh] rounded-3xl overflow-hidden relative flex flex-col justify-start top-0 bg-primary-container shadow-2xl">
        <TopBar
          title={isSelectionMode ? `${cart.length} Selected` : "Printhub"}
          showBackButton={isSelectionMode}
          onBack={exitSelectionMode}
        />

        <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-4">
          {files.length === 0 ? (
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex flex-col gap-4">
                <h2 className="font-material-titlemedium text-on-surface">Quick Print</h2>
                <div className="grid grid-rows-1 grid-flow-col gap-2 overflow-x-auto pb-4">
                  <div className="flex gap-1 h-full flex-col border-outline rounded-3xl overflow-hidden w-[22rem]">
                    <div className="w-full ">
                      <QuickPrintCard
                        title="Admission Form"
                        onClick={() => handleQuickPrint('admission')}
                      />
                    </div>
                    <div className="w-full">
                      <QuickPrintCard
                        title="Admit Card Form"
                        onClick={() => handleQuickPrint('admit')}
                      />
                    </div>
                  </div>
                  {/* Add more items here to test bleeding */}
                  <div className="flex gap-1 h-full flex-col border-outline rounded-3xl overflow-hidden w-[22rem]">
                    <div className="w-full">
                      <QuickPrintCard
                        title="Exam Schedule"
                        onClick={() => handleQuickPrint('exam')}
                      />
                    </div>
                    <div className="w-full">
                      <QuickPrintCard
                        title="Result Sheet"
                        onClick={() => handleQuickPrint('result')}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center text-on-surface-variant font-material-bodylarge mt-4">
                No files in inventory
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-6 mt-4">
                <div className="flex flex-col gap-4">
                  <h2 className="font-material-titlemedium text-on-surface">Quick Print</h2>
                  <div className="grid grid-rows-1 grid-flow-col gap-2 overflow-x-auto pb-4">
                    <div className="flex gap-1 h-full flex-col border-outline rounded-3xl overflow-hidden w-[22rem]">
                      <div className="w-full ">
                        <QuickPrintCard
                          title="Admission Form"
                          onClick={() => handleQuickPrint('admission')}
                        />
                      </div>
                      <div className="w-full">
                        <QuickPrintCard
                          title="Admit Card Form"
                          onClick={() => handleQuickPrint('admit')}
                        />
                      </div>
                    </div>
                    {/* Add more items here to test bleeding */}
                    <div className="flex gap-1 h-full flex-col border-outline rounded-3xl overflow-hidden w-[22rem] ">
                      <div className="w-full">
                        <QuickPrintCard
                          title="Exam Schedule"
                          onClick={() => handleQuickPrint('exam')}
                        />
                      </div>
                      <div className="w-full">
                        <QuickPrintCard
                          title="Result Sheet"
                          onClick={() => handleQuickPrint('result')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-material-titlemedium text-on-surface">My Files</h2>
              </div>
              <div className="flex flex-col gap-1 rounded-3xl overflow-hidden">
                {files.map(file => (
                  <ItemCard
                    key={file.id}
                    file={file}
                    selectionMode={isSelectionMode}
                    selected={cart.includes(file.id)}
                    onSelect={toggleSelection}
                    onLongPress={enterSelectionMode}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Floating Action Buttons */}


        <BottomSheet
          isOpen={!!editingFileId}
          onClose={() => setEditingFileId(null)}
          file={editingFile}
          onSave={handleSaveConfig}
        />
        <div className="flex justify-center pointer-events-none py-4 w-full">
          <ActionButtons
            onAdd={handleUpload}
            onPrint={handlePrintSelected}
            selectedCount={cart.length}
          />
        </div>
        <Navbar />
      </div>
    </div>
  );
}
