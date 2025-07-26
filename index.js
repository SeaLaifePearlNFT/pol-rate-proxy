const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000; // ✅ MUST use process.env.PORT for Render

// ✅ Define working endpoint
app.get("/convert", async (req, res) => {
  try {
    const response = await fetch(
      "https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=1&symbol=ETH&convert=POL",
      {
        method: "GET",
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
          Accept: "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error("CMC request failed");
    }

    const data = await response.json();
    const rate = data.data[0].quote.POL.price;
    res.json({ rate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch conversion rate" });
  }
});

// ✅ Basic root route (optional)
app.get("/", (req, res) => {
  res.send("POL Rate Proxy is working.");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

