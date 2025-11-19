import React from 'react';
import type { ReactNode } from 'react';

interface ScreenContainerProps {
  children?: ReactNode;
  className?: string;
}

export default function ScreenContainer({ children, className = '' }: ScreenContainerProps) {
  return (
    <main 
      className={`
        flex-1 w-full overflow-y-auto 
        bg-primary-container 
        p-4 pb-28 
        hide-scrollbar 
        flex flex-col gap-4
        ${className}
      `}
    >
      {children}
    </main>
  );
}