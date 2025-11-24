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
        flex items-center justify-center gap-2 
        min-h-14 
        rounded-full 
        px-6 py-2 
        bg-color-primary text-color-on-primary 
        font-material-themelabellarge font-medium
        shadow-md
        transition-colors duration-200
        hover:bg-color-primary-container hover:text-color-on-primary-container
        active:shadow-lg
        disabled:bg-color-surface-container-high disabled:text-color-on-surface-variant disabled:shadow-none
        ${className}
      `}
      {...props}
    >
      {icon && (
        <Icon name={icon} size={24} className="text-current" />
      )}
      <span>{label}</span>
    </button>
  );
}