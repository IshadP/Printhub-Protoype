import React from 'react';

interface QuickPrintRowProps {
  label: string;
  onClick?: () => void;
}

export default function QuickPrintRow({ label, onClick }: QuickPrintRowProps) {
  return (
    <button 
      onClick={onClick}
      className="flex w-full py-2 justify-between items-center group active:opacity-70 transition-opacity"
      style={{
        // We use w-full to fit the container, but max-width matches your spec
        maxWidth: '23.75rem', 
      }}
    >
      {/* Text Section */}
      <span className="font-material-themetitlemedium text-primary text-left flex-1 pr-4 leading-tight">
        {label}
      </span>

      {/* Icon Section */}
      <span className="material-icons-round text-primary text-[28px]">
        add_circle_outline
      </span>
    </button>
  );
}