import React from 'react';

export const SearchMenu = ({ handleQueryChange }) => {
    return (
        <div className="input-group input-group-sm" style={{ marginBottom: 0 }}>
            <input
                type="text"
                className="form-control"
                placeholder="Enter Name or Email"
                onChange={handleQueryChange}
            />
            <span className="btn btn-sm border disabled" type="button">
                <i className="fa fa-search" style={{ position: 'relative', left: '-1px' }}></i>
            </span>
        </div>
    );
};
