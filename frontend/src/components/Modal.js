import React from 'react';

const Modal = ({ isOpen, title, children, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2 className="mb-4">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;
