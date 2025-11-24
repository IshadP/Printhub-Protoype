"use client";

import React from "react";
import Icon from "./Icon";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export default function Switch({ checked, onChange, className = "", disabled = false }: SwitchProps) {
  const toggleClasses = checked
    ? "bg-color-primary border-color-primary" // On State
    : "bg-color-surface-container border-color-outline"; // Off State (Surface and Outline for contrast)

  const thumbClasses = checked
    ? "translate-x-6 bg-color-on-primary text-color-primary w-5 h-5 shadow-lg" 
    : "translate-x-1 bg-color-outline text-color-surface w-4 h-4 shadow-sm"; 

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`
        relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 
        transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-color-primary
        ${toggleClasses}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      <span className="sr-only">Toggle setting</span>
      <span
        aria-hidden="true"
        className={`
          pointer-events-none transform items-center justify-center rounded-full ring-0 transition duration-300 ease-in-out flex 
          ${thumbClasses}
        `}
      >
        {checked && <Icon name="check" size={12} className="font-bold text-color-primary" />}
      </span>
    </button>
  );
}