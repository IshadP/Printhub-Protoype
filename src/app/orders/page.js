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
      <div className="w-full h-full min-h-screen md:min-h-0 md:w-auto md:aspect-270/600 md:h-[90vh] md:border-2 md:rounded-3xl overflow-hidden relative flex flex-col bg-primary-container shadow-none md:shadow-2xl">
        <TopBar title="My Orders" showBackButton={false} />

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          <h2 className="font-material-titlemedium text-on-surface mb-2">Past Orders</h2>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-on-primary-container">
              <p className="font-material-titlemedium text-on-primary-container">No orders yet</p>
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden flex flex-col gap-1">
              {orders.map(order => (
                order.items && order.items.map((item, index) => (
                  <OrderListItem
                    key={`${order.id}-${index}`}
                    id={order.id}
                    name={item.name}
                    price={item.config.copies * 10} // Mock price calculation
                    date={new Date(order.date).toLocaleDateString()}
                    variant="paid"
                  />
                ))
              ))}
            </div>
          )}
        </div>

        <Navbar />
      </div>
    </div>
  );
}
