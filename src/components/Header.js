import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { logout } from "../services/authService";

const Header = ({
  title,
  buttonText = "Logout",
  onButtonClick = logout,
  noButton = false,
}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light, header-div">
      <div className="container header-container">
        <a
          className="navbar-brand header-title"
          href="/"
          style={{
            color: "white",
            fontSize: "25px",
            fontFamily: "'Trebuchet MS', sans-serif",
            marginLeft: "20px",
          }}
        >
          {title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              {noButton ? null : (
                <button
                  onClick={onButtonClick}
                  className="header-auth-button"
                >
                  {buttonText}
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
