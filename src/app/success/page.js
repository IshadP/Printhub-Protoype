'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '../components/Icon';

export default function SuccessPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/orders');
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-surface-dim">
            <div className="aspect-270/600 border-2 h-[90vh] rounded-3xl overflow-hidden relative flex flex-col bg-primary-container items-center justify-center text-center p-8">

                <div className="w-24 h-24 rounded-full bg-primary text-on-primary flex items-center justify-center mb-6 animate-bounce">
                    <Icon name="check" size={48} />
                </div>

                <h1 className="font-material-headline-medium text-on-primary-container mb-2">
                    Payment Successful!
                </h1>
                <p className="font-material-bodylarge text-on-primary-container opacity-80">
                    Your files are being printed.
                </p>

            </div>
        </div>
    );
}
