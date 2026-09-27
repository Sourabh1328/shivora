import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Domains from "./pages/Domains/Domain";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";


function Hosting() {
  return (
    <h1>
      Shivora Hosting
    </h1>
  );
}


function Login() {
  return (
    <h1>
      Shivora Login
    </h1>
  );
}


function Dashboard() {
  return (
    <h1>
      Shivora Dashboard
    </h1>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Domains */}
        <Route
          path="/domains"
          element={<Domains />}
        />

        {/* Hosting */}
        <Route
          path="/hosting"
          element={<Hosting />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;