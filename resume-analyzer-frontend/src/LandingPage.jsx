import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="landing-container">
      <header className="header">
        <nav className="header">
          <h1>KnowYourResume</h1>
          <ul className="nav-links">
            <li>
              <a href="#home"> Home</a>
            </li>
            <li>
              <a href="#about"> About</a>
            </li>
            <li>
              <a href="#analyzer"> Analyzer</a>
            </li>
            <li>
              <a href="#profile"> Profile</a>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>Welcome to the Landing Page !</h2>
      </main>
      <footer className="footer">
        <p>
          © 2025 Prasannakumar. All rights reserved. Contact:
          prasannakumarpk2023@gmail.com
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
