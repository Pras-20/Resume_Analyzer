import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import AuthPage from "./AuthPage";
import GooeyNavBarWrapper from "./components/GooeyNav/GooeyNavBar";
import "./App.css";
import LandingPage from "./Landing";
import About from "./About";

import AnalyzerPage from "./Analyzer";

const ProfilePage = () => <div>This is your Profile Page</div>;

function AppWrapper() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth", {
      state: { logoutMessage: "You have successfully logged out." },
    });
  };

  return (
    <>
      <GooeyNavBarWrapper isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/auth"
            element={<AuthPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/Analyzer"
            element={<AnalyzerPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/About" element={<ProfilePage />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
