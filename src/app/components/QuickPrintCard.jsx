import React from 'react';
import Icon from './Icon';

const QuickPrintCard = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-primary-container rounded-2xl p-6 flex flex-col items-start gap-4 cursor-pointer hover:shadow-md transition-shadow"
        >
            <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center">
                <Icon name="print" size={24} />
            </div>
            <div>
                <h2 className="font-material-titlelarge text-on-primary-container">Quick Print</h2>
                <p className="font-material-bodymedium text-on-primary-container opacity-80">
                    Print files directly from your phone
                </p>
            </div>
        </div>
    );
};

export default QuickPrintCard;
