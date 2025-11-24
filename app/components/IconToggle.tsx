"use client";

import React from "react";
import Icon from "./Icon";

interface IconToggleProps {
  icon: string; // Material icon name (e.g., "swap_horiz", "compare_arrows")
  isActive: boolean;
  onToggle: (active: boolean) => void;
  className?: string;
  label?: string; // Optional label for accessibility
}

export default function IconToggle({ 
  icon, 
  isActive, 
  onToggle, 
  className = "",
  label,
}: IconToggleProps) {
  const activeClasses = "bg-color-secondary-container text-color-on-secondary-container";
  const inactiveClasses = "bg-color-surface-container-low text-color-on-surface-variant hover:bg-color-surface-container";

  return (
    <button
      type="button"
      onClick={() => onToggle(!isActive)}
      className={`
        p-3 rounded-full h-12 w-12 flex items-center justify-center 
        transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary
        ${isActive ? activeClasses : inactiveClasses}
        ${className}
      `}
      aria-pressed={isActive}
      aria-label={label || icon}
      title={label || icon}
    >
      <Icon
        name={icon}
        size={24}
        filled={isActive}
        className={`font-bold transition-colors duration-200 text-current`}
      />
    </button>
  );
}