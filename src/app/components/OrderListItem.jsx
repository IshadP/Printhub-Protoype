import React from 'react';
import Icon from './Icon';
import Link from 'next/link';

const OrderListItem = ({ order }) => {
    return (
        <Link href={`/orders/${order.id}`}>
            <div className="flex items-center p-4 gap-4 bg-surface-container-low rounded-xl mb-2 hover:bg-surface-container transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                    <Icon name="receipt" size={24} />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-material-titlemedium text-on-surface truncate">
                        Order #{order.id.split('-')[1]}
                    </h3>
                    <p className="font-material-bodysmall text-on-surface-variant">
                        {new Date(order.date).toLocaleDateString()} • {order.items.length} items
                    </p>
                </div>

                <div className="flex flex-col items-end">
                    <span className="font-material-labellarge text-on-surface">₹{order.total}</span>
                    <span className="text-xs text-green-7 font-medium capitalize">{order.status}</span>
                </div>
            </div>
        </Link>
    );
};

export default OrderListItem;
