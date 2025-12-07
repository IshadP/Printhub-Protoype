import React from 'react';
import Icon from './Icon';

// Define variants configuration here
// You can add more variants to this object
const VARIANTS = {
    paid: {
        icon: 'currency_rupee', // The Green Rupee (Money icon)
        color: 'text-green-600',
    },
    failed: {
        icon: 'error', // Error icon example
        color: 'text-red-500',
    }
};

const OrderListItem = ({
    id = "ORD-001",
    name = "Practical 7.pdf",
    price = 1,
    date = "10/11/2025",
    variant = 'paid', // 'paid', 'pending', 'failed'
    onClick
}) => {
    // Fallback to 'paid' if variant doesn't exist
    const currentVariant = VARIANTS[variant] || VARIANTS.paid;

    return (
        <div
            onClick={onClick}
            className="flex items-center gap-4 bg-surface-bright p-4 rounded-sm shadow-sm active:scale-[0.99] transition-transform select-none cursor-pointer"
        >
            {/* Left Icon: Generic Order Status (Three dots) */}
            <div className="">
                {variant === 'pending' && (
                    <div className="text-on-surface"><Icon classname="" name="pending" size={32} /></div>
                )}
                {variant === 'paid' && (
                    <div className="text-primary"><Icon classname="" name="verified" size={32} /></div>
                )}
                {variant === 'failed' && (
                    <div className="text-error"><Icon name="failed" size={32} /></div>
                )}
            </div>

            {/* Middle Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <span className="font-material-labelsmall-p text-surface-container-highest tracking-wider mb-0.5">OrderID: {id}</span>
                <h3 className="font-material-titlemedium text-on-surface truncate mb-2">{name}</h3>

                {/* Meta Row */}
                <div className="flex items-center text-on-surface-variant justify-between">
                    <div className="flex items-center ">
                        <Icon name="currency_rupee" size={18} className="text-on-surface-variant" />
                        <span className="font-material-bodylarge text-lg">{price}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Icon name="calendar_today" size={16} />
                        <span className="font-material-bodymedium text-sm">{date}</span>
                    </div>
                </div>
            </div>

            {/* Right Variant Icon */}
            <div className={`${currentVariant.color} transform scale-110`}>
                <Icon name={currentVariant.icon} size={28} />
            </div>
        </div>
    );
};

export default OrderListItem;
