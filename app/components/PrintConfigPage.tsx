// File: app/components/PrintConfigPage.tsx
"use client";

import React from "react";
import Switch from "./Switch";
import OrientationToggle, { OrientationMode } from "./OrientationToggle";
import DoubleSided, { DuplexMode } from "./Doublesided";
import IconToggle from "./IconToggle";
import Button from "./Button";

interface PrintConfigProps {
  // Config State
  orientation: OrientationMode;
  duplexMode: DuplexMode;
  isColor: boolean;
  isStapled: boolean;
  copies: number;
  
  // State Setters
  setOrientation: (value: OrientationMode) => void;
  setDuplexMode: (value: DuplexMode) => void;
  setIsColor: (value: boolean) => void;
  setIsStapled: (value: boolean) => void;
  setCopies: (value: number) => void;

  onConfirm: () => void;
}

const FeatureRow: React.FC<{ label: string; description: string; children: React.ReactNode }> = ({ label, description, children }) => (
  <div className="flex justify-between items-center py-4 border-b border-color-outline-variant/30 px-4 last:border-b-0">
    <div className="flex flex-col flex-grow pr-4">
      <span className="font-material-themetitlemedium text-color-on-surface">{label}</span>
      <span className="font-material-themebodysmall text-color-on-surface-variant mt-0.5">{description}</span>
    </div>
    <div className="flex-shrink-0">
      {children}
    </div>
  </div>
);

const PrintConfigPage: React.FC<PrintConfigProps> = ({
  orientation,
  duplexMode,
  isColor,
  isStapled,
  copies,
  setOrientation,
  setDuplexMode,
  setIsColor,
  setIsStapled,
  setCopies,
  onConfirm
}) => {
  
  const handleCopyChange = (increment: number) => {
    setCopies(Math.max(1, copies + increment));
  };
  
  // Calculate a simple mock price based on copies and color
  const mockPrice = (copies * 0.15 * (isColor ? 2 : 1)).toFixed(2);

  return (
    <div className="flex flex-col space-y-6">
      
      {/* Copies Counter Card */}
      <div className="bg-color-surface-container rounded-3xl mx-4 mt-4 shadow-md p-4">
        <div className="flex justify-between items-center">
            <h2 className="font-material-themetitlemedium text-color-on-surface">Copies</h2>
            <div className="flex items-center space-x-2">
                <IconToggle 
                    icon="remove" 
                    isActive={false} 
                    onToggle={() => handleCopyChange(-1)} 
                    label="Decrease Copies"
                    className="p-2 h-10 w-10 !rounded-2xl"
                />
                <span className="font-material-themeheadlinemedium text-color-primary w-12 text-center">{copies}</span>
                <IconToggle 
                    icon="add" 
                    isActive={true} 
                    onToggle={() => handleCopyChange(1)} 
                    label="Increase Copies"
                    className="p-2 h-10 w-10 !rounded-2xl"
                />
            </div>
        </div>
      </div>

      {/* Paper & Orientation Card */}
      <div className="bg-color-surface-container rounded-3xl mx-4 shadow-md p-4 space-y-6">
        <h2 className="font-material-themetitlemedium text-color-on-surface px-4">Layout & Orientation</h2>
        
        <OrientationToggle 
          value={orientation} 
          onChange={setOrientation} 
          className="mx-4"
        />
        
        <DoubleSided 
          value={duplexMode} 
          onChange={setDuplexMode} 
          className="mx-4"
        />
      </div>


      {/* Additional Features List Card */}
      <div className="bg-color-surface-container rounded-3xl mx-4 shadow-md divide-y divide-color-outline-variant/30">
        <FeatureRow 
          label="Color Printing" 
          description={isColor ? "Full color enabled." : "Grayscale printing selected."}
        >
          <Switch 
            checked={isColor} 
            onChange={setIsColor} 
          />
        </FeatureRow>

        <FeatureRow 
          label="Staple Documents" 
          description={isStapled ? "Stapling enabled." : "No stapling."}
        >
          <Switch 
            checked={isStapled} 
            onChange={setIsStapled} 
          />
        </FeatureRow>
        
        <FeatureRow 
          label="Paper Size" 
          description="A4 (210 x 297 mm)"
        >
          <IconToggle 
            icon="edit" 
            isActive={false} 
            onToggle={() => console.log("Simulate paper size selection")} 
            label="Edit Paper Size"
            className="!bg-color-surface-container-high text-color-on-surface-variant hover:!bg-color-surface-container-highest !rounded-xl"
          />
        </FeatureRow>
        
      </div>
      
      {/* Sticky Action Footer */}
      <div className="sticky bottom-0 w-full p-4 bg-color-surface-dim/90 backdrop-blur-sm shadow-[0_-4px_6px_rgba(0,0,0,0.05)]">
        <Button 
            label={`Confirm Settings & Checkout ($${mockPrice})`}
            icon="navigate_next"
            onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default PrintConfigPage;