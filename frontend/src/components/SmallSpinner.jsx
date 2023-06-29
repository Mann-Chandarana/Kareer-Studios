import React from 'react';

function SmallSpinner({ color }) {
    return (
        <div className="spinner-border spinner-border-sm" role="status" style={{ color: color || '#4154f1' }}>
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}

export default SmallSpinner;
