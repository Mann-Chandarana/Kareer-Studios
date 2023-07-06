import React from 'react';
import '../styles/loading.css';

function Loading() {
    return (
        <div
            className='w-100 d-flex flex-column'
            style={{
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div class='lds-grid'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loading;
