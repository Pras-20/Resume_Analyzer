import React, { useState } from "react";
import axios from "axios";
import "./Analyzer.css";

function AnalyzerPage() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile || !jobDescription.trim()) return;

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobdescription", jobDescription);

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResult(res.data);
    } catch (err) {
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyzer-page-wrapper">
      <div className="analyzer-container">
        <h1 className="analyzer-heading">Resume Analyzer</h1>
        <p className="analyzer-subtext">
          Upload your resume and job description to receive personalized
          feedback and a match score.
        </p>

        <form className="analyzer-form" onSubmit={handleSubmit}>
          <label>
            Resume (PDF):
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResumeFile(e.target.files[0])}
              required
            />
          </label>

          <label>
            Job Description:
            <textarea
              rows="5"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here..."
              required
            />
          </label>

          <button className="cta-btn" type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </form>

        {result && (
          <div className="analyzer-result">
            <h2>Match Score: {result.match_score}%</h2>
            <h3>Improvement Points:</h3>
            <ul>
              {result.improvement_points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            <h3>Detailed Feedback:</h3>
            <ol className="feedback-list">
              {result.detailed_feedback
                .split(/\d+\.\s/)
                .filter(Boolean)
                .map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalyzerPage;
