"use client";

import React from "react";
import Icon from "./Icon";

interface SwitchProps {
  checked: boolean;
  // Made optional to prevent runtime errors if omitted
  onChange?: (checked: boolean) => void;
  className?: string;
}

export default function Switch({ checked, onChange, className = "" }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => {
        // Safely call onChange only if it is defined
        if (onChange) {
          onChange(!checked);
        }
      }}
      className={`
        relative inline-flex h-10 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-300 ease-in-out focus:outline-none
        ${
          checked
            ? "bg-primary border-primary" // On State Background
            : "bg-surface border-outline" // Off State Background
        }
        ${className}
      `}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`
          pointer-events-none flex h-8 w-8 transform items-center justify-center rounded-full shadow-sm ring-0 transition duration-300 ease-in-out
          ${
            checked
              ? "translate-x-7 bg-on-primary text-primary" // On State Thumb
              : "translate-x-0.5 bg-outline text-surface" // Off State Thumb
          }
        `}
      >
        {/* Icons inside the thumb */}
        <Icon 
          name={checked ? "check" : "close"} 
          size={20} 
          className="font-bold"
        />
      </span>
    </button>
  );
}