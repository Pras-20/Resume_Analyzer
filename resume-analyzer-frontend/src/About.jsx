import React from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import "./About.css";
import propic from "./assets/profilepic.jpg";
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
        avatarUrl={propic}
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
        <h1 className="about-heading">About Me</h1>
        <p
          style={{
            textAlign: "center",
            fontStyle: "italic",
            color: "#6a4be4",
            marginTop: "-1.5rem",
            marginBottom: "2rem",
          }}
        >
          "Passionate about building the future with AI and Robotics"
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
