# ✨ 빛나는 음식 · Radiant Food

A bilingual (Korean 🇰🇷 / English 🇺🇸) nutrition web app for Korean American seniors.

**No login required. No account. No password. Just tap and go.**

---

## Features

| Page | What it does |
|---|---|
| **Home** (`index.html`) | Mission intro, food visual strip, 3 large nav cards |
| **Recipes** (`recipes.html`) | 7 Korean & American recipes with nutrition info, expandable ingredient lists, filter tabs |
| **Restaurants** (`restaurants.html`) | Geolocation or zip-code search, Google Places proxy, keyword filters, demo data fallback |
| **Nutrition Tips** (`nutrition-tips.html`) | Senior-tailored tips: sodium, hydration, blood pressure, protein, bones, portions |

Every page includes:
- **Korean/English toggle** (remembers your choice in localStorage)
- **Read Aloud button** (Web Speech API, reads at a slower rate for seniors)
- **Large, high-contrast text** on an olive/cream palette (WCAG AA)
- **Keyboard accessible** — all interactive elements work with Tab + Enter

---

## Quick Start (No Backend)

Just open `src/index.html` in any modern browser. All pages work without the backend — the Restaurants page shows demo data.

---

## Full Setup (with Live Restaurants)

### 1. Prerequisites

- Node.js 18 or newer (`node -v` to check)
- A Google Cloud account (for Google Places API key)
- Optional: USDA FoodData Central key (for live nutrition data)

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Set up your API keys

```bash
# In the /server directory:
cp .env.example .env
```

Edit `.env` and fill in:

```
GOOGLE_PLACES_API_KEY=your_key_here
USDA_API_KEY=your_key_here   # optional
PORT=3001
```

**Where to get API keys:**

- **Google Places API** (required for Restaurants page):
  1. Go to [https://console.cloud.google.com/](https://console.cloud.google.com/)
  2. Create a project → Enable **Places API** and **Geocoding API**
  3. Create an API key under *Credentials*
  4. ⚠️ Note: Google Places API has a free tier ($200/month credit), but requires a billing account. For hackathon demos, demo/sample data is shown if the key is missing.

- **USDA FoodData Central API** (optional — free, no billing):
  1. Go to [https://fdc.nal.usda.gov/api-key-signup.html](https://fdc.nal.usda.gov/api-key-signup.html)
  2. Sign up with an email address
  3. You'll get a key instantly

### 4. Start the server

```bash
# In the /server directory:
npm start
```

Open [http://localhost:3001](http://localhost:3001) in your browser. The server serves the frontend and handles API proxying.

For development with auto-restart:
```bash
npm run dev   # uses Node's built-in --watch (Node 18+)
```

---

## Folder Structure

```
nutrition-app/
├── src/                        # Frontend (static HTML, CSS, JS)
│   ├── index.html              # Home page
│   ├── recipes.html            # Healthy Recipes
│   ├── restaurants.html        # Restaurants Near Me
│   ├── nutrition-tips.html     # Nutrition Tips & Health Plans
│   ├── styles.css              # Shared olive/cream design system
│   └── js/
│       └── app.js              # Shared: language toggle + read-aloud
│
├── server/                     # Backend (Node.js + Express)
│   ├── server.js               # Express app + API proxy endpoints
│   ├── package.json
│   ├── .env.example            # Template — copy to .env
│   └── .gitignore
│
├── .gitignore
└── README.md
```

> **No /database directory** — the app is stateless. Recipes and nutrition tips are static (hardcoded in HTML). The Restaurants page queries Google Places live through the backend proxy. No caching layer is needed for a hackathon demo. If usage scales, add a Redis or SQLite cache in front of the Places API calls.

---

## API Design Choices

### Google Places API (for Restaurants)
- **Why proxied**: The API key must never appear in frontend JS — it would be visible in DevTools and could be abused.
- **How it works**: Frontend → `GET /api/restaurants?lat=…&lng=…&keyword=…` → Express server → Google Places Nearby Search → response shaped and returned.
- **Fallback**: If the key is missing or the server isn't running, the frontend shows 6 sample restaurants so the demo still works.

### USDA FoodData Central (for Nutrition Data)
- **Why chosen over Edamam**: USDA FoodData Central is completely free with no billing account required. Edamam's free tier is limited to 200 calls/month.
- **Current state**: Nutrition data in recipes is hardcoded (estimated per serving). Wire up `GET /api/nutrition?q=<ingredient>` to replace with live USDA data once you have a key.

### Web Speech API (for Read Aloud)
- **Why native**: No third-party TTS dependency, no cost. Supported in all modern browsers (Chrome, Edge, Firefox, Safari).
- **Korean support**: Chrome and Edge have good Korean voice support (`ko-KR`). If Korean voice is unavailable, the browser falls back to a default voice.
- **Rate**: Set to 0.82× for senior accessibility.

---

## Accessibility Checklist

- ✅ WCAG AA contrast: cream `#F5F0E3` on olive `#556B2F` → ratio ≈ 9.5:1
- ✅ All buttons ≥ 44px height (WCAG 2.5.5 target size)
- ✅ Semantic HTML landmarks (header, main, nav, footer, article)
- ✅ `aria-label` on interactive controls
- ✅ `aria-live` on status regions (location, search results)
- ✅ Keyboard-accessible: Tab + Enter works on all cards, buttons, and links
- ✅ `<html lang>` updates dynamically when language is switched

---

## Assumptions

1. The app targets modern browsers (2020+). No IE11 support.
2. Web Speech API Korean voice quality varies by OS/browser. Chrome on desktop gives the best results.
3. Google Places API free tier ($200/month credit) is sufficient for a hackathon demo with limited usage.
4. No user data is stored anywhere. Language preference is saved only in `localStorage` on the user's own device.

---

*Built for a student hackathon — Korean American elder nutrition awareness.*
