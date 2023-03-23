import React, { useContext } from 'react';
import SessionContext from '../contexts/SessionContext';
import AdminProfile from './profiles/AdminProfile';
import CounsellorProfile from './profiles/CounsellorProfile';
import ParentProfile from './profiles/ParentProfile';
import StudentProfile from './profiles/StudentProfile';

const ProfileOverview = () => {
    const { user } = useContext(SessionContext);
    return (
        <div className="tab-pane fade show active profile-overview" id="profile-overview">
            {user.role === 'admin' && <AdminProfile />}
            {user.role === 'counsellor' && <CounsellorProfile />}
            {user.role === 'student' && <StudentProfile />}
            {user.role === 'parent' && <ParentProfile />}
        </div>
    );
};

export default ProfileOverview;
