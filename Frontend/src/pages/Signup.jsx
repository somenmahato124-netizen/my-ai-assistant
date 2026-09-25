
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import "../Style/Signup.css";
import { userDataContext } from "../context/UserContext.jsx";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const {serverUrl,userData,setUserData}=useContext(userDataContext)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

   console.log("Signup Data:", formData);
try {
    const response=await axios.post(`${serverUrl}/api/auth/signup`,formData,{withCredentials:true})
    
   setUserData(response.data)

} catch (error) {
    console.log("Error:", error.response?.data?.message);
    setUserData(null)
    
}
    
    // axios.post(
    //   "http://localhost:5000/api/auth/signup",
    //   formData
    // )
    // .then((response) => {
    //   console.log(response.data);
    //   navigate("/login");
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    // navigate("/login");
  };

  return (
    <div className="signup-page">

      {/* Background Effects */}
      <div className="signup-bg">
        <div className="signup-orb orb-one"></div>
        <div className="signup-orb orb-two"></div>
        <div className="signup-grid"></div>
      </div>


      {/* Navbar */}
      <header className="signup-navbar">

        <Link to="/" className="signup-logo">

          <div className="signup-logo-icon">
            ✦
          </div>

          <span>
            Vexa<span>AI</span>
          </span>

        </Link>


        <div className="signup-nav-text">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </header>


      {/* Main */}
      <main className="signup-main">


        {/* Left Section */}
        <section className="signup-intro">

          <div className="intro-badge">
            <span></span>
            JOIN THE FUTURE
          </div>


          <h1>
            Your smarter
            <span>digital life</span>
            starts here.
          </h1>


          <p>
            Create your account and unlock a personal AI assistant
            designed to help you think, organize, and accomplish more.
          </p>


          <div className="intro-features">

            <div className="intro-feature">

              <div className="intro-feature-icon">
                ✦
              </div>

              <div>
                <strong>
                  Personal AI Assistant
                </strong>

                <span>
                  Get intelligent help whenever you need it.
                </span>
              </div>

            </div>


            <div className="intro-feature">

              <div className="intro-feature-icon">
                ⚡
              </div>

              <div>
                <strong>
                  Boost Productivity
                </strong>

                <span>
                  Manage tasks and get things done faster.
                </span>
              </div>

            </div>


            <div className="intro-feature">

              <div className="intro-feature-icon">
                🔒
              </div>

              <div>
                <strong>
                  Secure & Private
                </strong>

                <span>
                  Your account and conversations stay protected.
                </span>
              </div>

            </div>

          </div>

        </section>


        {/* Signup Card */}
        <section className="signup-card">

          <div className="signup-card-header">

            {/* Mobile Logo */}
            <div className="mobile-logo">

              <div className="signup-logo-icon">
                ✦
              </div>

              <span>
                Vexa<span>AI</span>
              </span>

            </div>


            <h2>
              Create your account
            </h2>

            <p>
              Start your journey with your personal AI assistant.
            </p>

          </div>


          {/* Signup Form */}
          <form
            onSubmit={handleSubmit}
            className="signup-form"
          >

            {/* Name */}
            <div className="form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  👤
                </span>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* Email */}
            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
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
            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />


                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? "🙈" : "👁"}
                </button>

              </div>

            </div>


            

            {/* Submit */}
            <button
              type="submit"
              className="signup-submit"
            >

              <span>
                Create My Account
              </span>

              <strong>
                →
              </strong>

            </button>

          </form>


          {/* Login */}
          <p className="login-bottom">

            Already have an account?

            <Link to="/login">
              Sign in
            </Link>

          </p>

        </section>

      </main>


      {/* Footer */}
      <footer className="signup-footer">

        <span>
          © 2026 VexaAI
        </span>

        <span>
          Your intelligent digital companion.
        </span>

      </footer>

    </div>
  );

}
export default Signup;
