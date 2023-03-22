import React from 'react';

export const TableLoading = () => {
    return (
        <tr className="w-100 d-flex justify-content-center">
            <td>
                <div className="spinner-border" role="status" style={{ color: '#4154f1' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </td>
        </tr>
    );
};
