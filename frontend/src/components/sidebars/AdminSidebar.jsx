import React from 'react';
import { NavLink } from 'react-router-dom';

function AdminSidebar() {
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
                    <div className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse">
                        <i className="bi bi-journal-text"></i>
                        <span>Accounts</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </div>
                    <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <NavLink to="/students">
                                <i className="fa-solid fa-user" style={{ fontSize: '1rem' }}></i>
                                <span>Students</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/">
                                <i className="fa-solid fa-chalkboard-user" style={{ fontSize: '1rem' }}></i>
                                <span>Counsellors</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/parents">
                                <i className="fa-solid fa-people-group" style={{ fontSize: '1rem' }}></i>
                                <span>Parents</span>
                            </NavLink>
                        </li>
                    </ul>
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

export default AdminSidebar;
