
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Style/Login.css";
import { userDataContext } from "../context/UserContext.jsx";
const Login = () => {
  
  const navigate = useNavigate();
const {serverUrl,userData,setUserData}=useContext(userDataContext)
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setLoading(true);

    console.log("Login data:", formData);

    try {
        const response = await axios.post(
            `${serverUrl}/api/auth/signin`,
            formData,
            {
                withCredentials: true,
            }
        );

        console.log("Login response:", response.data);

        setUserData(response.data.user);

        // Login successful হলে home page
        navigate("/home");

    } catch (error) {
        console.log("Login error:", error);
        console.log("Login error response:", error.response?.data);

        setUserData(null);

        setErrorMessage(
            error.response?.data?.message ||
            "Unable to login. Please try again."
        );
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="login-page">

      {/* Background Effects */}
      <div className="login-bg">
        <div className="login-orb login-orb-one"></div>
        <div className="login-orb login-orb-two"></div>
        <div className="login-grid"></div>
      </div>

      {/* Navbar */}
      <header className="login-navbar">

        <Link to="/" className="login-logo">

          <div className="login-logo-icon">
            ✦
          </div>

          <span>
            Vexa<span>AI</span>
          </span>

        </Link>

        <div className="login-nav-text">
          Don't have an account?

          <Link to="/signup">
            Sign Up
          </Link>
        </div>

      </header>

      {/* Main */}
      <main className="login-main">

        {/* Left Introduction */}
        <section className="login-intro">

          <div className="login-badge">
            <span></span>
            WELCOME BACK
          </div>

          <h1>
            Your intelligent
            <span>digital companion</span>
            is waiting.
          </h1>

          <p>
            Sign in to continue your journey with VexaAI.
            Get personalized assistance, stay organized,
            and accomplish more with the power of AI.
          </p>

          <div className="login-features">

            <div className="login-feature">

              <div className="login-feature-icon">
                ✦
              </div>

              <div>
                <strong>
                  Intelligent Assistance
                </strong>

                <span>
                  Get smart answers and personalized help.
                </span>
              </div>

            </div>

            <div className="login-feature">

              <div className="login-feature-icon">
                ⚡
              </div>

              <div>
                <strong>
                  Work Smarter
                </strong>

                <span>
                  Save time and boost your productivity.
                </span>
              </div>

            </div>

            <div className="login-feature">

              <div className="login-feature-icon">
                🔒
              </div>

              <div>
                <strong>
                  Private & Secure
                </strong>

                <span>
                  Your personal information stays protected.
                </span>
              </div>

            </div>

          </div>

        </section>

        {/* Login Card */}
        <section className="login-card">

          <div className="login-card-header">

            {/* Mobile Logo */}
            <div className="login-mobile-logo">

              <div className="login-logo-icon">
                ✦
              </div>

              <span>
                Vexa<span>AI</span>
              </span>

            </div>

            <h2>
              Welcome back
            </h2>

            <p>
              Sign in to access your personal AI assistant.
            </p>

          </div>

          {/* Login Form */}
          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            {/* Email */}
            <div className="login-form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="login-input-wrapper">

                <span className="login-input-icon">
                  ✉
                </span>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div className="login-form-group">

              <div className="login-password-label">

                <label htmlFor="password">
                  Password
                </label>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>

              </div>

              <div className="login-input-wrapper">

                <span className="login-input-icon">
                  🔒
                </span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "🙈" : "👁"}
                </button>

              </div>

            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="login-error">
                <span>⚠</span>
                {errorMessage}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="login-spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <span>
                    Sign In
                  </span>

                  <strong>
                    →
                  </strong>
                </>
              )}

            </button>

          </form>

          {/* Bottom Signup */}
          <p className="login-bottom">

            Don't have an account?

            <Link to="/signup">
              Create an account
            </Link>

          </p>

        </section>

      </main>

      {/* Footer */}
      <footer className="login-footer">

        <span>
          © 2026 VexaAI
        </span>

        <span>
          Your intelligent digital companion.
        </span>

      </footer>

    </div>
  );
};

export default Login;
