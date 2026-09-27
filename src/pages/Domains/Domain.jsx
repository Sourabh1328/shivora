import { useState } from "react";
import {
  Search,
  Globe,
  ShieldCheck,
  ArrowRight,
  ShoppingCart,
  CheckCircle,
  XCircle,
} from "lucide-react";

import "./Domain.css";

function Domain() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shivora_cart") || "[]");
    } catch {
      return [];
    }
  });

  // Add domain to cart
  const addToCart = (domainName, price = 899) => {
    const existingCart = JSON.parse(
      localStorage.getItem("shivora_cart") || "[]"
    );

    const alreadyAdded = existingCart.some(
      (item) => item.domain === domainName
    );

    if (alreadyAdded) {
      alert("This domain is already in your cart.");
      return;
    }

    const updatedCart = [
      ...existingCart,
      {
        domain: domainName,
        price: price,
        period: "1 Year",
      },
    ];

    localStorage.setItem(
      "shivora_cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);

    alert(`${domainName} added to cart.`);
  };

  const searchDomain = async () => {
    const value = domain.trim().toLowerCase();

    if (!value) {
      setResult({
        type: "error",
        message: "Please enter a domain name.",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const apiUrl =
  window.location.hostname === "localhost"
    ? `http://127.0.0.1:5000/api/domain/check?domain=${encodeURIComponent(
        value
      )}`
    : `/api/domain-check?domain=${encodeURIComponent(value)}`;

const response = await fetch(apiUrl);

      const data = await response.json();

      console.log("Domain API response:", data);

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to check domain availability."
        );
      }

      if (data.available) {
        setResult({
          type: "available",
          domain: data.domain,
          price: data.price,
        });
      } else {
        setResult({
          type: "unavailable",
          domain: data.domain,
        });
      }
    } catch (error) {
      console.error("Domain search error:", error);

      setResult({
        type: "error",
        message:
          "Unable to check domain availability. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="domains-page">

      {/* Navbar */}
      <header className="domains-navbar">

        <a href="/" className="domains-logo">
          <span>SHIV</span>
          <b>O</b>
          <span>RA</span>
        </a>

        <nav>
          <a href="/">Home</a>

          <a href="/domains" className="active">
            Domains
          </a>

          <a href="/hosting">
            Hosting
          </a>

          <a href="#">
            Cloud
          </a>

          <a href="#">
            Security
          </a>
        </nav>

        <div className="domains-nav-actions">

          <a href="/login">
            Login
          </a>

          <a href="/cart" className="cart-button">
  <ShoppingCart size={17} />
  Cart

  {cart.length > 0 && (
    <span className="cart-count">
      {cart.length}
    </span>
  )}
</a>

        </div>

      </header>

      {/* Hero */}
      <section className="domains-hero">

        <div className="domains-hero-content">

          <div className="domains-badge">
            <Globe size={15} />
            FIND YOUR PERFECT DOMAIN
          </div>

          <h1>
            Your Name.
            <span>Your Identity.</span>
          </h1>

          <p>
            Find the perfect domain name for your business,
            brand or next big idea.
          </p>

          {/* Search */}
          <div className="domains-search">

            <Search size={22} />

            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchDomain();
                }
              }}
              placeholder="Enter your domain name"
            />

            <button onClick={searchDomain}>
              {loading ? "Checking..." : "Search"}

              {!loading && <ArrowRight size={18} />}
            </button>

          </div>

          <div className="popular-domains">
            <span>Popular:</span>
            <b>.com</b>
            <b>.in</b>
            <b>.net</b>
            <b>.org</b>
          </div>

          {/* Search Result */}
          {result && (
            <div className={`domain-result ${result.type}`}>

              {/* Error */}
              {result.type === "error" && (
                <>
                  <XCircle size={22} />

                  <div>
                    <strong>
                      {result.message}
                    </strong>
                  </div>
                </>
              )}

              {/* Available */}
              {result.type === "available" && (
                <>
                  <CheckCircle size={24} />

                  <div className="result-info">

                    <strong>
                      {result.domain}
                    </strong>

                    <span>
                      ✓ This domain is available
                    </span>

                  </div>

                  <div className="result-price">

                    <strong>
                      ₹{result.price || 899}
                    </strong>

                    <span>
                      /year
                    </span>

                  </div>

                  <button
                    className="add-cart-button"
                    onClick={() =>
                      addToCart(
                        result.domain,
                        result.price || 899
                      )
                    }
                  >
                    Add to Cart
                    <ShoppingCart size={17} />
                  </button>

                </>
              )}

              {/* Unavailable */}
              {result.type === "unavailable" && (
                <>
                  <XCircle size={24} />

                  <div className="result-info">

                    <strong>
                      {result.domain}
                    </strong>

                    <span>
                      This domain is already registered
                    </span>

                  </div>

                  <button
                    className="try-again-button"
                    onClick={() => {
                      setDomain("");
                      setResult(null);
                    }}
                  >
                    Try Another
                  </button>

                </>
              )}

            </div>
          )}

        </div>

      </section>

      {/* Pricing */}
      <section className="domain-pricing">

        <div className="domains-section-heading">

          <p>
            POPULAR EXTENSIONS
          </p>

          <h2>
            Choose Your Domain
          </h2>

          <span>
            Simple pricing. No hidden surprises.
          </span>

        </div>

        <div className="domain-cards">

          {/* COM */}
          <div className="domain-card featured">

            <div className="domain-extension">
              .com
            </div>

            <h3>
              The world's most popular domain
            </h3>

            <div className="domain-price">

              <strong>
                ₹899
              </strong>

              <span>
                /year
              </span>

            </div>

            <button
              onClick={() => {
                setDomain("");
                setResult(null);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Register Domain
              <ArrowRight size={17} />
            </button>

          </div>

          {/* IN */}
          <div className="domain-card">

            <div className="domain-extension">
              .in
            </div>

            <h3>
              Perfect for Indian businesses
            </h3>

            <div className="domain-price">

              <strong>
                ₹599
              </strong>

              <span>
                /year
              </span>

            </div>

            <button>
              Register Domain
              <ArrowRight size={17} />
            </button>

          </div>

          {/* NET */}
          <div className="domain-card">

            <div className="domain-extension">
              .net
            </div>

            <h3>
              Built for technology and networks
            </h3>

            <div className="domain-price">

              <strong>
                ₹999
              </strong>

              <span>
                /year
              </span>

            </div>

            <button>
              Register Domain
              <ArrowRight size={17} />
            </button>

          </div>

          {/* ORG */}
          <div className="domain-card">

            <div className="domain-extension">
              .org
            </div>

            <h3>
              Perfect for organizations
            </h3>

            <div className="domain-price">

              <strong>
                ₹799
              </strong>

              <span>
                /year
              </span>

            </div>

            <button>
              Register Domain
              <ArrowRight size={17} />
            </button>

          </div>

        </div>

      </section>

      {/* Trust Section */}
      <section className="domain-trust">

        <div className="trust-item">

          <ShieldCheck size={28} />

          <div>

            <h3>
              Secure Registration
            </h3>

            <p>
              Your domain and account information
              stay protected.
            </p>

          </div>

        </div>

        <div className="trust-item">

          <Globe size={28} />

          <div>

            <h3>
              Global Domains
            </h3>

            <p>
              Register domains for your business
              anywhere in the world.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="domains-cta">

        <h2>
          Found your perfect domain?
        </h2>

        <p>
          Register it today and start building your digital future.
        </p>

        <a href="/domains">
          Search Domain
          <ArrowRight size={18} />
        </a>

      </section>

      {/* Footer */}
      <footer className="domains-footer">

        <div className="domains-footer-logo">
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

export default Domain;