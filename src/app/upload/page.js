'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from "../components/topbar";
import UploadCard from "../components/UploadCard";
import Button from "../components/Button";
import BottomSheet from "../components/BottomSheet";
import { useStorage } from "../context/StorageContext";

// Mock file generator
const generateMockFiles = (count = 1) => {
    const types = ['application/pdf', 'image/jpeg', 'application/msword'];
    const names = ['Project_Report_Final.pdf', 'Vacation_Photo.jpg', 'Resume_2024.docx', 'Lab_Manual.pdf'];

    return Array.from({ length: count }).map((_, i) => ({
        id: `temp-${Date.now()}-${i}`,
        name: names[Math.floor(Math.random() * names.length)],
        type: types[Math.floor(Math.random() * types.length)],
        size: Math.floor(Math.random() * 5000000) + 100000, // 100KB - 5MB
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

    // Simulate file picker on mount (or we could have a button)
    useEffect(() => {
        // For prototype, we auto-add some files to "stage" when entering this view
        // In real app, this would be triggered by an input[type=file]
        if (stagedFiles.length === 0) {
            setStagedFiles(generateMockFiles(3));
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
        // Convert temp IDs to permanent ones if needed, or just keep them
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
            <div className="aspect-270/600 border-2 h-[90vh] rounded-3xl overflow-hidden relative flex flex-col bg-surface-bright shadow-2xl">
                <TopBar
                    title="Upload Files"
                    showBackButton={true}
                    onBack={() => router.back()}
                />

                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-material-titlemedium text-on-surface">Selected Files ({stagedFiles.length})</h2>
                        <button
                            onClick={() => setStagedFiles(prev => [...prev, ...generateMockFiles(1)])}
                            className="text-primary font-material-labelmedium"
                        >
                            + Add More
                        </button>
                    </div>

                    <div className="flex flex-col">
                        {stagedFiles.map(file => (
                            <UploadCard
                                key={file.id}
                                file={file}
                                onRemove={handleRemove}
                                onEdit={handleEdit}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-4 bg-surface-bright border-t border-outline-variant">
                    <Button
                        fullWidth
                        onClick={handleUploadAll}
                        disabled={stagedFiles.length === 0}
                    >
                        Upload All
                    </Button>
                </div>

                <BottomSheet
                    isOpen={!!editingFileId}
                    onClose={() => setEditingFileId(null)}
                    file={editingFile}
                    onSave={handleSaveConfig}
                />
            </div>
        </div>
    );
}
