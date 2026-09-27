import { useEffect, useState } from "react";

import {
  Search,
  Globe,
  Server,
  Cloud,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  XCircle,
  ShoppingCart,
} from "lucide-react";

import CurrencySelector from "../../components/CurrencySelector";

import "./Home.css";

function Home() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currency, setCurrency] = useState(() => {
    return (
      localStorage.getItem("shivora_currency") || "INR"
    );
  });

  /*
    Currency change listener
  */

  useEffect(() => {
    const handleCurrencyChange = (event) => {
      setCurrency(event.detail);
    };

    window.addEventListener(
      "shivoraCurrencyChange",
      handleCurrencyChange
    );

    return () => {
      window.removeEventListener(
        "shivoraCurrencyChange",
        handleCurrencyChange
      );
    };
  }, []);

  /*
    USD → INR conversion

    This is currently a demo/development rate.
    We can connect a live FX rate later.
  */

  const USD_TO_INR = 95.78;

  /*
    Format domain price according to
    selected country/currency.
  */

  const formatPrice = (usdPrice) => {
    const price = Number(usdPrice || 0);

    if (currency === "INR") {
      return {
        amount: Math.round(price * USD_TO_INR),
        symbol: "₹",
        code: "INR",
        region: "India",
      };
    }

    return {
      amount: price,
      symbol: "$",
      code: "USD",
      region: "International",
    };
  };

  /*
    Domain Search
  */

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
      /*
        LOCAL:
        http://127.0.0.1:5000/api/domain/check

        LIVE NETLIFY:
        /.netlify/functions/domain-check
      */

      const apiUrl = import.meta.env.DEV
        ? `http://127.0.0.1:5000/api/domain/check?domain=${encodeURIComponent(
            value
          )}`
        : `/.netlify/functions/domain-check?domain=${encodeURIComponent(
            value
          )}`;

      const response = await fetch(apiUrl);

      const data = await response.json();

      console.log(
        "Home Domain API response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to check domain availability."
        );
      }

      /*
        Available domain
      */

      if (data.available) {
        let price = 899;
        let isPremium = false;

        /*
          GoDaddy premium pricing
        */

        if (
          Array.isArray(data.prices) &&
          data.prices.length > 0
        ) {
          const firstPrice = data.prices[0];

          if (
            firstPrice?.price &&
            typeof firstPrice.price.value ===
              "number"
          ) {
            price = firstPrice.price.value;
          }

          if (
            firstPrice?.type ===
            "ONE_TIME_PREMIUM_DOMAIN_PURCHASE"
          ) {
            isPremium = true;
          }
        }

        /*
          Direct price if API provides one
        */

        if (
          typeof data.price === "number" &&
          data.price > 0
        ) {
          price = data.price;
        }

        setResult({
          type: "available",
          domain: data.domain || value,
          price,
          currency: "USD",
          isPremium,
        });
      } else {
        /*
          Unavailable domain
        */

        setResult({
          type: "unavailable",
          domain: data.domain || value,
        });
      }
    } catch (error) {
      console.error(
        "Home domain search error:",
        error
      );

      setResult({
        type: "error",
        message:
          "Unable to check domain availability. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  /*
    Add domain to cart
  */

  const addToCart = () => {
    if (!result?.domain) return;

    try {
      const existingCart = JSON.parse(
        localStorage.getItem("shivora_cart") ||
          "[]"
      );

      const alreadyAdded = existingCart.some(
        (item) =>
          item.domain === result.domain
      );

      if (alreadyAdded) {
        window.location.href = "/cart";
        return;
      }

      const displayPrice = formatPrice(
        result.price
      );

      const updatedCart = [
        ...existingCart,

        {
          domain: result.domain,

          /*
            Store the actual selected currency
          */

          price: displayPrice.amount,

          currency: displayPrice.code,

          symbol: displayPrice.symbol,

          region: displayPrice.region,

          /*
            Keep original USD price also
            for future backend/payment use
          */

          originalUsdPrice: Number(
            result.price || 0
          ),

          period: result.isPremium
            ? "One Time"
            : "1 Year",

          isPremium:
            result.isPremium || false,
        },
      ];

      localStorage.setItem(
        "shivora_cart",
        JSON.stringify(updatedCart)
      );

      window.location.href = "/cart";
    } catch (error) {
      console.error(
        "Cart error:",
        error
      );
    }
  };

  /*
    Clear search
  */

  const clearSearch = () => {
    setDomain("");
    setResult(null);
  };

  /*
    Current displayed price
  */

  const displayedPrice =
    result?.type === "available"
      ? formatPrice(result.price)
      : null;

  return (
    <div className="shivora-home">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <a
          href="/"
          className="logo"
        >
          <span className="logo-shiv">
            SHIV
          </span>

          <span className="logo-o">
            O
          </span>

          <span className="logo-ra">
            RA
          </span>
        </a>

        <nav>
          <a href="/domains">
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

        <div className="nav-actions">

          {/* Currency Selector */}

          <CurrencySelector />

          <a
            href="/login"
            className="login-link"
          >
            Login
          </a>

          <a
            href="/dashboard"
            className="get-started"
          >
            Get Started
          </a>

        </div>

      </header>

      {/* ================= MAIN ================= */}

      <main>

        {/* ================= HERO ================= */}

        <section className="hero">

          <div className="hero-content">

            <div className="hero-badge">

              <span>
                ✦
              </span>

              POWERING YOUR DIGITAL WORLD

            </div>

            <h1>

              Build Your Digital

              <span>
                Future with Shivora
              </span>

            </h1>

            <p>
              Domains, hosting, cloud and security —
              everything you need to build and grow
              your online presence.
            </p>

            {/* ================= DOMAIN SEARCH ================= */}

            <div className="domain-search">

              <Search size={22} />

              <input
                type="text"
                value={domain}
                onChange={(e) => {
                  setDomain(
                    e.target.value
                  );

                  setResult(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchDomain();
                  }
                }}
                placeholder="Search your perfect domain"
                disabled={loading}
              />

              <button
                onClick={searchDomain}
                disabled={loading}
              >

                {loading
                  ? "Checking..."
                  : "Search"}

                {!loading && (
                  <ArrowRight
                    size={18}
                  />
                )}

              </button>

            </div>

            {/* ================= EXTENSIONS ================= */}

            <div className="domain-extensions">

              <span>.com</span>
              <span>.in</span>
              <span>.net</span>
              <span>.org</span>

            </div>

            {/* ================= RESULT ================= */}

            {result && (

              <div
                className={`home-domain-result ${result.type}`}
              >

                {/* ================= AVAILABLE ================= */}

                {result.type ===
                  "available" && (
                  <>

                    <div className="home-result-icon">

                      <CheckCircle
                        size={22}
                      />

                    </div>

                    <div className="home-result-info">

                      <strong>
                        {result.domain}
                      </strong>

                      <span>
                        {result.isPremium
                          ? "Premium domain is available"
                          : "This domain is available"}
                      </span>

                    </div>

                    <div className="home-result-price">

                      <strong>

                        {displayedPrice.symbol}

                        {displayedPrice.amount.toLocaleString(
                          "en-IN"
                        )}

                      </strong>

                      <span>

                        {result.isPremium
                          ? "one-time"
                          : "/year"}

                      </span>

                      <small>

                        {displayedPrice.region}
                        {" • "}
                        {displayedPrice.code}

                      </small>

                    </div>

                    <button
                      className="home-add-cart"
                      onClick={addToCart}
                    >

                      Add to Cart

                      <ShoppingCart
                        size={16}
                      />

                    </button>

                  </>
                )}

                {/* ================= UNAVAILABLE ================= */}

                {result.type ===
                  "unavailable" && (
                  <>

                    <div className="home-result-icon">

                      <XCircle
                        size={22}
                      />

                    </div>

                    <div className="home-result-info">

                      <strong>
                        {result.domain}
                      </strong>

                      <span>
                        This domain is already registered
                      </span>

                    </div>

                    <button
                      className="home-try-again"
                      onClick={clearSearch}
                    >
                      Try Another
                    </button>

                  </>
                )}

                {/* ================= ERROR ================= */}

                {result.type ===
                  "error" && (
                  <>

                    <div className="home-result-icon">

                      <XCircle
                        size={22}
                      />

                    </div>

                    <div className="home-result-info">

                      <strong>
                        Unable to check domain
                      </strong>

                      <span>
                        {result.message}
                      </span>

                    </div>

                    <button
                      className="home-try-again"
                      onClick={searchDomain}
                    >
                      Try Again
                    </button>

                  </>
                )}

              </div>

            )}

          </div>

        </section>

        {/* ================= SERVICES ================= */}

        <section className="services">

          <div className="section-heading">

            <p>
              EVERYTHING YOU NEED
            </p>

            <h2>
              Your Digital Journey Starts Here
            </h2>

          </div>

          <div className="service-grid">

            {/* DOMAINS */}

            <div className="service-card">

              <div className="service-icon">
                <Globe />
              </div>

              <h3>
                Domains
              </h3>

              <p>
                Find the perfect domain name
                for your business or idea.
              </p>

              <a href="/domains">

                Explore Domains

                <ArrowRight
                  size={16}
                />

              </a>

            </div>

            {/* HOSTING */}

            <div className="service-card">

              <div className="service-icon">
                <Server />
              </div>

              <h3>
                Hosting
              </h3>

              <p>
                Fast and reliable hosting
                built for modern websites.
              </p>

              <a href="/hosting">

                View Hosting

                <ArrowRight
                  size={16}
                />

              </a>

            </div>

            {/* CLOUD */}

            <div className="service-card">

              <div className="service-icon">
                <Cloud />
              </div>

              <h3>
                Cloud
              </h3>

              <p>
                Powerful cloud infrastructure
                that grows with you.
              </p>

              <a href="#">

                Explore Cloud

                <ArrowRight
                  size={16}
                />

              </a>

            </div>

            {/* SECURITY */}

            <div className="service-card">

              <div className="service-icon">
                <ShieldCheck />
              </div>

              <h3>
                Security
              </h3>

              <p>
                Protect your websites
                and digital infrastructure.
              </p>

              <a href="#">

                Explore Security

                <ArrowRight
                  size={16}
                />

              </a>

            </div>

          </div>

        </section>

        {/* ================= CTA ================= */}

        <section className="cta">

          <h2>
            Ready to build something amazing?
          </h2>

          <p>
            Start your digital journey with Shivora.
          </p>

          <a href="/domains">

            Get Started

            <ArrowRight
              size={18}
            />

          </a>

        </section>

      </main>

      {/* ================= FOOTER ================= */}

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