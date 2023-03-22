import React from 'react';
import { NavLink } from 'react-router-dom';

function ParentSidebar() {
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
                        Your Children
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
            </ul>
        </aside>
    );
}

export default ParentSidebar;
