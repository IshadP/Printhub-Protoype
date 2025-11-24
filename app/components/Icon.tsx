import React from 'react';

interface IconProps {
  name: string; // The Material Symbols name (e.g., "home", "settings")
  size?: number; // Optional font size in pixels (default 24px)
  className?: string; // Additional Tailwind classes
  filled?: boolean; // If true, uses the filled variant
}

export default function Icon({ name, size = 24, className = "", filled = false }: IconProps) {
  // Use 'material-symbols-outlined' class which supports FILL variations
  const fillStyle = filled ? { fontVariationSettings: "'FILL' 1" } : {};
  
  return (
    <span 
      className={`material-symbols-outlined ${className}`} 
      style={{ fontSize: `${size}px`, ...fillStyle }}
    >
      {name}
    </span>
  );
}