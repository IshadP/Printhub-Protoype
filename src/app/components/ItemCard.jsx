import React from 'react';
import Icon from './Icon';
import Image from 'next/image';
import useLongPress from '../hooks/useLongPress';

const ItemCard = ({
    file,
    selected,
    selectionMode,
    onSelect,
    onEdit,
    onLongPress
}) => {

    const longPressProps = useLongPress(
        () => onLongPress && onLongPress(file.id),
        () => {
            if (selectionMode) {
                onSelect(file.id);
            } else {
                console.log('Tapped file:', file.name);
            }
        },
        { shouldPreventDefault: true }
    );

    return (
        <div
            {...longPressProps}
            className={`
                relative flex items-center p-4 gap-4 rounded-xl mb-2 transition-colors duration-200 select-none
                ${selected ? 'bg-green-2' : 'bg-surface-container-low'}
            `}
        >
            {/* Selection Indicator (Only when selected) */}
            {selected && (
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-green-7 text-white flex items-center justify-center">
                        <Icon name="check" size={24} />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
                {/* File Name */}
                <h3 className="font-material-bodylarge text-on-surface truncate font-medium">
                    {file.name}
                </h3>

                {/* Config Icons Row */}
                <div className="flex items-center gap-3 text-on-surface-variant">
                    {/* Color/B&W */}
                    <div
                        className={`flex items-center transition-colors ${file.config.color ? 'text-primary' : 'opacity-50'}`}
                        title={file.config.color ? "Color" : "B&W"}
                    >
                        <Image
                            src={file.config.color ? "/col.png" : "/bw.png"}
                            alt={file.config.color ? "Color" : "B&W"}
                            width={20}
                            height={20}
                        />
                    </div>

                    {/* Double Side */}
                    <div
                        className={`flex items-center transition-colors ${file.config.doubleSide !== 'off' ? 'text-primary' : 'opacity-50'}`}
                        title={`Double Side: ${file.config.doubleSide}`}
                    >
                        <Icon name="description" size={20} />
                    </div>

                    {/* Pages */}
                    <div
                        className={`flex items-center transition-colors ${(file.config.pages && file.config.pages !== 'all') ? 'text-primary' : 'opacity-50'}`}
                        title={`Pages: ${file.config.pages || 'All'}`}
                    >
                        <Icon name="subject" size={20} />
                    </div>

                    {/* Orientation */}
                    <div
                        className={`flex items-center transition-colors ${file.config.orientation !== 'portrait' ? 'text-primary' : 'opacity-50'}`}
                        title={`Orientation: ${file.config.orientation}`}
                    >
                        <Icon name={file.config.orientation === 'landscape' ? "crop_landscape" : "crop_portrait"} size={20} />
                    </div>

                    {/* Copies */}
                    <span className={`font-material-bodylarge ml-1 transition-colors ${file.config.copies > 1 ? 'text-primary font-bold' : 'text-on-surface'}`}>
                        x{file.config.copies}
                    </span>
                </div>
            </div>

            {/* Edit Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit(file.id);
                }}
                className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-full"
            >
                <Icon name="edit" size={24} />
            </button>
        </div>
    );
};

export default ItemCard;
