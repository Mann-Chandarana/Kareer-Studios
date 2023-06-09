import React from 'react';
import { NavLink } from 'react-router-dom';

function CounsellorSidebar() {
    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link " to="/profile">
                        <i className="bi bi-grid"></i>
                        <span>My Profile</span>
                    </NavLink>
                </li>

                <li className="nav-heading">Pages</li>

                <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                        <i className="fa-solid fa-user" style={{ fontSize: '1rem' }}></i>
                        Students
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/faq">
                        <i className="bi bi-question-circle"></i>
                        <span>F.A.Q</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/contact">
                        <i className="bi bi-envelope"></i>
                        <span>Contact</span>
                    </NavLink>
                </li>

                <li style={{ marginTop: '3rem', marginBottom: '1rem' }} className='nav-heading'>
                    Study Abroad
                </li>

                <li className='nav-item'>
                    <NavLink className='nav-link' to='/givefeedback'>
                        <i class="fa-solid fa-clipboard"></i>
                        <span>Students Record</span>
                    </NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink className='nav-link' to='/givefeedback'>
                        <i class="fa-solid fa-plus"></i>
                        <span>Assign Program</span>
                    </NavLink>
                </li>

                <li style={{ marginTop: '3rem' }} className="nav-heading">
                    Feedback
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/givefeedback">
                        <i class="fa-solid fa-pen"></i>
                        <span>Give Feedback</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/viewfeedback">
                        <i className='fa-regular fa-comments'></i>
                        <span>View Feedback</span>
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default CounsellorSidebar;
