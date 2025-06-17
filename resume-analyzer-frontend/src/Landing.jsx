import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/analyzer");
  };

  return (
    <div className="landing-page-wrapper">
      <main className="landing-container">
        <section className="hero">
          <h1>Know Your Resume</h1>
          <p>
            Get instant insights and detailed feedback to make your resume stand
            out and land your dream job.
          </p>
          <button className="cta-btn" onClick={handleStartClick}>
            Analyze My Resume
          </button>
        </section>

        <section className="why-use">
          <h2>Why Use Resume Analyzer?</h2>
          <ul>
            <li>Identify key strengths and weaknesses in your resume</li>
            <li>Optimize keywords to match job descriptions</li>
            <li>Receive AI-powered suggestions for improvements</li>
            <li>Save time and boost your confidence before applying</li>
          </ul>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>
          <ol>
            <li>Upload your resume in PDF or DOCX format</li>
            <li>Our AI analyzes the content, structure, and keywords</li>
            <li>Receive a detailed report with actionable feedback</li>
            <li>Make edits and re-analyze for continuous improvement</li>
          </ol>
        </section>

        <section className="get-started">
          <button className="cta-btn" onClick={handleStartClick}>
            Start Analyzing Now
          </button>
        </section>
      </main>

      <footer className="footer">
        © 2025 Know Your Resume. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
