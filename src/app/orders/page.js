'use client';

import React from 'react';
import Navbar from "../components/navbar";
import TopBar from "../components/topbar";
import OrderListItem from "../components/OrderListItem";
import { useStorage } from "../context/StorageContext";

export default function OrdersPage() {
  const { orders } = useStorage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-dim">
      <div className="aspect-270/600 border-2 h-[90vh] rounded-3xl overflow-hidden relative flex flex-col bg-surface-bright shadow-2xl">
        <TopBar title="My Orders" showBackButton={false} />

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          <h2 className="font-material-titlemedium text-on-surface mb-2">Past Orders</h2>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-on-surface-variant">
              <p>No orders yet</p>
            </div>
          ) : (
            orders.map(order => (
              <OrderListItem key={order.id} order={order} />
            ))
          )}
        </div>

        <Navbar />
      </div>
    </div>
  );
}
