import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import Image from 'next/image';

const BottomSheet = ({ isOpen, onClose, file, onSave }) => {
    const [config, setConfig] = useState({
        copies: 1,
        color: false,
        pages: '',
        doubleSide: 'off', // off, short, long
        orientation: 'portrait' // portrait, landscape
    });

    useEffect(() => {
        if (file) {
            setConfig({
                copies: file.config?.copies || 1,
                color: file.config?.color || false,
                pages: file.config?.pages || '',
                doubleSide: file.config?.doubleSide || 'off',
                orientation: file.config?.orientation || 'portrait'
            });
        }
    }, [file]);

    if (!isOpen || !file) return null;

    const handleSave = () => {
        onSave(file.id, config);
        onClose();
    };

    const SegmentButton = ({ active, onClick, label, icon, imageSrc }) => (
        <button
            onClick={onClick}
            className={`flex-1 py-2  text-sm font-medium flex items-center justify-center gap-2 transition-colors
                ${active ? 'bg-primary text-on-primary rounded-full' : 'bg-secondary text-on-secondary hover:bg-green-2 rounded-lg'}
            `}
        >
            {imageSrc ? (
                <Image src={imageSrc} alt={label} width={18} height={18} />
            ) : (
                icon && <Icon name={icon} size={18} />
            )}
            {label}
        </button>
    );

    const InputField = ({ label, value, onChange, placeholder }) => (
        <div className="relative">
            <label className="absolute -top-2 left-3 bg-surface-bright px-1 text-xs text-on-surface-variant">
                {label}
            </label>
            <div className="flex items-center border border-outline rounded-lg px-3 py-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent outline-none text-on-surface placeholder:text-on-surface-variant/50"
                />
                {value && (
                    <button onClick={() => onChange('')} className="text-on-surface-variant">
                        <Icon name="cancel" size={20} />
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 transition-opacity"
                onClick={onClose}
            />

            {/* Sheet Content */}
            <div className="relative bg-surface-bright rounded-t-3xl p-6 flex flex-col gap-6 animate-slide-up shadow-xl max-h-[90vh] overflow-y-auto">
                {/* Handle */}
                <div className="self-center w-8 h-1 bg-outline-variant rounded-full mb-2" />

                {/* Header */}
                <div>
                    <h2 className="font-material-titlemedium text-on-surface mb-4">{file.name}</h2>

                    {/* Preview Dropdown (Mock) */}
                    <div className="flex justify-between items-center py-2 border-b border-outline-variant/50">
                        <span className="font-material-bodylarge text-on-surface">Preview</span>
                        <Icon name="expand_more" size={24} />
                    </div>
                </div>

                {/* Color Print Toggle */}
                <div className="flex justify-between items-center">
                    <span className="font-material-bodylarge text-on-surface font-medium">Color Print</span>
                    <button
                        onClick={() => setConfig(prev => ({ ...prev, color: !prev.color }))}
                        className={`w-12 h-7 rounded-full relative transition-colors ${config.color ? 'bg-primary' : 'border-outline border'}`}
                    >
                        <div className={`absolute top-1 w-5 h-5 rounded-full shadow-sm transition-all flex items-center justify-center 
                            ${config.color ? 'left-6 bg-on-primary text-surface-bright' : 'left-1 bg-outline  '}
                        `}>
                            {/* Mocking the 'x' or check icon inside toggle */}
                            <Icon name={config.color ? "check" : "close"} size={14} className={`text-${config.color ? 'primary' : 'surface-bright'}`} />
                        </div>
                    </button>
                </div>

                {/* Double Side */}
                <div className="flex flex-col gap-1">
                    <span className="font-material-bodylarge text-on-surface font-medium">Double Side</span>
                    <div className="flex gap-1 rounded-full overflow-hidden">
                        <SegmentButton
                            active={config.doubleSide === 'off'}
                            onClick={() => setConfig(prev => ({ ...prev, doubleSide: 'off' }))}
                            label="Off"
                        />
                        <SegmentButton
                            active={config.doubleSide === 'short'}
                            onClick={() => setConfig(prev => ({ ...prev, doubleSide: 'short' }))}
                            label="Shortside"
                            imageSrc="/shortside.svg"
                        />
                        <SegmentButton
                            active={config.doubleSide === 'long'}
                            onClick={() => setConfig(prev => ({ ...prev, doubleSide: 'long' }))}
                            label="Longside"
                            imageSrc="/longside.svg"
                        />
                    </div>
                </div>

                {/* Page Number */}
                <InputField
                    label="Page Number"
                    value={config.pages}
                    onChange={(val) => setConfig(prev => ({ ...prev, pages: val }))}
                    placeholder="ex: 1-5, 75-69..."
                />

                {/* No. of Copies */}
                <InputField
                    label="No. of Copies"
                    value={config.copies.toString()}
                    onChange={(val) => {
                        const num = parseInt(val) || 0;
                        setConfig(prev => ({ ...prev, copies: num }));
                    }}
                    placeholder="ex: 3, 22..."
                />

                {/* Orientation */}
                <div className="flex gap-1 mt-2 rounded-full overflow-hidden">
                    <SegmentButton
                        active={config.orientation === 'portrait'}
                        onClick={() => setConfig(prev => ({ ...prev, orientation: 'portrait' }))}
                        label="Portrait"
                    />
                    <SegmentButton
                        active={config.orientation === 'landscape'}
                        onClick={() => setConfig(prev => ({ ...prev, orientation: 'landscape' }))}
                        label="Landscape"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-2 justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-full border border-outline text-on-surface font-medium hover:bg-surface-container"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 rounded-full bg-primary text-on-primary font-material-labellarge "
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BottomSheet;
