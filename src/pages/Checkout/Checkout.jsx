import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

import "./Checkout.css";

function Checkout() {
  const [cart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shivora_cart") || "[]");
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price || 0),
    0
  );

  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    alert(
      `Order ready for payment.\n\nDomain: ${
        cart[0]?.domain || ""
      }\nTotal: ₹${total.toLocaleString("en-IN")}`
    );
  };

  /* EMPTY CART */

  if (cart.length === 0) {
    return (
      <div className="checkout-page">

        <header className="checkout-navbar">

          <a href="/" className="checkout-logo">
            <span>SHIV</span>
            <b>O</b>
            <span>RA</span>
          </a>

          <div className="checkout-nav-right">
            <a href="/domains">Domains</a>
            <a href="/cart">Cart</a>
          </div>

        </header>

        <main className="checkout-empty">

          <div className="checkout-empty-icon">
            <CreditCard size={40} />
          </div>

          <h1>Your Cart is Empty</h1>

          <p>
            Please add a domain before proceeding to checkout.
          </p>

          <a href="/domains">
            Search Domain
          </a>

        </main>

        <footer className="checkout-footer">

          <strong>SHIVORA</strong>

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

  return (
    <div className="checkout-page">

      {/* NAVBAR */}

      <header className="checkout-navbar">

        <a href="/" className="checkout-logo">
          <span>SHIV</span>
          <b>O</b>
          <span>RA</span>
        </a>

        <div className="checkout-nav-right">

          <span className="secure-nav">
            <Lock size={15} />
            Secure Checkout
          </span>

          <a href="/cart">
            Cart
          </a>

        </div>

      </header>


      {/* MAIN */}

      <main className="checkout-container">

        {/* Heading */}

        <div className="checkout-heading">

          <div>

            <p>
              SECURE CHECKOUT
            </p>

            <h1>
              Complete Your Order
            </h1>

            <span>
              Enter your details to continue with your domain registration.
            </span>

          </div>

          <div className="checkout-security">

            <ShieldCheck size={26} />

            <span>
              Secure & Protected
            </span>

          </div>

        </div>


        {/* CONTENT */}

        <div className="checkout-layout">

          {/* CUSTOMER FORM */}

          <section className="checkout-form-card">

            <div className="checkout-card-heading">

              <div className="step-number">
                1
              </div>

              <div>

                <h2>
                  Customer Information
                </h2>

                <p>
                  Enter the details for your Shivora account.
                </p>

              </div>

            </div>


            <form onSubmit={handleCheckout}>

              {/* NAME + EMAIL */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />

                </div>

              </div>


              {/* PHONE + PINCODE */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    required
                  />

                </div>

              </div>


              {/* ADDRESS */}

              <div className="form-group">

                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  rows="3"
                  required
                />

              </div>


              {/* CITY + STATE */}

              <div className="form-row">

                <div className="form-group">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    required
                  />

                </div>

              </div>


              {/* PAYMENT */}

              <div className="payment-section">

                <div className="checkout-card-heading">

                  <div className="step-number">
                    2
                  </div>

                  <div>

                    <h2>
                      Payment Method
                    </h2>

                    <p>
                      Choose your preferred payment method.
                    </p>

                  </div>

                </div>


                <div className="payment-option selected">

                  <div className="payment-radio">
                    <CheckCircle size={20} />
                  </div>

                  <CreditCard size={23} />

                  <div>

                    <strong>
                      Online Payment
                    </strong>

                    <span>
                      UPI, Credit Card, Debit Card & Net Banking
                    </span>

                  </div>

                </div>

              </div>


              {/* PAYMENT BUTTON */}

              <button
                type="submit"
                className="place-order-button"
              >

                <Lock size={18} />

                Proceed to Payment

              </button>

            </form>

          </section>


          {/* ORDER SUMMARY */}

          <aside className="checkout-summary">

            <h2>
              Order Summary
            </h2>


            {/* DOMAIN */}

            <div className="summary-domain">

              <div className="domain-check-icon">
                <CheckCircle size={20} />
              </div>

              <div>

                <strong>
                  {cart[0].domain}
                </strong>

                <span>
                  Domain Registration
                </span>

                <small>
                  {cart[0].period || "1 Year"}
                </small>

              </div>

            </div>


            {/* SUBTOTAL */}

            <div className="summary-line">

              <span>
                Domain Registration
              </span>

              <strong>
                ₹{subtotal.toLocaleString("en-IN")}
              </strong>

            </div>


            {/* GST */}

            <div className="summary-line">

              <span>
                GST (18%)
              </span>

              <strong>
                ₹{gst.toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="summary-divider"></div>


            {/* TOTAL */}

            <div className="checkout-total">

              <span>
                Total
              </span>

              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>

            </div>


            {/* SECURITY */}

            <div className="checkout-trust">

              <ShieldCheck size={20} />

              <div>

                <strong>
                  Secure Payment
                </strong>

                <span>
                  Your payment information is securely processed.
                </span>

              </div>

            </div>


            {/* BACK */}

            <a
              href="/cart"
              className="back-cart"
            >

              <ArrowLeft size={17} />

              Back to Cart

            </a>

          </aside>

        </div>

      </main>


      {/* FOOTER */}

      <footer className="checkout-footer">

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

export default Checkout;