import React from 'react';

interface IconProps {
  name: string; // The Material Icons name (e.g., "home", "settings")
  size?: number; // Optional font size in pixels
  className?: string; // Additional Tailwind classes
  style?: React.CSSProperties; // Additional inline styles
}

export default function Icon({ name, size = 24, className = "", style = {} }: IconProps) {
  return (
    <span 
      className={`material-symbols-outlined ${className}`} 
      style={{ fontSize: `${size}px`, ...style }}
    >
      {name}
    </span>
  );
}