import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isDashboard = location.pathname.startsWith('/dashboard') ||
        location.pathname.startsWith('/projects') ||
        location.pathname.startsWith('/budget') ||
        location.pathname.startsWith('/settings');

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to={isDashboard ? "/dashboard" : "/"} className="navbar-logo">
                        <span className="logo-icon">🚀</span>
                        <span>OptiForge AI</span>
                    </Link>

                    {user ? (
                        <div className="navbar-user">
                            <span className="user-name">👤 {user.name}</span>
                            <button onClick={logout} className="btn btn-secondary btn-sm">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="navbar-buttons">
                            <Link to="/login" className="btn btn-secondary">Login</Link>
                            <Link to="/signup" className="btn btn-primary">Get Started</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
