# NineFi Futures Performance Portal

A self-hosted Binance Futures PnL & performance dashboard in NineFi branding.

## How It Works

- **Pure frontend** — No backend needed. API calls are signed directly in the browser using the Web Crypto API (HMAC-SHA256).
- **Read-only** — Only requires read permission on your Binance API key. No trading, no withdrawals.
- **Keys never leave your browser** — Nothing is stored or sent to any server.

## Deploy to Netlify (Free)

1. Push this folder to a GitHub repo
2. Go to [app.netlify.com](https://app.netlify.com) → New site from Git
3. Select your repo
4. Build settings:
   - **Publish directory:** `public`
   - **Build command:** *(leave empty)*
5. Deploy — done. Your portal is live at a `*.netlify.app` URL.

## Binance API Key Setup

1. Log into Binance → Profile → API Management
2. Create a new API key
3. Enable: **Read** permission only
4. Enable: **Futures** access
5. Restrict to your IP (recommended)
6. Paste the key + secret into the portal login screen

## Features

- 7D / 30D / 90D / 6M / 1Y period filters
- Symbol filter + Long/Short filter
- **Stats:** Total PnL, Win Rate, Best/Worst Trade, Fees, Net PnL, Avg Trade
- **Charts:** Cumulative equity curve, Daily PnL bars, Monthly heatmap, Long vs Short doughnut
- **Ratios:** Profit Factor, Sharpe Ratio, Expectancy, Avg R:R, Max Drawdown, Calmar Ratio
- **Tables:** Performance by symbol, Full trade history (last 200)
- Pulls up to 1 year of trade + income history from Binance FAPI

## Notes

- Binance FAPI limits trade history to 1 year
- First load may take 15–30s due to paginated fetching of 1 year of data
- All calculations are client-side — refresh anytime
