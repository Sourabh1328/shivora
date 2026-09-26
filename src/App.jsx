import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Domains from "./pages/Domains/Domain";

function Hosting() {
  return <h1>Shivora Hosting</h1>;
}

function Login() {
  return <h1>Shivora Login</h1>;
}

function Dashboard() {
  return <h1>Shivora Dashboard</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/domains" element={<Domains />} />

        <Route path="/hosting" element={<Hosting />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;