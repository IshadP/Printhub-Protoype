import React from 'react';
import Icon from './Icon';

const Button = ({
    children,
    variant = 'primary', // primary, secondary, text, tonal
    icon,
    onClick,
    className = '',
    fullWidth = false,
    disabled = false
}) => {
    const baseStyles = "h-10 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-200 font-material-labellarge cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-on-primary hover:bg-opacity-90 shadow-sm",
        secondary: "bg-secondary-container text-primary hover:bg-opacity-80",
        tonal: "bg-secondary-container text-primary hover:bg-opacity-80", // Mapping tonal to secondary container for now
        text: "bg-transparent text-primary hover:bg-surface-container-low",
        outline: "border border-outline text-primary hover:bg-surface-container-low"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
        >
            {icon && <Icon name={icon} size={18} />}
            {children}
        </button>
    );
};

export default Button;
