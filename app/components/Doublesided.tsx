"use client";

import React from "react";
import Icon from "./Icon";

type DuplexMode = "off" | "shortside" | "longside";

interface DoubleSidedProps {
  value: DuplexMode;
  onChange: (value: DuplexMode) => void;
  className?: string;
}

export default function DoubleSided({
  value,
  onChange,
  className = "",
}: DoubleSidedProps) {
  
  // Helper to determine styling based on active state
  const getButtonClasses = (isActive: boolean) => {
    const baseClasses = "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm transition-colors duration-300 ease-in-out focus:outline-none";
    
    if (isActive) {
      // Active: Primary background (Green), On-Primary text (White)
      return `${baseClasses} bg-primary rounded-full text-on-primary`;
    } else {
      // Inactive: Secondary background (Light Green), On-Secondary text (Dark Green)
      return `${baseClasses} bg-secondary rounded-lg text-on-secondary hover:bg-secondary-container`;
    }
  };

  return (
    <div className={`flex rounded-full w-full overflow-hidden font-medium ${className}`}>
      {/* Option: OFF */}
      <button
        type="button"
        onClick={() => onChange("off")}
        className={getButtonClasses(value === "off")}
        aria-pressed={value === "off"}
      >
        <span>Off</span>
      </button>

      {/* Option: Shortside */}
      <button
        type="button"
        onClick={() => onChange("shortside")}
        className={`${getButtonClasses(value === "shortside")} border-l border-r border-white/20`}
        aria-pressed={value === "shortside"}
      >
        <Icon name="layers" size={20} className={value === "shortside" ? "" : "opacity-70"} />
        <span>Shortside</span>
      </button>

      {/* Option: Longside */}
      <button
        type="button"
        onClick={() => onChange("longside")}
        className={getButtonClasses(value === "longside")}
        aria-pressed={value === "longside"}
      >
        <Icon name="layers" size={20} className={value === "longside" ? "" : "opacity-70"} />
        <span>Longside</span>
      </button>
    </div>
  );
}