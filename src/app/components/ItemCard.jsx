import React, { useRef, useState } from 'react';
import Icon from './Icon';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';

const ItemCard = ({
    file,
    selected,
    selectionMode,
    onSelect,
    onEdit,
    onLongPress,
    onDelete
}) => {
    const cardRef = useRef(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const controls = useAnimation();
    const x = useMotionValue(0);

    // Tap & Long Press Logic
    const timerRef = useRef(null);
    const isLongPress = useRef(false);

    function handleTapStart() {
        isLongPress.current = false;
        timerRef.current = setTimeout(() => {
            isLongPress.current = true;
            if (onLongPress) onLongPress(file.id);
        }, 500);
    }

    function handleTapCancel() {
        clearTimeout(timerRef.current);
    }

    function handleTap() {
        clearTimeout(timerRef.current);
        if (!isLongPress.current) {
            if (selectionMode) {
                onSelect(file.id);
            } else {
                console.log('Tapped file:', file.name);
            }
        }
    }

    const bgLeftWidth = useTransform(x, (value) => Math.max(0, value));
    const bgRightWidth = useTransform(x, (value) => Math.max(0, -value));

    function handleDragStart() {
        clearTimeout(timerRef.current);
    }

    const handleDragEnd = async (event, info) => {
        if (!cardRef.current) return;
        const width = cardRef.current.offsetWidth;
        const offset = info.offset.x;
        const threshold = width * 0.4;

        if (Math.abs(offset) > threshold && onDelete) {
            // Trigger Delete
            setIsDeleting(true);
            const direction = offset > 0 ? 1 : -1;
            // Animate off screen
            await controls.start({ x: direction * (width + 100), opacity: 0 });
            onDelete(file.id);
        } else{
            controls.start({ x: 0, opacity: 1 });
        }
    };

    if (isDeleting && !onDelete) return null; 

    return (
        <div className="relative rounded-lg w-full h-[88px]">
    
            <motion.div
                className="absolute inset-y-2 left-0 bg-red-600 flex items-center justify-center z-0 rounded-full overflow-hidden"
                style={{ width: bgLeftWidth }}
            >
                <Icon name="delete" size={24} className="text-white" />
            </motion.div>

            <motion.div
                className="absolute inset-y-2 right-0 bg-red-600 flex items-center justify-center z-0 rounded-full overflow-hidden"
                style={{ width: bgRightWidth }}
            >
                <Icon name="delete" size={24} className="text-white" />
            </motion.div>

            <motion.div
                ref={cardRef}
                layout // Smooth layout transitions when content changes (checkmark appears)
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7} // Flexible drag for smoother feel
                onDragStart={handleDragStart} // Cancel tap/long-press on drag
                onDragEnd={handleDragEnd}
                onTapStart={handleTapStart}
                onTapCancel={handleTapCancel}
                onTap={handleTap}
                animate={controls}
                style={{ x }}
                whileTap={{ scale: 0.98 }} // Press animation
                className={`
                    relative z-10 flex items-center p-4 gap-4 h-full w-full rounded-lg transition-colors duration-200 select-none 
                    ${selected ? 'bg-secondary-container' : 'bg-surface-bright border border-surface-bright'}
                    touch-pan-y
                `}
            >

                {selected && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0, width: 0 }}
                        animate={{ scale: 1, opacity: 1, width: 'auto' }}
                        exit={{ scale: 0, opacity: 0, width: 0 }}
                        className="flex-shrink-0"
                    >
                        <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center">
                            <Icon name="check" size={24} />
                        </div>
                    </motion.div>
                )}

                <div className="flex-1 min-w-0 flex flex-col gap-2">
        
                    <h3 className="font-material-titlesmall text-on-surface truncate font-medium">
                        {file.name}
                    </h3>

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
                            <Icon name="swap_horiz" size={20} />
                        </div>

                        {/* Pages */}
                        <div
                            className={`flex items-center transition-colors ${(file.config.pages && file.config.pages !== 'all') ? 'text-on-surface' : 'text-surface-container'}`}
                            title={`Pages: ${file.config.pages || 'All'}`}
                        >
                            <Icon name="segment" size={20} />
                        </div>

                        {/* Orientation */}
                        <div
                            className={`flex items-center transition-colors text-on-surface`}
                            title={`Orientation: ${file.config.orientation}`}
                        >
                            <Icon name={file.config.orientation === 'landscape' ? "fit_page_width" : "fit_page_height"} size={20} />
                        </div>

                        {/* Copies */}
                        <span className={`font-material-bodylarge ml-1 transition-colors ${file.config.copies > 1 ? 'text-on-surface font-material-titlemedium' : 'text-on-surface font-material-titlemedium'}`}>
                            x{file.config.copies}
                        </span>
                    </div>
                </div>

                {/* Edit Button */}
                <button
                    onPointerDown={(e) => {
                        // Prevent drag from starting on the button
                        e.stopPropagation();
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(file.id);
                    }}
                    className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-full z-20 cursor-pointer"
                >
                    <Icon name="edit" size={24} />
                </button>
            </motion.div>
        </div>
    );
};

export default ItemCard;
