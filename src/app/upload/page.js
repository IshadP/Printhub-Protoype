'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from "../components/topbar";
import Icon from "../components/Icon";
import ItemCard from "../components/ItemCard";
import Button from "../components/Button";
import BottomSheet from "../components/BottomSheet";
import Navbar from "../components/navbar";
import { useStorage } from "../context/StorageContext";

// Mock file generator
const generateMockFiles = (count = 1) => {
    const types = ['application/pdf', 'image/jpeg', 'application/msword'];
    const names = ['Project_Report_Final.pdf', 'Vacation_Photo.jpg', 'Resume_2024.docx', 'Lab_Manual.pdf'];

    return Array.from({ length: count }).map((_, i) => ({
        id: `temp-${Date.now()}-${i}`,
        name: names[Math.floor(Math.random() * names.length)],
        type: types[Math.floor(Math.random() * types.length)],
        size: Math.floor(Math.random() * 5000000) + 100000,
        pages: Math.floor(Math.random() * 20) + 1,
        date: new Date().toISOString(),
        config: {
            copies: 1,
            color: false,
            pages: 'all',
            doubleSide: 'off',
            orientation: 'portrait'
        }
    }));
};

export default function UploadPage() {
    const router = useRouter();
    const { addFiles } = useStorage();
    const [stagedFiles, setStagedFiles] = useState([]);
    const [editingFileId, setEditingFileId] = useState(null);

    // Simulate file picker on mount
    useEffect(() => {
        if (stagedFiles.length === 0) {
            setStagedFiles(generateMockFiles(2));
        }
    }, []);

    const handleRemove = (id) => {
        setStagedFiles(prev => prev.filter(f => f.id !== id));
    };

    const handleEdit = (id) => {
        setEditingFileId(id);
    };

    const handleSaveConfig = (id, newConfig) => {
        setStagedFiles(prev => prev.map(f =>
            f.id === id ? { ...f, config: { ...f.config, ...newConfig } } : f
        ));
    };

    const handleUploadAll = () => {
        const filesToUpload = stagedFiles.map(f => ({
            ...f,
            id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }));

        addFiles(filesToUpload);
        router.push('/');
    };

    const editingFile = stagedFiles.find(f => f.id === editingFileId);

    return (
        <div className="flex min-h-screen items-center justify-center bg-surface-dim">
            <div className="aspect-270/600 border-2 h-[90vh] rounded-3xl overflow-hidden relative flex flex-col justify-start top-0 bg-primary-container shadow-2xl">
                <TopBar
                    title="Printhub"
                    showBackButton={false}
                />

                <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-4">
                    {/* Sub-header with Title and Change Files button */}
                    <div className="flex justify-between items-center mt-4">
                        <h2 className="font-material-titlemedium text-on-surface-variant font-bold text-green-800">Add Files</h2>
                        <button
                            onClick={() => setStagedFiles(prev => [...prev, ...generateMockFiles(1)])}
                            className="bg-primary hover:bg-green-600 text-white px-4 py-1.5 rounded-full font-material-labelmedium transition-colors"
                        >
                            Change Files
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        {stagedFiles.map(file => (
                            <ItemCard
                                key={file.id}
                                file={file}
                                onEdit={handleEdit}
                                onDelete={handleRemove}
                                // Mock selection props since they are required by ItemCard internal logic for some styles
                                selectionMode={false}
                                selected={false}
                                onSelect={() => { }}
                                onLongPress={() => { }}
                            />
                        ))}
                    </div>
                </div>

                <BottomSheet
                    isOpen={!!editingFileId}
                    onClose={() => setEditingFileId(null)}
                    file={editingFile}
                    onSave={handleSaveConfig}
                />

                <div className="px-4 mb-4 mt-auto">
                    <Button
                        onClick={handleUploadAll}
                        fullWidth
                        className="py-6"
                    >
                        <Icon name="upload" size={24} />
                        <p className="font-material-titlemedium text-on-primary">Upload All files</p>
                    </Button>
                </div>

                <Navbar />
            </div>
        </div>
    );
}

