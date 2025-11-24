"use client";

import React from "react";
import Icon from "./Icon";

type Orientation = "portrait" | "landscape";

interface OrientationToggleProps {
  orientation: Orientation;
  onChange?: (orientation: Orientation) => void;
  className?: string;
}

export default function OrientationIcon({ 
  orientation, 
  onChange, 
  className = "" 
}: OrientationToggleProps) {
  const isPortrait = orientation === "portrait";

  return (
    <button
      type="button"
      className={`
        flex items-center justify-center
        rounded-md
        transition-all duration-300 ease-in-out
        ${className}
      `}
      title={`Switch to ${isPortrait ? "Landscape" : "Portrait"}`}
    >
      {/* Using 'swap_vert' for Portrait (Fit Height)
        Using 'swap_horiz' for Landscape (Fit Width)
        These standard Material Icons represent the dimensions well.
      */}
      <Icon 
        name={isPortrait ? "fit_page_height" : "fit_page_width"} 
        size={24} 
      />
    </button>
  );
}