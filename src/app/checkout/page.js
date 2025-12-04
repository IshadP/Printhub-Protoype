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
    <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <Icon name="print" size={24} />
            </div>
            <div>
                <h3 className="font-material-titlemedium text-on-surface">Printer A1</h3>
                <p className="font-material-bodysmall text-green-7 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-7" /> Online
                </p>
            </div>
        </div>
        <button className="text-primary font-material-labelmedium">Change</button>
    </div>
);

const PaymentCard = ({ total }) => (
    <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-3 mb-4">
        <div className="flex justify-between items-center">
            <span className="font-material-bodylarge text-on-surface">Total Amount</span>
            <span className="font-material-titlelarge text-on-surface">₹{total}</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant font-material-bodysmall">
            <Icon name="credit_card" size={16} />
            <span>Paying with UPI</span>
        </div>
    </div>
);

export default function CheckoutPage() {
    const router = useRouter();
    const { files, cart, updateFileConfig, createOrder } = useStorage();
    const [editingFileId, setEditingFileId] = useState(null);

    const selectedFiles = files.filter(f => cart.includes(f.id));

    // Mock total calculation
    const total = selectedFiles.reduce((acc, file) => acc + (file.config.copies * 10), 0);

    const handlePay = () => {
        createOrder({ method: 'UPI', total });
        router.push('/success');
    };

    const editingFile = selectedFiles.find(f => f.id === editingFileId);

    return (
        <div className="flex min-h-screen items-center justify-center bg-surface-dim">
            <div className="aspect-270/600 border-2 h-[90vh] rounded-3xl overflow-hidden relative flex flex-col bg-surface-bright shadow-2xl">
                <TopBar
                    title="Checkout"
                    showBackButton={true}
                    onBack={() => router.back()}
                />

                <div className="flex-1 overflow-y-auto p-4 flex flex-col">
                    <PrinterInfoCard />

                    <h3 className="font-material-titlemedium text-on-surface mb-2">Selected Files</h3>
                    <div className="flex flex-col gap-2 mb-6">
                        {selectedFiles.map(file => (
                            <ItemCard
                                key={file.id}
                                file={file}
                                selectionMode={false} // Allow editing here
                                onEdit={setEditingFileId}
                            />
                        ))}
                    </div>

                    <PaymentCard total={total} />
                </div>

                <div className="p-4 bg-surface-bright border-t border-outline-variant">
                    <Button
                        fullWidth
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
