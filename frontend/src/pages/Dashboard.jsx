import React, { useContext } from 'react';
import { ChangePassword } from '../components/ChangePassword';
import EditProfile from '../components/EditProfile';
import ProfileOverview from '../components/ProfileOverview';
import SessionContext from '../contexts/SessionContext';
import useCaptialize from '../hooks/useCaptialize';

function Dashboard() {
    const { user } = useContext(SessionContext);
    const { capitalizeFirstLetter } = useCaptialize();
    return (
        <main id='main' className='main'>
            <div className='pagetitle'>
                <h1>Dashboard</h1>
                <nav>
                    <ol className='breadcrumb'>
                        <li className='breadcrumb-item'>Dashboard</li>
                        <li className='breadcrumb-item active'>My Profile</li>
                    </ol>
                </nav>
            </div>

            <section className='section profile'>
                <div className='row'>
                    <div className='col-xl-4'>
                        <div className='card'>
                            <div className='card-body profile-card pt-4 d-flex flex-column align-items-center'>
                                {user.role === 'admin' && <i className='fa-solid fa-user-gear fa-5x mb-4'></i>}
                                {user.role === 'counsellor' && <i className='fa-regular fa-user-tie fa-5x mb-4'></i>}
                                {user.role === 'student' && <i className='fa-regular fa-user-graduate fa-5x mb-4'></i>}
                                {user.role === 'parent' && <i className='fa-solid fa-users fa-5x mb-4'></i>}
                                <h2>{user.name}</h2>
                                <h3>{capitalizeFirstLetter(user.role)} of Kareer Studios</h3>
                            </div>
                        </div>
                    </div>

                    <div className='col-xl-8'>
                        <div className='card'>
                            <div className='card-body pt-3'>
                                <ul className='nav nav-tabs nav-tabs-bordered'>
                                    <li className='nav-item'>
                                        <button className='nav-link active' data-bs-toggle='tab' data-bs-target='#profile-overview'>
                                            Overview
                                        </button>
                                    </li>

                                    <li className='nav-item'>
                                        <button className='nav-link' data-bs-toggle='tab' data-bs-target='#profile-edit'>
                                            Edit Profile
                                        </button>
                                    </li>

                                    <li className='nav-item'>
                                        <button className='nav-link' data-bs-toggle='tab' data-bs-target='#profile-change-password'>
                                            Change Password
                                        </button>
                                    </li>
                                </ul>
                                <div className='tab-content pt-2'>
                                    <ProfileOverview />

                                    <EditProfile />

                                    <div className='tab-pane fade pt-3' id='profile-change-password'>
                                        <ChangePassword />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Dashboard;
