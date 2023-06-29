import React, { useContext } from 'react';
import SessionContext from '../../contexts/SessionContext';
import useCaptialize from '../../hooks/useCaptialize';

function ParentProfile() {
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
                <div className="col-lg-3 col-md-4 label">Student ID</div>
                <div className="col-lg-9 col-md-8">{user.student_id}</div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4 label">Phone</div>
                <div className="col-lg-9 col-md-8">{user.phone}</div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4 label">Email</div>
                <div className="col-lg-9 col-md-8">{user.email}</div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4 label">Salary</div>
                <div className="col-lg-9 col-md-8">{user.salary}</div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Family Type</div>
                <div className="col-lg-9 col-md-8">{user.family_type}</div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Gender</div>
                <div className="col-lg-9 col-md-8">{user.gender}</div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4 label">Occupation</div>
                <div className="col-lg-9 col-md-8">{user.occupation}</div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 label">No. of Childs</div>
                <div className="col-lg-9 col-md-8">{user.no_of_childs}</div>
            </div>
        </div>
    );
}

export default ParentProfile;
