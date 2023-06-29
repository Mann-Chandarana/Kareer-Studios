import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import SessionContext from '../../contexts/SessionContext';

function CounsellorSidebar() {
    const { user } = useContext(SessionContext);
    return (
        <aside id='sidebar' className='sidebar'>
            <ul className='sidebar-nav' id='sidebar-nav'>
                <li className='nav-item'>
                    <NavLink className='nav-link ' to='/profile'>
                        <i className='bi bi-grid'></i>
                        <span>My Profile</span>
                    </NavLink>
                </li>

                <li className='nav-heading'>Pages</li>

                <li className='nav-item'>
                    <NavLink to='/' className='nav-link'>
                        <i className='fa-solid fa-user' style={{ fontSize: '1rem' }}></i>
                        Students
                    </NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink className='nav-link' to='/generatereceipt'>
                        <i className='fa-solid fa-receipt'></i>
                        <span>Generate Receipt</span>
                    </NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink className='nav-link' to='/faq'>
                        <i className='bi bi-question-circle'></i>
                        <span>F.A.Q</span>
                    </NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink className='nav-link' to='/contact'>
                        <i className='bi bi-envelope'></i>
                        <span>Contact</span>
                    </NavLink>
                </li>

                <li style={{ marginTop: '3rem', marginBottom: '1rem' }} className='nav-heading'>
                    Study Abroad
                </li>

                <li className='nav-item'>
                    <NavLink className='nav-link' to='/record'>
                        <i class='fa-solid fa-clipboard'></i>
                        <span>Students Record</span>
                    </NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink className='nav-link' to='/program'>
                        <i class='fa-solid fa-plus'></i>
                        <span>Assign Program</span>
                    </NavLink>
                </li>

                <li style={{ marginTop: '3rem' }} className='nav-heading'>
                    Comments
                </li>

                <li className='nav-item'>
                    <NavLink className='nav-link' to='/givefeedback'>
                        <i class='fa-solid fa-pen'></i>
                        <span>Give Comment</span>
                    </NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink className='nav-link' to='/viewfeedback'>
                        <i className='fa-regular fa-comments'></i>
                        <span>View Comments {user.messages !== null && user.messages !== 0 && <span>+{user.messages}</span>}</span>
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default CounsellorSidebar;
