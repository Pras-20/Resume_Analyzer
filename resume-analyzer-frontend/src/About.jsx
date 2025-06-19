import React from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h1 className="about-heading">About Me</h1>
      <ProfileCard
        name="Prasanna Kumar"
        title="Aspiring AI & Robotics Developer"
        handle="prasannakumar-pandurangan"
        status="Online"
        contactText="Get in Touch"
        avatarUrl="/resume-analyzer-frontend/src/assets/profilepic.jpg"
        showUserInfo={true}
        enableTilt={true}
        onContactClick={() =>
          window.open(
            "https://www.linkedin.com/in/prasannakumar-pandurangan",
            "_blank"
          )
        }
      />

      <section className="about-section">
        <h2>About Me</h2>
        <p>
          I'm a focused and determined computer science student passionate about
          AI, machine learning, and full-stack development. I enjoy solving
          complex problems, building intelligent systems, and exploring robotics
          and automation.
        </p>
      </section>

      <section className="about-section">
        <h2>Interests</h2>
        <ul className="about-list">
          <li>Artificial Intelligence & Machine Learning</li>
          <li>Deep Learning & NLP</li>
          <li>Full-Stack Web Development (React, Flask, Node.js)</li>
          <li>Problem Solving & Competitive Programming</li>
          <li>Robotics & Automation</li>
          <li>Open Source Contribution</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Goals</h2>
        <p>
          My goal is to leverage AI and robotics to create innovative solutions
          that positively impact industries and people’s lives. I’m continuously
          learning and building projects that combine AI with full-stack
          development to realize this vision.
        </p>
      </section>
    </div>
  );
}

export default About;
