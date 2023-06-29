import React from 'react';

function ModalButton({ children, id, className, onClick, refer }) {
    return (
        <button
            data-bs-toggle="modal"
            data-bs-target={'#id_' + id}
            className={className}
            onClick={onClick}
            ref={refer}
            style={{ minWidth: 'max-content' }}
        >
            {children}
        </button>
    );
}

export default ModalButton;
