import React from 'react';

function Modal({ children, id, large }) {
    return (
        <>
            <div
                className={large ? `modal fade modal-lg` : `modal fade`}
                id={'id_' + id}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    {children}
                </div>
            </div>
        </>
    );
}

export default Modal;
