# 🌧️ MonsoonMate AI

> **Your AI-Powered Monsoon Preparedness Assistant** — built for Google PromptWars

[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Google%20Gemini%202.0%20Flash-blue?logo=google)](https://aistudio.google.com/)
[![Frontend: React + Vite](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react)](https://vitejs.dev/)
[![Backend: Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green?logo=nodedotjs)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://typescriptlang.org/)
[![Deploy: Vercel + Render](https://img.shields.io/badge/Deploy-Vercel%20%2B%20Render-black?logo=vercel)](https://vercel.com)

---

## 📖 Project Overview

MonsoonMate AI is a full-stack GenAI web application that helps individuals, families, and communities prepare for the monsoon season. It combines **live weather data** with **Google Gemini 2.0 Flash** to generate hyper-personalized preparedness plans covering every phase — before, during, and after the monsoon.

Every feature is fully functional, end-to-end. No hardcoded data. No placeholder text. No fake weather.

---

## ✨ Features

- 🌤️ **Live Weather Data** — Real-time weather fetched from OpenWeatherMap or Open-Meteo (free fallback)
- 🤖 **Google Gemini 2.0 Flash** — AI-generated, personalized preparedness plans in strict JSON
- 🚨 **Real-Time Alert Banner** — Live weather status with AI recommendation (info/warning/critical)
- 🛡️ **Risk Assessment** — Low/Moderate/High monsoon risk score with explanation
- 📋 **Interactive Checklists** — Before, During, After rain + Emergency Kit with checkboxes
- ✈️ **Travel Advisory** — AI-powered go/no-go recommendation with safety tips
- 🏠 **Home Safety** — Personalized recommendations based on house type
- 💊 **Medical Guidance** — Tailored to user's health conditions
- 🥗 **Food & Water Prep** — Monsoon-specific food safety guidance
- 💡 **Personalized Tips** — Unique to each user's exact situation
- 📞 **Emergency Contacts** — Indian emergency numbers + local contacts
- 🌐 **Multilingual** — Complete plan in English or Hindi (Devanagari)
- 🔒 **Secure** — API keys never exposed to browser; helmet, CORS, rate limiting

---

## 🏗️ Architecture

```
                        ┌────────────────┐
                        │   User Browser  │
                        └───────┬────────┘
                                │  fetch('/api/generate-plan')
                                ▼
                    ┌───────────────────────┐
                    │  React + Vite Frontend │
                    │  (Vercel)             │
                    │  TypeScript + Tailwind │
                    └───────────┬───────────┘
                                │  POST /api/generate-plan
                                │  (No API keys in frontend)
                                ▼
                    ┌───────────────────────┐
                    │  Express.js Backend    │
                    │  (Render)              │
                    │  Node.js + TypeScript  │
                    └──────┬────────┬───────┘
                           │        │
              ┌────────────▼─┐  ┌───▼──────────────┐
              │ Weather API   │  │ Google Gemini API  │
              │ OpenWeatherMap│  │ gemini-2.0-flash   │
              │ / Open-Meteo  │  │ (JSON mode)        │
              └───────────────┘  └───────────────────┘
```

### Security Model
- API keys live **only** in backend `.env`
- Frontend **never** touches API keys
- Rate limiting: 30 requests/15 min per IP
- Helmet.js security headers
- Input validation on all fields
- CORS restricted to frontend origin

---

## 🛠️ Technology Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, Vite 6, TypeScript 5.7  |
| Styling    | Tailwind CSS 3, Custom animations |
| Icons      | Lucide React                      |
| Backend    | Node.js, Express 4, TypeScript    |
| AI         | Google Gemini 2.0 Flash           |
| Weather    | OpenWeatherMap + Open-Meteo       |
| Security   | Helmet, express-rate-limit, CORS  |
| Deploy     | Vercel (frontend), Render (backend)|

---

## 📁 Folder Structure

```
MonsoonMate-AI/
├── frontend/                   # React + Vite application
│   ├── src/
│   │   ├── api/               # Backend API client (fetch only)
│   │   │   └── client.ts
│   │   ├── components/        # React components
│   │   │   ├── cards/         # Dashboard card components
│   │   │   │   ├── AlertBanner.tsx
│   │   │   │   ├── WeatherCard.tsx
│   │   │   │   ├── RiskCard.tsx
│   │   │   │   ├── ChecklistCard.tsx
│   │   │   │   ├── TravelAdvisoryCard.tsx
│   │   │   │   ├── RecommendationsCard.tsx
│   │   │   │   ├── EmergencyContactsCard.tsx
│   │   │   │   └── TranslationCard.tsx
│   │   │   ├── LandingPage.tsx
│   │   │   ├── InputForm.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   └── ErrorCard.tsx
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── usePlan.ts
│   │   ├── types/             # TypeScript interfaces
│   │   │   └── index.ts
│   │   ├── App.tsx            # Root component
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Global styles + Tailwind
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                    # Express API server
│   ├── src/
│   │   ├── controllers/
│   │   │   └── preparednessController.ts
│   │   ├── routes/
│   │   │   └── preparedness.ts
│   │   ├── services/
│   │   │   ├── weatherService.ts   # Live weather fetching
│   │   │   └── geminiService.ts    # Gemini AI integration
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts               # Server entry point
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
│
├── .gitignore
├── render.yaml                 # Render deployment config
├── vercel.json                 # Vercel deployment config
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm 9+
- Google Gemini API key ([get free key](https://aistudio.google.com/app/apikey))
- OpenWeatherMap API key (optional, [free tier](https://openweathermap.org/api))

### 1. Clone & Setup

```bash
git clone <repo-url>
cd MonsoonMate-AI
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your API keys
npm install
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs at **http://localhost:5173**  
Backend runs at **http://localhost:3001**

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini API key |
| `WEATHER_API_KEY` | Optional | OpenWeatherMap key (free fallback used if absent) |
| `PORT` | Optional | Server port (default: 3001) |
| `FRONTEND_URL` | Optional | CORS origin (default: http://localhost:5173) |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Optional | Backend URL for production (empty = use Vite proxy in dev) |

> ⚠️ **Security**: API keys must **never** appear in `frontend/.env`. The frontend only calls `/api/...` routes.

---

## 🌐 Running Locally

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd frontend && npm run dev
```

Open **http://localhost:5173** in your browser.

---

## ☁️ Deployment

### Frontend → Vercel

1. Connect your GitHub repo to Vercel
2. Set **Root Directory** to `frontend`
3. Vercel auto-detects Vite — no changes needed
4. Set environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`

### Backend → Render

1. Connect your GitHub repo to Render
2. The `render.yaml` file configures everything automatically
3. Add environment variables in Render dashboard:
   - `GEMINI_API_KEY`
   - `WEATHER_API_KEY` (optional)
   - `FRONTEND_URL=https://your-app.vercel.app`

---

## 🤖 GenAI Services Used

### Google Gemini 2.0 Flash

- **Model**: `gemini-2.0-flash`
- **Response Mode**: `application/json` (strict JSON output, no markdown)
- **Temperature**: 0.3 (consistent, focused outputs)
- **Usage**: Generates the complete preparedness plan including:
  - Risk scoring and assessment
  - All checklists (before/during/after/emergency)
  - Travel advisory
  - Home safety, medical, food recommendations
  - Personalized tips tailored to user profile
  - Multilingual summary (English/Hindi)

The prompt sends **both** live weather data AND user profile to Gemini for maximum personalization.

---

## 🌦️ Weather API Used

### Primary: OpenWeatherMap (if key provided)
- Endpoint: `api.openweathermap.org/data/2.5/weather`
- Returns: temperature, humidity, wind speed, condition, rainfall, weather alerts
- **Free tier**: 1,000 calls/day

### Fallback: Open-Meteo (always free, no key needed)
- Geocoding: `geocoding-api.open-meteo.com/v1/search`
- Weather: `api.open-meteo.com/v1/forecast`
- Returns: All standard weather metrics using WMO weather codes
- **No API key required**

---

## 🔮 Future Improvements

- [ ] 7-day forecast integration
- [ ] SMS/WhatsApp alert subscription
- [ ] Regional flood maps integration (NDMA API)
- [ ] Offline PWA mode with cached last plan
- [ ] PDF export of preparedness plan
- [ ] Community reporting (crowdsourced local alerts)
- [ ] Voice assistant integration
- [ ] Push notifications for weather changes
- [ ] Historical monsoon trend analysis

---

## 📄 License

MIT License — Free to use and modify.

---

## 🏆 Built For

**Google PromptWars** — Demonstrating the power of Google Gemini AI combined with live data for real-world disaster preparedness.

---

*MonsoonMate AI — Stay safe, stay prepared. 🌧️*
