// File: app/components/QuickPrintItem.tsx
import React from 'react';
import Icon from './Icon';

interface QuickPrintItemProps {
  label: string;
  onClick: () => void;
}

/**
 * A stylized card for suggesting quick print actions or pre-configured documents.
 */
export default function QuickPrintItem({ label, onClick }: QuickPrintItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-between
        bg-color-surface-container-low text-color-on-surface
        rounded-2xl p-4 min-h-[64px]
        shadow-sm transition-all duration-200
        hover:bg-color-surface-container
        active:shadow-inner
        w-full
      `}
      aria-label={`Quick print ${label}`}
    >
      <span className="font-material-themetitlemedium truncate">{label}</span>
      
      {/* Icon: Plus in a circle */}
      <div className="flex-shrink-0 ml-4 p-1 rounded-full text-color-primary">
        <Icon name="add_circle" size={28} filled={true} />
      </div>
    </button>
  );
}