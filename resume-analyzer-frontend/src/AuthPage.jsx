import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: " ",
    email: " ",
    password: "",
  });
  const [message, setMessage] = useState("");

  const toggleMode = () => {
    setIsLogin((prevIsLogin) => {
      const newIsLogin = !prevIsLogin;
      setMessage("");
      setFormData(
        newIsLogin
          ? { email: "", password: "" }
          : { username: "", email: "", password: "" }
      );
      return newIsLogin;
    });
  };

  // adding no scroll feature here

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:5000/login"
      : "http://localhost:5000/register";

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };
    try {
      const response = await axios.post(url, payload);
      setMessage(response.data.message || "Success!");
      if (isLogin) {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Unkown Error");
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        <h2>{isLogin ? "Login" : "Sign up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <h4>Username</h4>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="input-group">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <h4>Password</h4>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <br></br>
          <button type="submit">{isLogin ? "Login" : "Signup"}</button>
        </form>
        {message && (
          <p
            style={{
              marginTop: "1rem",
              color: message.toLowerCase().includes("error")
                ? "red"
                : message.toLowerCase().includes("exists")
                ? "#FFD700"
                : "green",
            }}
          >
            {message}
          </p>
        )}

        <p>
          {isLogin ? (
            <>
              <span className="auth-text">No account? </span>
              <span className="auth-link" onClick={toggleMode}>
                SignUp
              </span>
            </>
          ) : (
            <>
              <span className="auth-text">Have an Account? </span>
              <span className="auth-link" onClick={toggleMode}>
                LogIn
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
