const crypto = require("crypto");

const BINANCE_BASE = "https://fapi.binance.com";

function sign(queryString, secret) {
  return crypto
    .createHmac("sha256", secret)
    .update(queryString)
    .digest("hex");
}

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const API_KEY = process.env.BINANCE_API_KEY;
  const API_SECRET = process.env.BINANCE_API_SECRET;

  if (!API_KEY || !API_SECRET) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "API credentials not configured in environment variables." }),
    };
  }

  const { endpoint, ...params } = event.queryStringParameters || {};

  if (!endpoint) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Missing endpoint parameter." }),
    };
  }

  const allowedEndpoints = [
    "/fapi/v1/income",
    "/fapi/v1/userTrades",
    "/fapi/v2/account",
    "/fapi/v1/positionRisk",
    "/fapi/v1/balance",
  ];

  if (!allowedEndpoints.includes(endpoint)) {
    return {
      statusCode: 403,
      headers,
      body: JSON.stringify({ error: "Endpoint not allowed." }),
    };
  }

  const timestamp = Date.now();
  const paramStr = new URLSearchParams({ ...params, timestamp }).toString();
  const signature = sign(paramStr, API_SECRET);
  const url = `${BINANCE_BASE}${endpoint}?${paramStr}&signature=${signature}`;

  try {
    const response = await fetch(url, {
      headers: { "X-MBX-APIKEY": API_KEY },
    });
    const data = await response.json();
    return { statusCode: response.status, headers, body: JSON.stringify(data) };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
