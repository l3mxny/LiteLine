## LiteLine

**LiteLine** is a campus safety companion that helps students quickly find the nearest blue light, contact campus police, and get safety guidance when walking alone.

## What it does

**LiteLine** gives students fast, clear access to campus safety resources during their most vulnerable moments. In just two clicks, the app:

- **Finds your real-time location**
- **Identifies the nearest blue light emergency station**
- **Provides a clear, safe walking route**
- **Shows essential safety info without loading delays or clutter**

LiteLine is simple, fast, and designed specifically for students walking alone at night, because safety should be immediate and not something you have to search for.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Google Maps JavaScript API
- **Backend**: Node.js, Express.js, JSON data (`backend/data/blueLights.json`)
- **Infra**: Docker (containerized backend)

## Running the App Locally

### Backend (without Docker)

```bash
cd backend
npm install
node server.js          # API at http://localhost:3000
```

### Frontend (opening page + map + chat + contacts)

```bash
cd frontend/opening-page
npm install
npm run dev -- --port 5174
# Open http://localhost:5174 in your browser
```

Make sure the API base URL in `frontend/opening-page/src/MapPage.tsx` is:

```ts
const API_BASE_URL = 'http://localhost:3000'
```

## Backend with Docker (Optional)

```bash
cd backend
docker build -t liteline-backend:latest .
docker run -d --name liteline-backend -p 3000:3000 --env-file .env liteline-backend:latest
# API available at http://localhost:3000
```