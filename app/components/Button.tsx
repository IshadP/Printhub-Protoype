import React from 'react';
import Icon from './Icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: string; // Material icon name (e.g., "star", "add")
}

export default function Button({ label, icon, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`
        group
        flex items-center justify-center gap-2 
        bg-primary text-on-primary 
        rounded-full 
        pl-4 pr-4 py-2
        min-h-14
        font-material-themelabellarge text-lg font-bold tracking-wide
        shadow-md
        cursor-pointer
        ${className}
      `}
      {...props}
    >
      {icon && (
        <div className="flex items-center justify-center rounded-full text-on-primary">
           <Icon name={icon} size={32} className="font-themelabellarg" />
        </div>
      )}
      <span>{label}</span>
    </button>
  );
}