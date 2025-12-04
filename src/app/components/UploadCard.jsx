import React from 'react';
import Icon from './Icon';

const UploadCard = ({ file, onRemove, onEdit }) => {
    return (
        <div className="flex items-center p-3 gap-4 bg-surface-container-low rounded-xl mb-2">
            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
                <Icon name="insert_drive_file" size={24} />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-material-bodylarge text-on-surface truncate">{file.name}</h3>
                <p className="font-material-bodysmall text-on-surface-variant">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type.split('/')[1].toUpperCase()}
                </p>
            </div>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => onEdit(file.id)}
                    className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-full"
                >
                    <Icon name="tune" size={20} />
                </button>
                <button
                    onClick={() => onRemove(file.id)}
                    className="p-2 text-error hover:bg-error-container hover:text-on-error-container rounded-full"
                >
                    <Icon name="close" size={20} />
                </button>
            </div>
        </div>
    );
};

export default UploadCard;
