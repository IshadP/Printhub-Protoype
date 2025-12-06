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
    onLongPress,
    onDelete
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

    const [touchStart, setTouchStart] = React.useState(null);
    const [touchEnd, setTouchEnd] = React.useState(null);
    const [isSwiping, setIsSwiping] = React.useState(false);
    const [offset, setOffset] = React.useState(0);
    const [isDeleting, setIsDeleting] = React.useState(false);

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsSwiping(true);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
        if (touchStart) {
            const currentOffset = e.targetTouches[0].clientX - touchStart;
            if (currentOffset < 0) { // Only allow left swipe
                setOffset(currentOffset);
            }
        }
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;

        if (isLeftSwipe && distance > 100 && onDelete) {
            setIsDeleting(true);
            // Wait for animation
            setTimeout(() => {
                onDelete(file.id);
            }, 200);
        } else {
            setOffset(0);
        }

        setTouchStart(null);
        setTouchEnd(null);
        setIsSwiping(false);
    };

    if (isDeleting) return null;

    return (
        <div className="relative overflow-hidden rounded-lg">
            {/* Background Layer (Delete) */}
            <div className="absolute inset-0 bg-red-500 flex items-center justify-end px-6 rounded-[10px]">
                <Icon name="delete" size={24} className="text-white" />1
            </div>

            {/* Foreground Layer (Card) */}
            <div
                {...longPressProps}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                style={{ transform: `translateX(${offset}px)`, transition: isSwiping ? 'none' : 'transform 0.2s ease-out' }}
                className={`
                    relative flex items-center p-4 gap-4 rounded-lg transition-colors duration-200 select-none 
                    ${selected ? 'bg-secondary-container' : 'bg-surface-bright'}
                `}
            >
                {/* Selection Indicator (Only when selected) */}
                {selected && (
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center">
                            <Icon name="check" size={24} />
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col gap-2">
                    {/* File Name */}
                    <h3 className="font-material-titlesmall text-on-surface truncate font-medium">
                        {file.name}
                    </h3>

                    {/* Config Icons Row */}
                    <div className="flex items-center gap-3 text-on-surface-variant">
                        {/* Color/B&W */}
                        <div
                            className={`flex items-center transition-colors ${file.config.color ? 'text-surface-container' : 'text-on-surface'}`}
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
                            className={`flex items-center transition-colors ${file.config.doubleSide !== 'off' ? 'text-on-surface' : 'text-surface-container'}`}
                            title={`Double Side: ${file.config.doubleSide}`}
                        >
                            <Icon name="description" size={20} />
                        </div>

                        {/* Pages */}
                        <div
                            className={`flex items-center transition-colors ${(file.config.pages && file.config.pages !== 'all') ? 'text-on-surface' : 'text-surface-container'}`}
                            title={`Pages: ${file.config.pages || 'All'}`}
                        >
                            <Icon name="subject" size={20} />
                        </div>

                        {/* Orientation */}
                        <div
                            className={`flex items-center transition-colors ${file.config.orientation !== 'portrait' ? 'text-on-surface' : 'text-surface-container'}`}
                            title={`Orientation: ${file.config.orientation}`}
                        >
                            <Icon name={file.config.orientation === 'landscape' ? "crop_landscape" : "crop_portrait"} size={20} />
                        </div>

                        {/* Copies */}
                        <span className={`font-material-bodylarge ml-1 transition-colors ${file.config.copies > 1 ? 'text-primary font-material-titlemedium' : 'text-on-surface font-material-titlemedium'}`}>
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
        </div>
    );
};

export default ItemCard;
