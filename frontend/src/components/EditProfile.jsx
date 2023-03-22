import React, { useContext } from 'react';
import SessionContext from '../contexts/SessionContext';
import UpdateAdmin from './editProfile/UpdateAdmin';
import UpdateCounsellor from './editProfile/UpdateCounsellor';
import UpdateParent from './editProfile/UpdateParent';
import UpdateStudent from './editProfile/UpdateStudent';

export default function EditProfile() {
    const { user } = useContext(SessionContext);

    return (
        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
            {user.role === 'admin' && <UpdateAdmin />}
            {user.role === 'counsellor' && <UpdateCounsellor />}
            {user.role === 'student' && <UpdateStudent />}
            {user.role === 'parent' && <UpdateParent />}
        </div>
    );
}
