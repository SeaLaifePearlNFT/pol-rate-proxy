const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get('/convert', async (req, res) => {
  try {
    const response = await fetch('https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=1&symbol=ETH&convert=POL', {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch conversion rate.' });
    }

    const data = await response.json();
    const rate = data.data[0].quote.POL.price;
    res.json({ rate });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
