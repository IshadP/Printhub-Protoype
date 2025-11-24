"use client";

import React from "react";
import Icon from "./Icon";

export type DuplexMode = "off" | "shortside" | "longside";

interface DoubleSidedProps {
  value: DuplexMode;
  onChange: (value: DuplexMode) => void;
  className?: string;
}

// Helper to determine styling based on active state
const getButtonClasses = (isActive: boolean) => {
  const baseClasses = "flex-1 flex flex-col items-center justify-center gap-1.5 p-3 text-sm transition-colors duration-300 ease-in-out font-material-themelabelmedium";
  
  if (isActive) {
    // Active: Primary fill, On-Primary text
    return `${baseClasses} bg-color-primary text-color-on-primary font-material-themelabellarge`;
  } else {
    // Inactive: Surface fill, On-Surface-Variant text
    return `${baseClasses} bg-color-surface-container-low text-color-on-surface-variant hover:bg-color-surface-container`;
  }
};

export default function DoubleSided({
  value,
  onChange,
  className = "",
}: DoubleSidedProps) {
  
  return (
    // Outer div has rounded corners and shadow
    <div className={`flex w-full rounded-2xl overflow-hidden shadow-sm ${className}`}>
      {/* Option: Single-Sided */}
      <button
        type="button"
        onClick={() => onChange("off")}
        className={getButtonClasses(value === "off")}
        aria-pressed={value === "off"}
      >
        <Icon name="crop_16_9" size={24} filled={value === "off"} className="text-current" />
        <span>Single-Sided</span>
      </button>

      {/* Option: Shortside (Duplex Short Edge) */}
      <button
        type="button"
        onClick={() => onChange("shortside")}
        // Add divider visual with border
        className={`${getButtonClasses(value === "shortside")} border-x border-color-outline-variant/30`}
        aria-pressed={value === "shortside"}
      >
        <Icon name="double_tap_on" size={24} filled={value === "shortside"} className="text-current" />
        <span>Short Edge</span>
      </button>

      {/* Option: Longside (Duplex Long Edge) */}
      <button
        type="button"
        onClick={() => onChange("longside")}
        className={getButtonClasses(value === "longside")}
        aria-pressed={value === "longside"}
      >
        <Icon name="flip_to_back" size={24} filled={value === "longside"} className="text-current" />
        <span>Long Edge</span>
      </button>
    </div>
  );
}