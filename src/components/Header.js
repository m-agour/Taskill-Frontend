import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


const Header = ({ title, isLoginPage, onButtonClick }) => {
  const buttonText = isLoginPage ? 'Register' : 'Login';

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light, header-div">
      <div className="container header-container">
        <a className="navbar-brand header-title" href="/">{title}</a>
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
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button onClick={onButtonClick} className="btn btn-outline-primary">
                {buttonText}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
