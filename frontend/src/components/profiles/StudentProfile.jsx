import React, { useContext } from 'react';
import SessionContext from '../../contexts/SessionContext';
import useCaptialize from '../../hooks/useCaptialize';

const StudentProfile = () => {
    const { user } = useContext(SessionContext);
    const { capitalizeFirstLetter } = useCaptialize();
    return (
        <div>
            <h5 className="card-title">Permenant Address</h5>
            <p className="small fst-italic">
                {user.address}, {user.city} - {user.pincode}
            </p>

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
                <div className="col-lg-3 col-md-4 label">Whatsapp</div>
                <div className="col-lg-9 col-md-8">{user.whatsapp}</div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Email</div>
                <div className="col-lg-9 col-md-8">{user.email}</div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4 label">Counsellor ID</div>
                <div className="col-lg-9 col-md-8">{user.counsellor_id}</div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Gender</div>
                <div className="col-lg-9 col-md-8">{user.gender}</div>
            </div>

            <hr />
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Parent Added</div>
                <div className="col-lg-9 col-md-8">
                    {user.parent_added ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Registration Fees</div>
                <div className="col-lg-9 col-md-8">
                    {user.paid ? (
                        <span className="badge rounded-pill text-bg-success">Paid</span>
                    ) : (
                        <span className="badge rounded-pill text-bg-danger">Pending</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
