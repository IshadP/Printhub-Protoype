'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';

export default function Navbar() {
  const pathname = usePathname();

  // Helper function to check if a path is active
  const isActive = (path) => pathname === path;

  return (
    // Fixed at bottom, styling uses global CSS variables
    <div className=" bottom-0 w-full bg-surface-bright shadow-[0_-2px_10px_rgba(0,0,0,0.05)] pb-safe">
      <nav className="flex w-full justify-around items-start px-4">
        
        <Link href="/" className="group flex w-full flex-col items-center justify-center pt-3 pb-4">
          <div
            className={`flex items-center justify-center w-16 h-8 rounded-full transition-colors duration-200 
            ${isActive('/') ? 'bg-primary text-on-primary-container' : 'bg-transparent text-on-surface'}`}
          >
            {
                isActive('/') ? ( <Icon name="folder" size={24} filled={true}/> ) : ( <Icon name="folder" size={24} filled={false}/> )
            }
          </div>
          <span
            className={`text-xs font-material-labelmedium-p transition-colors duration-200 
            ${isActive('/') ? 'text-on-primary-container' : ' text-on-surface'}`}
          >
            My Files
          </span>
        </Link>

        {/* Orders Link */}
        <Link href="/orders" className="group flex w-full flex-col items-center justify-center pt-3 pb-4">
          <div
            className={`flex items-center justify-center w-16 h-8 rounded-full transition-colors duration-200 
            ${isActive('/orders') ? 'bg-primary text-on-primary-container' : 'bg-transparent text-on-surface'}`}
          >
            {
                isActive('/orders') ? ( <Icon name="person" size={24} filled="true"/> ) : ( <Icon name="person" size={24} filled={false}/> )
            }
          </div>
          <span
            className={`text-xs font-material-labelmedium-p transition-colors duration-200 
            ${isActive('/orders') ? 'text-on-primary-container' : ' text-on-surface'}`}
          >
            Orders
          </span>
        </Link>

      </nav>
      <div className="self-stretch h-6 relative bg-surface-bright">
  <div className="w-28 h-1 left-[152px] top-[10px] absolute bg-on-surface rounded-xl" />
</div>
    </div>
  );
}