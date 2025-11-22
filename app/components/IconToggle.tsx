"use client";

import React from "react";
import Icon from "./Icon";

interface IconToggleProps {
  icon: string; // Material icon name (e.g., "swap_horiz", "compare_arrows")
  isActive?: boolean;
  onToggle?: (active: boolean) => void;
  className?: string;
}

export default function IconToggle({ 
  icon, 
  isActive = false, 
  onToggle, 
  className = "" 
}: IconToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle && onToggle(!isActive)}
      className={`
        p-2 rounded-md transition-colors duration-200 ease-in-out focus:outline-none
        ${className}
      `}
      aria-pressed={isActive}
    >
      <Icon
        name={icon}
        size={32}
        className={`
          font-bold transition-colors duration-200
          ${isActive ? "text-on-surface" : "text-surface-container"}
        `}
      />
    </button>
  );
}