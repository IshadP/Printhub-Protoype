'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import TopBar from "../../components/topbar";
import { useStorage } from "../../context/StorageContext";
import Icon from "../../components/Icon";

export default function OrderDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { orders } = useStorage();

    // In a real app we'd fetch by ID, here we find in context
    // Note: params.id might need decoding if it has special chars, but our IDs are simple
    const order = orders.find(o => o.id === decodeURIComponent(params.id));

    if (!order) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-surface-dim">
                <div className="aspect-270/600 border-2 h-[90vh] rounded-3xl overflow-hidden relative flex flex-col bg-surface-bright p-8 items-center justify-center">
                    <p>Order not found</p>
                    <button onClick={() => router.back()} className="text-primary mt-4">Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-surface-dim">
            <div className="aspect-270/600 border-2 h-[90vh] rounded-3xl overflow-hidden relative flex flex-col bg-surface-bright shadow-2xl">
                <TopBar
                    title="Receipt"
                    showBackButton={true}
                    onBack={() => router.back()}
                />

                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

                    {/* Header */}
                    <div className="text-center border-b border-outline-variant pb-6">
                        <div className="w-16 h-16 rounded-full bg-green-1 text-green-7 flex items-center justify-center mx-auto mb-4">
                            <Icon name="check_circle" size={32} />
                        </div>
                        <h1 className="font-material-headline-small text-on-surface">₹{order.total}</h1>
                        <p className="text-on-surface-variant font-material-body-medium">
                            Paid via UPI
                        </p>
                        <p className="text-on-surface-variant font-material-body-small mt-1">
                            {new Date(order.date).toLocaleString()}
                        </p>
                    </div>

                    {/* Details */}
                    <div>
                        <h3 className="font-material-title-medium text-on-surface mb-4">Order Details</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between">
                                <span className="text-on-surface-variant">Order ID</span>
                                <span className="text-on-surface font-medium">{order.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-on-surface-variant">Printer</span>
                                <span className="text-on-surface font-medium">{order.printer}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-on-surface-variant">Status</span>
                                <span className="text-green-7 font-medium capitalize">{order.status}</span>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div>
                        <h3 className="font-material-title-medium text-on-surface mb-4">Items</h3>
                        <div className="flex flex-col gap-3">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-on-surface font-medium truncate">{item.name}</p>
                                        <p className="text-on-surface-variant text-xs">
                                            {item.config.copies} copies • {item.config.color ? 'Color' : 'B&W'}
                                        </p>
                                    </div>
                                    <span className="text-on-surface">₹{item.config.copies * 10}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total */}
                    <div className="border-t border-outline-variant pt-4 flex justify-between items-center mt-auto">
                        <span className="font-material-title-medium text-on-surface">Total</span>
                        <span className="font-material-title-large text-on-surface">₹{order.total}</span>
                    </div>

                </div>
            </div>
        </div>
    );
}
