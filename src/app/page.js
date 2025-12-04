'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "./components/navbar";
import TopBar from "./components/topbar";
import QuickPrintCard from "./components/QuickPrintCard";
import ItemCard from "./components/ItemCard";
import Button from "./components/Button";
import BottomSheet from "./components/BottomSheet";
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
    updateFileConfig
  } = useStorage();

  const [editingFileId, setEditingFileId] = useState(null);

  const handleQuickPrint = () => {
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
      <div className="aspect-270/600 border-2 h-[90vh] rounded-3xl overflow-hidden relative flex flex-col bg-surface-bright shadow-2xl">
        <TopBar
          title={isSelectionMode ? `${cart.length} Selected` : "Printhub"}
          showBackButton={isSelectionMode}
          onBack={exitSelectionMode}
        />

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {files.length === 0 ? (
            <div className="flex flex-col gap-6 mt-10">
              <QuickPrintCard onClick={handleQuickPrint} />
              <div className="text-center text-on-surface-variant font-material-bodylarge">
                No files in inventory
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-material-titlemedium text-on-surface">My Files</h2>
                <button onClick={handleQuickPrint} className="text-primary font-material-labelmedium">
                  + Add File
                </button>
              </div>
              <div className="flex flex-col gap-2 pb-20">
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

        {/* Floating Action Button for Print */}
        {isSelectionMode && cart.length > 0 && (
          <div className="absolute bottom-24 left-0 right-0 px-4 flex justify-center z-10">
            <Button
              className="shadow-lg"
              icon="print"
              onClick={handlePrintSelected}
            >
              Print ({cart.length})
            </Button>
          </div>
        )}

        <BottomSheet
          isOpen={!!editingFileId}
          onClose={() => setEditingFileId(null)}
          file={editingFile}
          onSave={handleSaveConfig}
        />

        <Navbar />
      </div>
    </div>
  );
}
