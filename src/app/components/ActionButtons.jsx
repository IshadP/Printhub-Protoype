import React from 'react';
import Icon from './Icon';

const ActionButtons = ({ onAdd, onPrint, selectedCount = 0 }) => {
    return (
        <div className="mx-4 flex justify-start items-center gap-1 w-full rounded-full overflow-x-hidden shadow-[0px_2px_3px_0px_rgba(0,0,0,0.30)] shadow-[0px_6px_10px_4px_rgba(0,0,0,0.15)]">
            <button
                onClick={onAdd}
                className="flex justify-center items-center bg-surface-bright w-full active:scale-95 transition-transform "
            >
                <div className="px-4 py-2.5 inline-flex justify-center items-center gap-2">
                    <Icon name="add" size={24} className="text-primary" />
                    <div className="justify-center text-primary font-material-labellarge leading-5 tracking-tight">
                        Add Files
                    </div>
                </div>
            </button>
            <button
                onClick={onPrint}
                className="flex justify-center items-center bg-primary w-full active:scale-95 transition-transform rounded-sm"
            >
                <div className="px-4 py-2.5 inline-flex justify-center items-center gap-2">
                    <Icon name="print" size={24} className="text-on-primary" />
                    <div className="justify-center text-on-primary font-material-labellarge leading-5 tracking-tight">
                        {selectedCount > 0 ? `Print ${selectedCount} Files` : 'Print Files'}
                    </div>
                </div>
            </button>
        </div>
    );
};

export default ActionButtons;
