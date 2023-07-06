import React, { useEffect, useState } from 'react';
import '../styles/loading.css';

function Loading() {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => {
                if (prev === '...') {
                    return '';
                }
                return prev.concat('.');
            });
        }, 250);

        return () => {
            clearInterval(interval);
        };
    }, []);

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
