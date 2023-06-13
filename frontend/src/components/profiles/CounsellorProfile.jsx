import React, { useContext } from 'react';
import SessionContext from '../../contexts/SessionContext';
import useCaptialize from '../../hooks/useCaptialize';

const CounsellorProfile = () => {
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
                <div className="col-lg-3 col-md-4 label ">Your Id</div>
                <div className="col-lg-9 col-md-8">{user.id}</div>
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

            <div className="row">
                <div className="col-lg-3 col-md-4 label">Salary</div>
                <div className="col-lg-9 col-md-8">{user.salary}</div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Experience</div>
                <div className="col-lg-9 col-md-8">{user.experience} yrs</div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Qualification</div>
                <div className="col-lg-9 col-md-8">{user.qualifiction}</div>
            </div>
            <hr />
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Bank Name</div>
                <div className="col-lg-9 col-md-8">{user.bank_name}</div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Bank IFSC</div>
                <div className="col-lg-9 col-md-8">{user.bank_ifsc}</div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Bank AC</div>
                <div className="col-lg-9 col-md-8">{user.bank_ac}</div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-4 label">Bank MICR</div>
                <div className="col-lg-9 col-md-8">{user.bank_micr}</div>
            </div>
        </div>
    );
};

export default CounsellorProfile;
