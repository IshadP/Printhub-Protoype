'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from "../components/topbar";
import ItemCard from "../components/ItemCard"; // Reusing ItemCard for list
import Button from "../components/Button";
import BottomSheet from "../components/BottomSheet";
import Icon from "../components/Icon";
import { useStorage } from "../context/StorageContext";

const PrinterInfoCard = () => (
    <div className="bg-surface-bright p-2 rounded-2xl flex flex-col gap-4 p-4 justify-start mb-4">

        <div className="flex flex-col items-center justify-start items-start ">
            <p className="font-material-bodysmall text-on-surface">Selected Printer</p>
            <h3 className="font-material-titlemedium text-on-surface">Printer Printhub</h3>
        </div>
        <div className='flex items-center justify-between w-full'>
            <p className="font-material-titlesmall text-on-primary-container bg-primary-container rounded-full px-4 py-2 flex justify-center items-center gap-1">
                Online
            </p>
            <button className="bg-primary rounded-lg p-2 font-material-labellarge text-on-primary">Change Printer</button>
        </div>
    </div>
);

const PaymentCard = ({ total }) => (
    <div className="font-material-titlemedium text-on-primary-container px-2 border-t-2 border-primary flex flex-col gap-3 mb-4">
        <div className="flex justify-between items-center">
            <span className="">Total Amount</span>
            <span className="">₹{total}</span>
        </div>
    </div>
);

export default function CheckoutPage() {
    const router = useRouter();
    const { files, cart, updateFileConfig, createOrder } = useStorage();
    const [editingFileId, setEditingFileId] = useState(null);

    const selectedFiles = cart.length > 0 ? files.filter(f => cart.includes(f.id)) : files;

    // Mock total calculation
    const total = selectedFiles.reduce((acc, file) => acc + (file.config.copies * 10), 0);

    const handlePay = () => {
        createOrder({ method: 'UPI', total });
        router.push('/success');
    };

    const handleReturn = () => {
        router.push('/');
    };

    const editingFile = selectedFiles.find(f => f.id === editingFileId);

    return (
        <div className="flex min-h-screen items-center justify-center bg-surface-dim">
            <div className="aspect-270/600 border-2 h-[90vh] rounded-3xl overflow-hidden relative flex flex-col bg-primary-container shadow-2xl">
                <TopBar />

                <div className="flex-1 overflow-y-auto p-4 flex flex-col">
                    <PrinterInfoCard />

                    <h3 className="font-material-titlemedium text-on-surface mb-2">Selected Files</h3>
                    <div className="rounded-3xl overflow-hidden mb-4">
                        <div className="flex flex-col gap-1 flex-1 overflow-y">
                            {selectedFiles.map(file => (
                                <ItemCard
                                    key={file.id}
                                    file={file}
                                    selectionMode={false} // Allow editing here
                                    onEdit={setEditingFileId}
                                />
                            ))}
                        </div>
                    </div>

                    <PaymentCard total={total} />
                </div>

                <div className="flex gap-2 bg-surface-bright border-t border-outline-variant justify-end p-4 gap-2">
                    <Button
                        variant="text"
                        onClick={handleReturn}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handlePay}
                    >
                        Pay ₹{total}
                    </Button>
                </div>

                <BottomSheet
                    isOpen={!!editingFileId}
                    onClose={() => setEditingFileId(null)}
                    file={editingFile}
                    onSave={updateFileConfig}
                />
            </div>
        </div>
    );
}
