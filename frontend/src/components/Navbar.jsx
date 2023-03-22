import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SessionContext from '../contexts/SessionContext';
import Logo from './Logo';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Navbar({ setToShow }) {
    const { user, logout } = useContext(SessionContext);

    return (
        <>
            <header id="header" className="header fixed-top d-flex align-items-center" style={{ padding: '2rem' }}>
                <div className="d-flex align-items-center justify-content-between">
                    <Logo />
                    <i className="bi bi-list toggle-sidebar-btn" onClick={() => setToShow((prev) => !prev)}></i>
                </div>

                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">
                        <li className="nav-item dropdown pe-3">
                            <a
                                className="nav-link nav-profile d-flex align-items-center pe-0"
                                href="/"
                                data-bs-toggle="dropdown"
                            >
                                <i className="fa-solid fa-user" style={{ fontSize: '1rem' }}></i>
                                <span className="d-none d-md-block dropdown-toggle ps-2">{user.name}</span>
                            </a>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>{user.name}</h6>
                                    <span>{capitalizeFirstLetter(user.role)}</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <Link className="dropdown-item d-flex align-items-center" to="/">
                                        <i className="bi bi-person"></i>
                                        <span>My Profile</span>
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                                        <i className="bi bi-question-circle"></i>
                                        <span>Need Help?</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <button
                                        className="dropdown-item d-flex align-items-center"
                                        onClick={() => {
                                            logout();
                                        }}
                                    >
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Sign Out</span>
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Navbar;
