import React from 'react';
import Icon from './Icon';
import Link from 'next/link';

const ActionButtons = ({ onAdd, addHref, onPrint, selectedCount = 0, printDisabled = false }) => {
    const buttonClass = "flex justify-center items-center bg-surface-bright w-full active:scale-95 transition-transform ";

    return (
        <div className="pointer-events-auto mx-4 flex justify-start items-center gap-1 w-full rounded-full overflow-x-hidden shadow-[0px_2px_3px_0px_rgba(0,0,0,0.30)] shadow-[0px_6px_10px_4px_rgba(0,0,0,0.15)]">
            {addHref ? (
                <Link href={addHref} className={buttonClass}>
                    <div className="px-4 py-2.5 inline-flex justify-center items-center gap-2">
                        <Icon name="add" size={24} className="text-on-surface" />
                        <div className="justify-center text-on-surface font-material-labellarge leading-5 tracking-tight">
                            Add Files
                        </div>
                    </div>
                </Link>
            ) : (
                <button
                    onClick={onAdd}
                    className={buttonClass}
                >
                    <div className="px-4 py-2.5 inline-flex justify-center items-center gap-2">
                        <Icon name="add" size={24} className="text-on-surface" />
                        <div className="justify-center text-on-surface font-material-labellarge leading-5 tracking-tight">
                            Add Files
                        </div>
                    </div>
                </button>
            )}

            <button
                onClick={onPrint}
                disabled={printDisabled}
                className={`flex justify-center items-center w-full transition-transform rounded-sm 
                    ${printDisabled ? 'bg-surface-container-high text-surface-container-high cursor-not-allowed' : 'bg-primary active:scale-95 hover:bg-opacity-90'}
                `}
            >
                <div className="px-4 py-2.5 inline-flex justify-center items-center gap-2">
                    <Icon name="print" size={24} className={`${printDisabled ? 'text-on-surface-variant' : 'text-on-primary'}`} />
                    <div className={`justify-center font-material-labellarge leading-5 tracking-tight ${printDisabled ? 'text-on-surface-variant' : 'text-on-primary'}`}>
                        {selectedCount > 0 ? `Print ${selectedCount} Files` : 'Print Files'}
                    </div>
                </div>
            </button>
        </div>
    );
};

export default ActionButtons;
