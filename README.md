# POL Rate Proxy

This is a lightweight Node.js server that fetches the real-time ETH → POL conversion rate using CoinMarketCap's API.

## How to Deploy on Render

1. Push this code to a new GitHub repo
2. Go to [https://render.com](https://render.com)
3. Create a new "Web Service"
4. Connect it to your repo
5. Set build command: `npm install`
6. Set start command: `node index.js`
7. Done! Use `/convert` to get the rate (e.g. `https://your-app.onrender.com/convert`)