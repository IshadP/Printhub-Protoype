'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '../components/Icon';

export default function ScanPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/checkout');
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-surface-dim">
            <div className="aspect-270/600 border-2 h-[90vh] rounded-3xl overflow-hidden relative flex flex-col bg-black">

                {/* Camera Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="w-64 h-64 border-2 rounded-3xl relative">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />

                        {/* Scanning Line Animation */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-primary shadow-[0_0_10px_var(--primary)] animate-scan" />
                    </div>
                    <p className="mt-8 text-white font-material-titlemedium bg-black/50 px-4 py-2 rounded-full">
                        Scan Printer QR Code
                    </p>
                </div>

                {/* Mock Camera Feed (Gray Background) */}
                <div className="flex-1 bg-grey-13 opacity-50" />

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-8 left-4 z-20 p-2 rounded-full bg-black/40 text-white"
                >
                    <Icon name="arrow_back" size={24} />
                </button>
            </div>

            <style jsx global>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
        </div>
    );
}
