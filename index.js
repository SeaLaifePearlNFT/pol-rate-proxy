const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());

app.get("/convert", async (req, res) => {
  try {
    const url = "https://pro-api.coinmarketcap.com/v2/tools/price-conversion";
    const response = await fetch(
      `${url}?amount=1&symbol=ETH&convert=POL`,
      {
        method: "GET",
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
        },
      }
    );

    const data = await response.json();
    const rate = data?.data[0]?.quote?.POL?.price;

    if (!rate) throw new Error("Conversion rate not found");

    res.json({ rate });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch conversion rate", details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
