import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.get('/flights', async (req, res) => {
  const {
    departure_id,
    arrival_id,
    outbound_date,
    return_date,
    adults = '1',
  } = req.query;

  const baseParams = {
    engine: 'google_flights',
    api_key: process.env.SERPAPI_KEY,
    departure_id,
    arrival_id,
    outbound_date,
    return_date,
    adults,
  };

  try {
    // Step 1: Fetch exchange rate using the key from .env
    const exchangeApiUrl = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/USD`;
    const { data: rateData } = await axios.get(exchangeApiUrl);

    if (rateData.result !== "success") {
      throw new Error("Exchange rate fetch failed.");
    }

    const USD_TO_INR_RATE = rateData?.conversion_rates?.INR || 83;

    // Step 2: Fetch flights from SerpApi
    console.log("🔍 Sending search to SerpApi:", baseParams);
    const { data: searchData } = await axios.get('https://serpapi.com/search', { params: baseParams });
    console.log("✅ Received data from SerpApi");

    if (searchData.error) {
      return res.status(500).json({ error: searchData.error });
    }

    if (!searchData.best_flights || searchData.best_flights.length === 0) {
      return res.status(404).json({ error: "No best flights found." });
    }

    // Step 3: Convert USD price to INR and build booking URL
    const enrichedFlights = searchData.best_flights.map((flight) => {
      const segments = flight.legs || flight.segments || [];
      const routeInfo = segments.map(seg =>
        `${seg.departure_airport}-${seg.arrival_airport}-${seg.departure_date}`
      ).join('.');

      const booking_url = `https://www.google.com/flights?hl=en#flt=${routeInfo}`;
      const priceInUSD = flight.price || 0;
      const priceInINR = Math.round(priceInUSD * USD_TO_INR_RATE);

      return {
        ...flight,
        price: priceInINR,
        currency: "INR",
        booking_url,
      };
    });

    res.json({ best_flights: enrichedFlights });

  } catch (error) {
    console.error("🔥 Backend error:", error?.response?.data || error.message);
    res.status(500).json({
      error: error?.response?.data?.error || 'Failed to fetch flight data.',
    });
  }
});

export default router;