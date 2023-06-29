import React, { useEffect, useState } from 'react';

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
      className="w-100 d-flex flex-column"
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <strong>{'Loading' + dots}</strong>

      <div
        className="spinner-border ml-auto text-primary"
        role="status"
        aria-hidden="true"
      ></div>
    </div>
  );
}

export default Loading;
