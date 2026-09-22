import {
  Search,
  Globe,
  Server,
  Cloud,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import "./Home.css";

function Home() {
  return (
    <div className="shivora-home">

      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-shiv">SHIV</span>
          <span className="logo-o">O</span>
          <span className="logo-ra">RA</span>
        </div>

        <nav>
          <a href="/domains">Domains</a>
          <a href="/hosting">Hosting</a>
          <a href="#">Cloud</a>
          <a href="#">Security</a>
        </nav>

        <div className="nav-actions">
          <a href="/login" className="login-link">
            Login
          </a>

          <a href="/dashboard" className="get-started">
            Get Started
          </a>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="hero">
          <div className="hero-content">

            <div className="hero-badge">
              <span>✦</span>
              POWERING YOUR DIGITAL WORLD
            </div>

            <h1>
              Build Your Digital
              <span>Future with Shivora</span>
            </h1>

            <p>
              Domains, hosting, cloud and security — everything you need
              to build and grow your online presence.
            </p>

            {/* Domain Search */}
            <div className="domain-search">
              <Search size={22} />

              <input
                type="text"
                placeholder="Search your perfect domain"
              />

              <button>
                Search
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="domain-extensions">
              <span>.com</span>
              <span>.in</span>
              <span>.net</span>
              <span>.org</span>
            </div>

          </div>
        </section>

        {/* Services */}
        <section className="services">

          <div className="section-heading">
            <p>EVERYTHING YOU NEED</p>
            <h2>Your Digital Journey Starts Here</h2>
          </div>

          <div className="service-grid">

            <div className="service-card">
              <div className="service-icon">
                <Globe />
              </div>

              <h3>Domains</h3>

              <p>
                Find the perfect domain name for your business or idea.
              </p>

              <a href="/domains">
                Explore Domains
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Server />
              </div>

              <h3>Hosting</h3>

              <p>
                Fast and reliable hosting built for modern websites.
              </p>

              <a href="/hosting">
                View Hosting
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Cloud />
              </div>

              <h3>Cloud</h3>

              <p>
                Powerful cloud infrastructure that grows with you.
              </p>

              <a href="#">
                Explore Cloud
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <ShieldCheck />
              </div>

              <h3>Security</h3>

              <p>
                Protect your websites and digital infrastructure.
              </p>

              <a href="#">
                Explore Security
                <ArrowRight size={16} />
              </a>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <h2>Ready to build something amazing?</h2>

          <p>
            Start your digital journey with Shivora.
          </p>

          <a href="/domains">
            Get Started
            <ArrowRight size={18} />
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          SHIVORA
        </div>

        <p>
          POWERING YOUR DIGITAL WORLD
        </p>

        <span>
          © 2026 Shivora. All rights reserved.
        </span>
      </footer>

    </div>
  );
}

export default Home;