import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { NavLinkProps } from "react-router-dom";

import "../../App.scss";

interface CustomNavLinkProps extends NavLinkProps {
    activeClassName?: string;
}

const Navbar: React.FC<CustomNavLinkProps> = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container">
                <Link to="/" className="navbar-brand fs-3 ubuntu">
                    Rick & Morty <span className="text-primary">WiKi</span>
                </Link>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="fas fa-bars open text-dark"></span>
                    <span className="fas fa-times close text-dark"></span>
                </button>


                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNavAltMarkup"
                > 
                    <div className="navbar-nav fs-5">
                        <NavLink
                            to="/"
                            className="nav-link"
                        >
                            Characters
                        </NavLink>
                        <NavLink
                            className="nav-link"
                            to="/favorites"
                        >
                            Favorites
                        </NavLink>
                        <NavLink
                            className="nav-link"
                            to="/location"
                        >
                            Locations
                        </NavLink>
                        {
                            !isAuthenticated && (
                                <NavLink
                                    className="nav-link"
                                    to="/register"
                                >
                                    Regístrate
                                </NavLink>
                            )
                        }
                        {
                            !isAuthenticated ? (
                                <NavLink
                                    className="nav-link"
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                            ) : (
                                <NavLink
                                    className="nav-link"
                                    to="/"
                                    onClick={logout}
                                >
                                    Logout
                                </NavLink>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
