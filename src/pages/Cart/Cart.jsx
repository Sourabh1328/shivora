import { useState } from "react";
import {
  ShoppingCart,
  Trash2,
  ArrowLeft,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shivora_cart") || "[]");
    } catch {
      return [];
    }
  });

  const removeItem = (domainName) => {
    const updatedCart = cart.filter(
      (item) => item.domain !== domainName
    );

    setCart(updatedCart);

    localStorage.setItem(
      "shivora_cart",
      JSON.stringify(updatedCart)
    );
  };

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price || 0),
    0
  );

  const gst = Math.round(subtotal * 0.18);

  const total = subtotal + gst;

  return (
    <div className="cart-page">

      {/* Navbar */}
      <header className="cart-navbar">

        <a href="/" className="cart-logo">
          <span>SHIV</span>
          <b>O</b>
          <span>RA</span>
        </a>

        <div className="cart-nav-right">

          <a href="/domains">
            Domains
          </a>

          <a href="/login">
            Login
          </a>

        </div>

      </header>

      {/* Main */}
      <main className="cart-container">

        {/* Heading */}
        <div className="cart-heading">

          <div>

            <p>
              SHOPPING CART
            </p>

            <h1>
              Your Cart
            </h1>

            <span>
              Review your selected services before checkout.
            </span>

          </div>

          <div className="cart-icon-box">
            <ShoppingCart size={28} />
          </div>

        </div>

        {cart.length === 0 ? (

          /* ================= EMPTY CART ================= */

          <div className="empty-cart">

            <div className="empty-cart-icon">
              <ShoppingCart size={42} />
            </div>

            <h2>
              Your Cart is Empty
            </h2>

            <p>
              You haven't added any domain to your cart yet.
            </p>

            <a href="/domains">
              Search Domain
            </a>

          </div>

        ) : (

          /* ================= CART CONTENT ================= */

          <div className="cart-layout">

            {/* ================= CART ITEMS ================= */}

            <section className="cart-items">

              <div className="cart-items-header">

                <h2>
                  Selected Domains
                </h2>

                <span>
                  {cart.length}{" "}
                  {cart.length === 1 ? "item" : "items"}
                </span>

              </div>

              {cart.map((item) => (

                <div
                  className="cart-item"
                  key={item.domain}
                >

                  <div className="cart-item-icon">
                    <ShoppingCart size={22} />
                  </div>

                  <div className="cart-item-info">

                    <h3>
                      {item.domain}
                    </h3>

                    <p>
                      Domain Registration
                    </p>

                    <span>
                      Registration period:{" "}
                      {item.period || "1 Year"}
                    </span>

                  </div>

                  <div className="cart-item-price">

                    <strong>
                      ₹
                      {Number(
                        item.price || 0
                      ).toLocaleString("en-IN")}
                    </strong>

                    <span>
                      /year
                    </span>

                  </div>

                  <button
                    className="remove-item"
                    onClick={() =>
                      removeItem(item.domain)
                    }
                    title="Remove domain"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              ))}

              {/* Continue Shopping */}

              <a
                href="/domains"
                className="continue-shopping"
              >
                <ArrowLeft size={17} />
                Continue Shopping
              </a>

            </section>

            {/* ================= ORDER SUMMARY ================= */}

            <aside className="cart-summary">

              <h2>
                Order Summary
              </h2>

              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹
                  {subtotal.toLocaleString("en-IN")}
                </strong>

              </div>

              <div className="summary-row">

                <span>
                  GST (18%)
                </span>

                <strong>
                  ₹
                  {gst.toLocaleString("en-IN")}
                </strong>

              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹
                  {total.toLocaleString("en-IN")}
                </strong>

              </div>

              {/* Checkout */}

              <a
                href="/checkout"
                className="checkout-button"
              >
                <CreditCard size={18} />
                Proceed to Checkout
              </a>

              {/* Security */}

              <div className="secure-checkout">

                <ShieldCheck size={19} />

                <div>

                  <strong>
                    Secure Checkout
                  </strong>

                  <span>
                    Your payment and account information
                    are protected.
                  </span>

                </div>

              </div>

            </aside>

          </div>

        )}

      </main>

      {/* Footer */}

      <footer className="cart-footer">

        <strong>
          SHIVORA
        </strong>

        <span>
          POWERING YOUR DIGITAL WORLD
        </span>

        <p>
          © 2026 Shivora. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Cart;