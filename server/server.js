/**
 * 빛나는 음식 / Radiant Food — Express Backend
 *
 * Responsibilities:
 *   1. Serve static frontend files from /src
 *   2. Proxy Google Places API requests (keeps API key off the client)
 *   3. Proxy USDA FoodData Central API requests (optional)
 *
 * Setup: copy .env.example → .env and fill in your API keys.
 */

'use strict';

const express = require('express');
const cors    = require('cors');
const https   = require('https');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────────────────
app.use(cors());          // allow any origin during development
app.use(express.json());

// Serve the frontend from /src
const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'src')));

// ── Utility: promisified https.get ──────────────────────────
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Invalid JSON from upstream')); }
      });
    }).on('error', reject);
  });
}

// ── Helper: build star rating string ────────────────────────
function starsLabel(rating) {
  const r = Math.round(rating || 0);
  return '★'.repeat(r) + '☆'.repeat(5 - r);
}

// ════════════════════════════════════════════════════════════
// ENDPOINT 1: /api/restaurants
//
// Accepts EITHER:
//   ?lat=&lng=&keyword=   (from geolocation)
//   ?zip=&keyword=        (from zip code input — geocoded first)
// ════════════════════════════════════════════════════════════
app.get('/api/restaurants', async (req, res) => {
  const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY;

  if (!PLACES_KEY) {
    return res.status(503).json({
      error: 'GOOGLE_PLACES_API_KEY not configured. See README.md.',
      results: []
    });
  }

  const keyword = req.query.keyword || 'Korean restaurant';
  let lat = parseFloat(req.query.lat);
  let lng = parseFloat(req.query.lng);

  // If zip code is provided, geocode it first
  if (!lat || !lng) {
    const zip = req.query.zip;
    if (!zip || !/^\d{5}$/.test(zip)) {
      return res.status(400).json({ error: 'Provide lat+lng or a 5-digit zip code.' });
    }

    try {
      const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${PLACES_KEY}`;
      const geoData = await httpsGet(geoUrl);

      if (geoData.status !== 'OK' || !geoData.results.length) {
        return res.status(404).json({ error: 'Could not geocode that zip code.', results: [] });
      }

      lat = geoData.results[0].geometry.location.lat;
      lng = geoData.results[0].geometry.location.lng;
    } catch (err) {
      return res.status(500).json({ error: 'Geocoding failed.', results: [] });
    }
  }

  // Call Google Places Nearby Search
  try {
    const radius  = 8000; // 8 km ≈ 5 miles
    const placesUrl = [
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      `?location=${lat},${lng}`,
      `&radius=${radius}`,
      `&keyword=${encodeURIComponent(keyword)}`,
      `&type=restaurant`,
      `&key=${PLACES_KEY}`
    ].join('');

    const data = await httpsGet(placesUrl);

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      return res.status(502).json({ error: `Places API error: ${data.status}`, results: [] });
    }

    // Shape the response so the frontend only gets what it needs
    const results = (data.results || []).slice(0, 12).map(place => ({
      name:                place.name,
      address:             place.vicinity,
      rating:              place.rating,
      user_ratings_total:  place.user_ratings_total,
      open:                place.opening_hours?.open_now,
      // Photos: return the first photo reference URL proxied through our server
      photo_url: place.photos?.length
        ? `/api/photo?ref=${place.photos[0].photo_reference}`
        : null,
      emoji: '🍽️'
    }));

    res.json({ results });

  } catch (err) {
    console.error('Places API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch restaurants.', results: [] });
  }
});

// ── Proxy Google Places photo (keeps API key server-side) ───
app.get('/api/photo', (req, res) => {
  const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY;
  const ref = req.query.ref;

  if (!PLACES_KEY || !ref) {
    return res.status(400).send('Missing photo reference or API key.');
  }

  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${ref}&key=${PLACES_KEY}`;

  https.get(url, upstream => {
    res.setHeader('Content-Type', upstream.headers['content-type'] || 'image/jpeg');
    upstream.pipe(res);
  }).on('error', () => res.status(502).send('Photo fetch failed.'));
});

// ════════════════════════════════════════════════════════════
// ENDPOINT 2: /api/nutrition (USDA FoodData Central)
//
// Used optionally by the recipes page for live nutrition data.
// Query: ?q=bibimbap (ingredient or dish name)
// ════════════════════════════════════════════════════════════
app.get('/api/nutrition', async (req, res) => {
  const USDA_KEY = process.env.USDA_API_KEY;
  const query    = req.query.q;

  if (!query) return res.status(400).json({ error: 'Query param q is required.' });

  // If no API key, return a clear message (not a crash)
  if (!USDA_KEY) {
    return res.status(503).json({
      error: 'USDA_API_KEY not configured. Static recipe data is shown instead.',
      foods: []
    });
  }

  try {
    const url = [
      'https://api.nal.usda.gov/fdc/v1/foods/search',
      `?query=${encodeURIComponent(query)}`,
      `&api_key=${USDA_KEY}`,
      `&pageSize=5`,
      `&dataType=Survey%20%28FNDDS%29,SR%20Legacy`
    ].join('');

    const data = await httpsGet(url);

    // Return a simplified list of foods
    const foods = (data.foods || []).map(f => ({
      name:     f.description,
      calories: f.foodNutrients.find(n => n.nutrientName === 'Energy')?.value,
      protein:  f.foodNutrients.find(n => n.nutrientName === 'Protein')?.value,
      sodium:   f.foodNutrients.find(n => n.nutrientName === 'Sodium, Na')?.value,
      fiber:    f.foodNutrients.find(n => n.nutrientName === 'Fiber, total dietary')?.value,
    }));

    res.json({ foods });

  } catch (err) {
    console.error('USDA API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch nutrition data.', foods: [] });
  }
});

// ── Catch-all: serve index.html for unrecognised routes ─────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'src', 'index.html'));
});

// ── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✨ 빛나는 음식 server running at http://localhost:${PORT}`);
  console.log(`   Open in your browser: http://localhost:${PORT}\n`);
});
