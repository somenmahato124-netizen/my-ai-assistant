
import { Link } from "react-router-dom";
import "../Style/Home.css";

const features = [
  {
    icon: "💬",
    title: "Smart Conversations",
    description:
      "Have natural conversations and get intelligent answers to your questions instantly.",
  },
  {
    icon: "🎤",
    title: "Voice Assistant",
    description:
      "Interact naturally using your voice and let your assistant handle your requests.",
  },
  {
    icon: "📋",
    title: "Task Management",
    description:
      "Create tasks, manage your daily activities, and stay organized effortlessly.",
  },
  {
    icon: "⏰",
    title: "Smart Reminders",
    description:
      "Never forget important tasks, meetings, deadlines, or personal activities.",
  },
  {
    icon: "🌐",
    title: "Real-Time Information",
    description:
      "Get useful information such as weather, news, time, and other real-world data.",
  },
  {
    icon: "🧠",
    title: "Personalized AI",
    description:
      "Your assistant learns your preferences and provides more personalized assistance.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    text: "This AI assistant has completely changed the way I manage my daily tasks. It feels like having a personal assistant available whenever I need it.",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Software Developer",
    text: "The voice interaction is incredibly useful. I can manage tasks and get quick answers without constantly switching between applications.",
    avatar: "MC",
  },
  {
    name: "Priya Sharma",
    role: "Student",
    text: "Simple, fast, and extremely helpful. I use it every day for studying, reminders, and organizing my work.",
    avatar: "PS",
  },
];

const Home = () => {
  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="nav-container">

          <Link to="/" className="logo">
            <div className="logo-icon">
              <span>✦</span>
            </div>
            <span>Vexa<span className="logo-highlight">AI</span></span>
          </Link>

          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About</a>
          </nav>

          <div className="nav-actions">
            <Link to="/login" className="login-btn">
              Login
            </Link>

            <Link to="/signup" className="signup-btn">
              Get Started
            </Link>
          </div>

          <button className="mobile-menu">
            ☰
          </button>

        </div>
      </header>

      {/* ================= HERO ================= */}
      <main>

        <section className="hero-section" id="home">

          <div className="hero-background"></div>

          <div className="hero-container">

            {/* Hero Content */}
            <div className="hero-content">

              <div className="hero-badge">
                <span className="badge-dot"></span>
                Powered by Artificial Intelligence
              </div>

              <h1>
                Meet Your
                <span> Intelligent </span>
                Virtual Assistant
              </h1>

              <p className="hero-description">
                Your smart digital companion designed to help you think,
                organize, communicate, and get things done faster.
              </p>

              <div className="hero-buttons">

                <Link to="/signup" className="primary-btn">
                  Get Started Free
                  <span>→</span>
                </Link>

                <a href="#features" className="secondary-btn">
                  Explore Features
                  <span>↓</span>
                </a>

              </div>

              <div className="hero-trust">

                <div className="avatar-group">
                  <span>👨🏻</span>
                  <span>👩🏻</span>
                  <span>👨🏽</span>
                  <span>👩🏽</span>
                </div>

                <div>
                  <strong>10,000+</strong>
                  <p>users trust our assistant</p>
                </div>

              </div>

            </div>

            {/* AI Visual */}
            <div className="hero-visual">

              <div className="orbit orbit-one"></div>
              <div className="orbit orbit-two"></div>

              <div className="floating-card card-one">
                <span>👋</span>
                <div>
                  <strong>Hello!</strong>
                  <small>How can I help you?</small>
                </div>
              </div>

              <div className="floating-card card-two">
                <span>⏰</span>
                <div>
                  <strong>Reminder</strong>
                  <small>Meeting at 10:00 AM</small>
                </div>
              </div>

              <div className="floating-card card-three">
                <span>🌤️</span>
                <div>
                  <strong>Weather</strong>
                  <small>24°C · Partly Cloudy</small>
                </div>
              </div>

              {/* AI Robot */}
              <div className="ai-robot">

                <div className="robot-antenna">
                  <span></span>
                </div>

                <div className="robot-head">

                  <div className="robot-ear left"></div>
                  <div className="robot-ear right"></div>

                  <div className="robot-face">

                    <div className="robot-eyes">
                      <span></span>
                      <span></span>
                    </div>

                    <div className="robot-mouth"></div>

                  </div>

                </div>

                <div className="robot-body">

                  <div className="robot-chest">
                    <span>✦</span>
                  </div>

                </div>

              </div>

              <div className="visual-glow"></div>

            </div>

          </div>

        </section>


        {/* ================= FEATURES ================= */}
        <section className="features-section" id="features">

          <div className="section-container">

            <div className="section-heading">

              <span className="section-label">
                POWERFUL FEATURES
              </span>

              <h2>
                Everything you need,
                <span> in one assistant.</span>
              </h2>

              <p>
                From everyday questions to productivity tasks, your AI
                assistant is built to make your life simpler.
              </p>

            </div>

            <div className="features-grid">

              {features.map((feature, index) => (
                <div className="feature-card" key={index}>

                  <div className="feature-icon">
                    {feature.icon}
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>

                  <span className="feature-arrow">
                    →
                  </span>

                </div>
              ))}

            </div>

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}
        <section className="how-section" id="how-it-works">

          <div className="section-container">

            <div className="section-heading">

              <span className="section-label">
                HOW IT WORKS
              </span>

              <h2>
                Simple. Smart.
                <span> Effortless.</span>
              </h2>

              <p>
                Start using your personal AI assistant in just three simple
                steps.
              </p>

            </div>

            <div className="steps-container">

              <div className="step-card">

                <div className="step-number">
                  01
                </div>

                <div className="step-icon">
                  👤
                </div>

                <h3>Create an Account</h3>

                <p>
                  Sign up in seconds and create your personalized assistant.
                </p>

              </div>


              <div className="step-line"></div>


              <div className="step-card">

                <div className="step-number">
                  02
                </div>

                <div className="step-icon">
                  💬
                </div>

                <h3>Start Interacting</h3>

                <p>
                  Chat or speak naturally with your intelligent assistant.
                </p>

              </div>


              <div className="step-line"></div>


              <div className="step-card">

                <div className="step-number">
                  03
                </div>

                <div className="step-icon">
                  🚀
                </div>

                <h3>Get Things Done</h3>

                <p>
                  Ask questions, manage tasks, and boost your productivity.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ================= STATS ================= */}
        <section className="stats-section">

          <div className="stats-container">

            <div className="stat">
              <strong>10K+</strong>
              <span>Happy Users</span>
            </div>

            <div className="stat">
              <strong>50K+</strong>
              <span>Conversations</span>
            </div>

            <div className="stat">
              <strong>95%</strong>
              <span>User Satisfaction</span>
            </div>

            <div className="stat">
              <strong>24/7</strong>
              <span>Always Available</span>
            </div>

          </div>

        </section>


        {/* ================= TESTIMONIALS ================= */}
        <section className="testimonial-section" id="about">

          <div className="section-container">

            <div className="section-heading">

              <span className="section-label">
                TESTIMONIALS
              </span>

              <h2>
                Loved by
                <span> our users.</span>
              </h2>

              <p>
                See how people are using their AI assistant to simplify
                everyday life.
              </p>

            </div>


            <div className="testimonial-grid">

              {testimonials.map((testimonial, index) => (

                <div className="testimonial-card" key={index}>

                  <div className="quote">
                    “
                  </div>

                  <p>
                    {testimonial.text}
                  </p>

                  <div className="testimonial-user">

                    <div className="testimonial-avatar">
                      {testimonial.avatar}
                    </div>

                    <div>
                      <strong>
                        {testimonial.name}
                      </strong>

                      <span>
                        {testimonial.role}
                      </span>
                    </div>

                  </div>

                  <div className="stars">
                    ★★★★★
                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}
        <section className="cta-section">

          <div className="cta-glow"></div>

          <div className="cta-content">

            <span className="section-label">
              YOUR AI JOURNEY STARTS HERE
            </span>

            <h2>
              Ready to make your
              <span> life smarter?</span>
            </h2>

            <p>
              Create your account and experience your personal AI assistant
              today.
            </p>

            <div className="cta-buttons">

              <Link to="/signup" className="primary-btn">
                Get Started Free
                <span>→</span>
              </Link>

              <Link to="/login" className="cta-login">
                Already have an account? Login
              </Link>

            </div>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div className="footer-container">

          <div className="footer-brand">

            <Link to="/" className="logo">

              <div className="logo-icon">
                <span>✦</span>
              </div>

              <span>
                Vexa<span className="logo-highlight">AI</span>
              </span>

            </Link>

            <p>
              Your intelligent digital companion for a smarter and more
              productive life.
            </p>

          </div>


          <div className="footer-links">

            <div>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>

            <div>
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#about">Testimonials</a>
              <a href="#home">Contact</a>
            </div>

          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 VexaAI. All rights reserved.</p>
          <p>Built with ❤️ using MERN Stack</p>
        </div>

      </footer>

    </div>
  );
};

export default Home;