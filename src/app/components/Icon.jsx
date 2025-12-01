import React from 'react';

export default function Icon({ name, size = 24, className = "", filled = false }) {
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