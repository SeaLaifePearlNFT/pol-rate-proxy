const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Allow CORS for frontend access
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// ✅ Improved /convert endpoint with dynamic ETH input
app.get("/convert", async (req, res) => {
  const ethAmount = parseFloat(req.query.eth);

  if (isNaN(ethAmount) || ethAmount <= 0) {
    return res.status(400).json({ error: "Invalid ETH amount" });
  }

  const apiKey = process.env.CMC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing CMC_API_KEY" });
  }

  try {
    const response = await fetch(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH,POL&convert=POL",
      {
        method: "GET",
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
          Accept: "application/json"
        }
      }
    );

    const data = await response.json();
    const rate = data?.data?.ETH?.quote?.POL?.price;

    if (!rate) {
      return res.status(500).json({ error: "Could not retrieve conversion rate" });
    }

    const polValue = ethAmount * rate;

    res.json({ eth: ethAmount, rate, pol: polValue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch conversion rate", details: err.message });
  }
});

// ✅ Optional root endpoint
app.get("/", (req, res) => {
  res.send("POL Rate Proxy is running.");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


