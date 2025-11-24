"use client";

import React from "react";

type Orientation = "portrait" | "landscape";

interface OrientationToggleButtonProps {
  orientation: Orientation;
  onChange: (orientation: Orientation) => void;
  className?: string;
}

export default function OrientationToggle({
  orientation,
  onChange,
  className = "",
}: OrientationToggleButtonProps) {
  const isPortrait = orientation === "portrait";

  return (
    <div className={`flex rounded-full w-full overflow-hidden font-medium ${className}`}>
      <button
        type="button"
        onClick={() => onChange("portrait")}
        className={`
          flex-1 px-6 py-3 text-sm rounded-lg transition-colors duration-300 ease-in-out
          ${
            isPortrait
              ? "bg-primary text-on-primary"
              : "bg-secondary text-on-secondary"
          }
        `}
      >
        Portrait
      </button>
      <button
        type="button"
        onClick={() => onChange("landscape")}
        className={`
          flex-1 px-6 py-3 text-sm rounded-full transition-colors duration-300 ease-in-out
          ${
            !isPortrait
              ? "bg-primary text-on-primary"
              : "bg-secondary text-on-secondary"
          }
        `}
      >
        Landscape
      </button>
    </div>
  );
}