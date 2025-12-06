import React from 'react';
import Icon from './Icon';

const QuickPrintCard = ({ title, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-surface-bright rounded-lg p-3 flex items-center justify-between cursor-pointer border-outline hover:shadow-md transition-all active:scale-[0.98] items-center "
        >
            <span className="font-material-titlemedium text-primary-container-text font-semibold">
                {title}
            </span>
            <div className="text-primary">
                <Icon name="add_circle" size={24} />
            </div>
        </div>
    );
};

export default QuickPrintCard;
