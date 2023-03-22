import React from 'react';

export const SearchMenu = ({ handleQueryChange }) => {
    return (
        <div class="input-group input-group-sm" style={{ marginBottom: 0 }}>
            <input type="text" class="form-control" placeholder="Enter ID, name, email" onChange={handleQueryChange} />
            <span class="btn btn-sm border disabled" type="button">
                <i class="fa fa-search" style={{ position: 'relative', left: '-1px' }}></i>
            </span>
        </div>
    );
};
