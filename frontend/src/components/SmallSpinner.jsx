import React from 'react';

function SmallSpinner() {
    return (
        <div class="spinner-border spinner-border-sm text-primary" role="status" style={{ color: '#4154f1' }}>
            <span class="visually-hidden">Loading...</span>
        </div>
    );
}

export default SmallSpinner;
