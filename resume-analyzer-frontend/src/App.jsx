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

const AboutPage = () => <div>This is the About Page</div>;
const ProfilePage = () => <div>This is your Profile Page</div>;
const AnalyzerPage = () => <div>This is your Analyzer Page</div>;

function App() {
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
  };

  return (
    <Router>
      <GooeyNavBarWrapper isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/auth"
            element={<AuthPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/Analyzer"
            element={<AnalyzerPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
