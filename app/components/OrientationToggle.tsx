"use client";

import React from "react";
import Icon from "./Icon";

export type OrientationMode = "portrait" | "landscape";

interface OrientationToggleProps {
  value: OrientationMode;
  onChange: (value: OrientationMode) => void;
  className?: string;
}

// Helper function to define shared styling logic
const getOrientationClasses = (isActive: boolean) => {
  const base = "flex-1 flex flex-col items-center justify-center px-4 py-3 text-sm transition-colors duration-300 ease-in-out border";
  
  return isActive
    ? `${base} bg-color-primary text-color-on-primary border-color-primary font-material-themelabellarge`
    : `${base} bg-color-surface-container text-color-on-surface-variant border-color-outline hover:bg-color-surface-container-high font-material-themelabelmedium`;
};


export default function OrientationToggle({
  value,
  onChange,
  className = "",
}: OrientationToggleProps) {
  
  const isPortrait = value === "portrait";

  return (
    // Outer div has rounded corners and simulated border/outline
    <div className={`flex w-full overflow-hidden font-medium rounded-2xl shadow-inner ${className}`}>
      {/* Option: Portrait */}
      <button
        type="button"
        onClick={() => onChange("portrait")}
        className={`${getOrientationClasses(isPortrait)} rounded-l-2xl border-r-0`}
        aria-pressed={isPortrait}
      >
        <Icon name="crop_portrait" size={24} className="text-current" filled={isPortrait} />
        <span>Portrait</span>
      </button>

      {/* Option: Landscape */}
      <button
        type="button"
        onClick={() => onChange("landscape")}
        className={`${getOrientationClasses(!isPortrait)} rounded-r-2xl border-l-0`}
        aria-pressed={!isPortrait}
      >
        <Icon name="crop_landscape" size={24} className="text-current" filled={!isPortrait} />
        <span>Landscape</span>
      </button>
    </div>
  );
}