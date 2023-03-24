import React, { useState } from 'react';

function ShowLink({ link }) {
    const [text, setText] = useState('Copy');

    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setText('Copied!');
            setTimeout(() => {
                setText('Copy');
            }, 500);

            console.log('Content copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                    <p className="h3">Generated Link is:</p>
                </h5>
                <button
                    type="button"
                    className="close btn btn-sm btn-danger"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">X</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="p-3">
                    <textarea className="form-control" value={link || ''} id="myBox" rows="5" disabled></textarea>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                </button>
                <button onClick={copyContent} className="btn btn-primary">
                    {text}
                </button>
            </div>
        </div>
    );
}

export default ShowLink;
