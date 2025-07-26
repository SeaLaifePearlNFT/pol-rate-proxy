const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

const CMC_API_KEY = "1316250e-3244-48e0-906c-a3ebdefe900d";

app.get("/convert", async (req, res) => {
  try {
    const response = await axios.get("https://pro-api.coinmarketcap.com/v2/tools/price-conversion", {
      headers: {
        "X-CMC_PRO_API_KEY": CMC_API_KEY
      },
      params: {
        amount: 1,
        symbol: "ETH",
        convert: "POL"
      }
    });

    const price = response.data.data[0].quote.POL.price;
    res.json({ rate: price });
  } catch (err) {
    console.error("Error fetching rate:", err.message);
    res.status(500).json({ error: "Failed to fetch ETH→POL rate" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
