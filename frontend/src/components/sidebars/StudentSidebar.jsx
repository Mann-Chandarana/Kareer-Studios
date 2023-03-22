import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import SessionContext from '../../contexts/SessionContext';

function StudentSidebar() {
    const { user } = useContext(SessionContext);

    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">
                        <i className="bi bi-grid"></i>
                        <span>My Profile</span>
                    </NavLink>
                </li>

                <li className="nav-heading">Pages</li>

                <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                        <i className="fa-solid fa-user" style={{ fontSize: '1rem' }}></i>
                        Your Counsellor
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/parent" className="nav-link">
                        <i className="fa-solid fa-user" style={{ fontSize: '1rem' }}></i>
                        Your Parent
                    </NavLink>
                </li>

                <li
                    style={{
                        opacity: user.parent_added && '0.6',
                        cursor: user.parent_added && 'not-allowed',
                        pointerEvents: user.parent_added && 'none',
                    }}
                    className="nav-item"
                >
                    <NavLink to="/addparent" className="nav-link">
                        <i className="fa-solid fa-user-tie" style={{ fontSize: '1rem' }}></i>
                        <span>Add Parent</span>
                    </NavLink>
                </li>

                <li style={{ marginTop: '2rem' }} className="nav-heading">
                    Receipt
                </li>

                <li className="nav-item">
                    <NavLink to="/fees" className="nav-link">
                        <i className="fa-solid fa-receipt"></i>
                        <span>Fee Reciept</span>
                    </NavLink>
                </li>

                <li style={{ marginTop: '3rem' }} className="nav-heading">
                    DETAILS
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/academic">
                        <i className="fa-solid fa-graduation-cap"></i>
                        <span>Academic Details</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink className="nav-link" to="/non_academic">
                        <i className="fa-solid fa-circle-info"></i>
                        <span>Non Academic Details</span>
                    </NavLink>
                </li>

                <li style={{ marginTop: '3rem' }} className="nav-heading">
                    Other
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
            </ul>
        </aside>
    );
}

export default StudentSidebar;