const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Shivora API is running",
  });
});

// Domain availability check
app.get("/api/domain/check", async (req, res) => {
  try {
    const { domain } = req.query;

    if (!domain) {
      return res.status(400).json({
        error: "Domain is required",
      });
    }

    const cleanDomain = domain.trim().toLowerCase();

    console.log("Checking domain:", cleanDomain);
    console.log("PAT loaded:", !!process.env.GODADDY_PAT);

    if (!process.env.GODADDY_PAT) {
      return res.status(500).json({
        error: "GoDaddy PAT is not loaded",
      });
    }

    const response = await fetch(
      `https://api.godaddy.com/v3/domains/check-availability?domain=${encodeURIComponent(
        cleanDomain
      )}&optimizeFor=ACCURACY`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.GODADDY_PAT}`,
          Accept: "application/json",
        },
      }
    );

    const text = await response.text();

    console.log("GoDaddy status:", response.status);
    console.log("GoDaddy response:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = {
        rawResponse: text,
      };
    }

    return res.status(response.status).json(data);

  } catch (error) {
    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
});

// Start server
const server = app.listen(PORT, "127.0.0.1", (error) => {
  if (error) {
    console.error("SERVER START ERROR:", error);
    return;
  }

  console.log(`Shivora API running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error("SERVER ERROR:", error);
});