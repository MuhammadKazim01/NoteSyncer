import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token');
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NOTESYNCER
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="about"
              >
                About
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {!localStorage.getItem("token") ? (
              <>
                <Link to="/signup" className="btn btn-primary mx-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-outline-primary mx-2">
                  Login
                </Link>
              </>
            ) : (
              <button onClick={handleClick} className="btn btn-primary mx-2">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
