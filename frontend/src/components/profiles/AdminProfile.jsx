import React, { useContext } from 'react';
import SessionContext from '../../contexts/SessionContext';
import useCaptialize from '../../hooks/useCaptialize';

function AdminProfile() {
    const { capitalizeFirstLetter } = useCaptialize();
    const { user } = useContext(SessionContext);
    return (
        <div>
            <h5 className="card-title">Permenant Address</h5>
            <p className="small fst-italic">{user.address}</p>

            <h5 className="card-title">Profile Details</h5>

            <div className="row">
                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                <div className="col-lg-9 col-md-8">{user.name}</div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4 label">Role</div>
                <div className="col-lg-9 col-md-8">{capitalizeFirstLetter(user.role)}</div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4 label">Phone</div>
                <div className="col-lg-9 col-md-8">{user.phone}</div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4 label">Email</div>
                <div className="col-lg-9 col-md-8">{user.email}</div>
            </div>
        </div>
    );
}

export default AdminProfile;
