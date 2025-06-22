# 🧠 Resume Analyzer App

A full-stack AI-powered web application that analyzes resumes and provides both general and detailed improvement suggestions. Built using React.js for the frontend, Flask for the backend, and integrated with NLP models from HuggingFace.

---

## 🚀 Features

- 🔐 User authentication with JWT tokenization
- 📄 Resume upload and parsing
- 📊 Cosine similarity-based improvement scoring
- 🤖 HuggingFace model for advanced recommendations
- 🖥️ Beautiful and interactive UI with animations

---

## 🛠️ Tech Stack

| Layer     | Technology                              |
| --------- | --------------------------------------- |
| Frontend  | React.js, Vite, Framer Motion, GSAP     |
| Backend   | Flask, Flask-SQLAlchemy, JWT, bcrypt    |
| ML/NLP    | Sentence Transformers, Transformers Hub |
| Storage   | SQLite3                                 |
| Image OCR | PyMuPDF, pytesseract                    |

---

## 📁 Folder Structure

resume-analyzer/
├── backend/
│ ├── app.py
│ ├── requirements.txt
│ ├── analyzer_routes.py
│ ├── auth_utils.py
│ └── ... (your other backend files)
├── frontend/
│ ├── package.json
│ ├── vite.config.js
│ ├── src/
│ │ └── ... (React components, etc.)
│ └── public/
├── setup.bat
└── README.md
